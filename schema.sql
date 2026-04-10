CREATE TABLE users (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username text UNIQUE NOT NULL,
    email text UNIQUE,
    avatar_url text,
    rating integer DEFAULT 1000,
    games_played integer DEFAULT 0,
    games_won integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE games (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    player1_id uuid REFERENCES users(id) ON DELETE SET NULL,
    player2_id uuid REFERENCES users(id) ON DELETE SET NULL,
    winner_id uuid REFERENCES users(id) ON DELETE SET NULL,
    game_mode text NOT NULL DEFAULT 'classic',
    board_size integer NOT NULL DEFAULT 3,
    status text NOT NULL DEFAULT 'pending',
    winning_line integer[],
    completed_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

CREATE TABLE game_moves (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    player_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    move_position integer NOT NULL,
    move_symbol text NOT NULL,
    created_at timestamptz DEFAULT now()
);

CREATE TABLE achievements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_type text NOT NULL,
    unlocked_at timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, achievement_type)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_games_player1_id ON games(player1_id);
CREATE INDEX idx_games_player2_id ON games(player2_id);
CREATE INDEX idx_games_winner_id ON games(winner_id);
CREATE INDEX idx_games_status ON games(status);
CREATE INDEX idx_game_moves_game_id ON game_moves(game_id);
CREATE INDEX idx_game_moves_player_id ON game_moves(player_id);
CREATE INDEX idx_achievements_user_id ON achievements(user_id);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_moves ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all user profiles"
    ON users FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can view all games"
    ON games FOR SELECT
    USING (true);

CREATE POLICY "Users can create games"
    ON games FOR INSERT
    WITH CHECK (auth.uid() IN (player1_id, player2_id));

CREATE POLICY "Users can update own games"
    ON games FOR UPDATE
    USING (auth.uid() IN (player1_id, player2_id));

CREATE POLICY "Users can view all game moves"
    ON game_moves FOR SELECT
    USING (true);

CREATE POLICY "Users can insert own game moves"
    ON game_moves FOR INSERT
    WITH CHECK (auth.uid() = player_id);

CREATE POLICY "Users can view own achievements"
    ON achievements FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "System can insert achievements"
    ON achievements FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON games
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();