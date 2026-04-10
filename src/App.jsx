import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  Clock, 
  MessageSquare, 
  Gamepad2, 
  Zap, 
  User, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Crown, 
  Star, 
  TrendingUp, 
  Shield,
  X,
  Circle
} from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [gameMode, setGameMode] = useState('classic');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, text: 'Your friend Alex challenged you!', time: '2 min ago', unread: true },
    { id: 2, text: 'You reached Silver tier!', time: '1 hour ago', unread: true },
    { id: 3, text: 'Weekly leaderboard updated', time: '3 hours ago', unread: false }
  ]);

  // Mock data for dashboard
  const [playerStats] = useState({
    rank: 42,
    totalGames: 156,
    wins: 89,
    losses: 67,
    winRate: '57%',
    currentStreak: 5,
    bestStreak: 12,
    rating: 1842
  });

  const [leaderboard] = useState([
    { id: 1, name: 'ProPlayerX', rank: 1, wins: 324, rating: 2450, isOnline: true },
    { id: 2, name: 'TicTacQueen', rank: 2, wins: 298, rating: 2312, isOnline: true },
    { id: 3, name: 'CrossMaster', rank: 3, wins: 287, rating: 2256, isOnline: false },
    { id: 4, name: 'GridDominator', rank: 4, wins: 265, rating: 2189, isOnline: true },
    { id: 5, name: 'ZeroHero', rank: 5, wins: 243, rating: 2104, isOnline: true }
  ]);

  const [activeGames] = useState([
    { id: 1, opponent: 'QuickPlayer', timeLeft: '0:45', turn: 'your', gridSize: 3 },
    { id: 2, opponent: 'StrategicMind', timeLeft: '2:30', turn: 'opponent', gridSize: 4 }
  ]);

  const [friends] = useState([
    { id: 1, name: 'Alex Chen', status: 'Online', game: 'In Game', rating: 1920 },
    { id: 2, name: 'Sam Rivera', status: 'Online', game: 'Available', rating: 1785 },
    { id: 3, name: 'Jordan Lee', status: 'Offline', game: 'Last seen 2h ago', rating: 2010 }
  ]);

  // Mock game board for dashboard preview
  const [gameBoard] = useState([
    ['X', 'O', null],
    [null, 'X', 'O'],
    ['O', null, 'X']
  ]);

  const handleQuickPlay = () => {
    setCurrentView('dashboard');
    // In real app, would trigger matchmaking
  };

  const handleChallengeFriend = (friendId) => {
    console.log('Challenge friend:', friendId);
    // In real app, would send challenge via WebSocket
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Glassmorphic Navigation */}
      <nav className="backdrop-blur-xl bg-white/5 border-b border-white/10 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              TicTacToePro
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-300 hover:text-white transition-colors">
              Features
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              Community
            </button>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-6xl font-bold mb-6">
              <span className="block text-white">Elevate Your</span>
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tic-Tac-Toe
              </span>
              <span className="block text-white">Experience</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Compete in real-time multiplayer matches, climb leaderboards, and master 
              customizable game modes in this premium gaming platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={handleQuickPlay}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg flex items-center space-x-3 hover:scale-105 transition-transform"
              >
                <Zap className="h-5 w-5" />
                <span>Quick Play</span>
              </button>
              <button className="px-8 py-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors">
                Watch Trailer
              </button>
            </div>
          </div>

          {/* Game Preview */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <X className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-semibold text-white">You</span>
                </div>
                <span className="text-gray-300">vs</span>
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Circle className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-semibold text-white">Opponent</span>
                </div>
              </div>
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            
            {/* Game Board */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {gameBoard.flat().map((cell, index) => (
                <div 
                  key={index}
                  className="aspect-square backdrop-blur-md bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-4xl font-bold hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {cell === 'X' ? (
                    <span className="text-purple-400">X</span>
                  ) : cell === 'O' ? (
                    <span className="text-cyan-400">O</span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="flex justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>1,234 online players</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Pro League Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-32">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Real-Time Multiplayer</h3>
            <p className="text-gray-300">
              Challenge friends or match with players worldwide with seamless WebSocket synchronization.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mb-6">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Competitive Leaderboards</h3>
            <p className="text-gray-300">
              Climb the ranks, earn achievements, and showcase your skills with detailed statistics.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center mb-6">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Social Features</h3>
            <p className="text-gray-300">
              Chat during games, send friend invites, and build your gaming community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Top Navigation */}
      <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Gamepad2 className="h-7 w-7 text-purple-400" />
            <span className="text-xl font-bold text-white">TicTacToePro</span>
            <div className="flex items-center space-x-2 ml-8">
              <button 
                onClick={() => setGameMode('classic')}
                className={`px-4 py-2 rounded-lg ${gameMode === 'classic' ? 'bg-purple-600' : 'bg-white/5'} hover:bg-white/10 transition-colors`}
              >
                Classic 3x3
              </button>
              <button 
                onClick={() => setGameMode('advanced')}
                className={`px-4 py-2 rounded-lg ${gameMode === 'advanced' ? 'bg-purple-600' : 'bg-white/5'} hover:bg-white/10 transition-colors`}
              >
                Advanced 4x4
              </button>
              <button 
                onClick={() => setGameMode('timed')}
                className={`px-4 py-2 rounded-lg ${gameMode === 'timed' ? 'bg-purple-600' : 'bg-white/5'} hover:bg-white/10 transition-colors`}
              >
                Timed Battle
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-gray-300" />
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Settings className="h-5 w-5 text-gray-300" />
            </button>
            
            <button 
              onClick={() => setCurrentView('landing')}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Player Stats & Quick Actions */}
          <div className="space-y-8">
            {/* Player Card */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Pro Player</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <Crown className="h-4 w-4 text-yellow-400" />
                      <span className="text-gray-300">Rank #{playerStats.rank}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{playerStats.rating}</div>
                  <div className="text-sm text-gray-400">ELO Rating</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">{playerStats.wins}</div>
                  <div className="text-sm text-gray-400">Wins</div>
                </div>
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">{playerStats.winRate}</div>
                  <div className="text-sm text-gray-400">Win Rate</div>
                </div>
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">{playerStats.currentStreak}</div>
                  <div className="text-sm text-gray-400">Current Streak</div>
                </div>
                <div className="backdrop-blur-md bg-white/5 rounded-xl p-4">
                  <div className="text-3xl font-bold text-white">{playerStats.totalGames}</div>
                  <div className="text-sm text-gray-400">Total Games</div>
                </div>
              </div>

              <button 
                onClick={handleQuickPlay}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
              >
                Find Match
              </button>
            </div>

            {/* Active Games */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Active Games</span>
              </h3>
              <div className="space-y-4">
                {activeGames.map(game => (
                  <div key={game.id} className="backdrop-blur-md bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white">vs {game.opponent}</span>
                      <span className="text-sm text-yellow-400">{game.timeLeft}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{game.gridSize}x{game.gridSize} Grid</span>
                      <span className={`text-sm ${game.turn === 'your' ? 'text-green-400' : 'text-red-400'}`}>
                        {game.turn === 'your' ? 'Your Turn' : 'Their Turn'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Game Board & Friends */}
          <div className="space-y-8">
            {/* Game Board Preview */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Current Match</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <X className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white font-semibold">You</span>
                  </div>
                  <span className="text-gray-400">vs</span>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Circle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white font-semibold">Opponent</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {gameBoard.flat().map((cell, index) => (
                  <div 
                    key={index}
                    className="aspect-square backdrop-blur-md bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-3xl font-bold hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {cell === 'X' ? (
                      <span className="text-purple-400">X</span>
                    ) : cell === 'O' ? (
                      <span className="text-cyan-400">O</span>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                  Resign
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  Offer Draw
                </button>
              </div>
            </div>

            {/* Friends List */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Friends Online</span>
                </h3>
                <span className="text-sm text-gray-400">{friends.filter(f => f.status === 'Online').length} online</span>
              </div>
              
              <div className="space-y-4">
                {friends.map(friend => (
                  <div key={friend.id} className="flex items-center justify-between p-3 backdrop-blur-md bg-white/5 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`h-10 w-10 rounded-full ${friend.status === 'Online' ? 'bg-green-500/20' : 'bg-gray-500/20'} flex items-center justify-center`}>
                        <User className={`h-5 w-5 ${friend.status === 'Online' ? 'text-green-400' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{friend.name}</div>
                        <div className="text-sm text-gray-400">{friend.game}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="font-semibold text-white">{friend.rating}</div>
                        <div className="text-xs text-gray-400">ELO</div>
                      </div>
                      <button 
                        onClick={() => handleChallengeFriend(friend.id)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                      >
                        Challenge
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Leaderboard & Notifications */}
          <div className="space-y-8">
            {/* Leaderboard */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span>Global Leaderboard</span>
              </h3>
              
              <div className="space-y-3">
                {leaderboard.map(player => (
                  <div key={player.id} className="flex items-center justify-between p-3 backdrop-blur-md bg-white/5 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${player.rank <= 3 ? 'bg-yellow-500/20' : 'bg-white/5'}`}>
                        <span className={`font-bold ${player.rank <= 3 ? 'text-yellow-400' : 'text-gray-300'}`}>
                          {player.rank}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-white flex items-center space-x-2">
                          <span>{player.name}</span>
                          {player.isOnline && (
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                        <div className="text-sm text-gray-400">{player.wins} wins</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">{player.rating}</div>
                      <div className="text-xs text-gray-400">Rating</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                View Full Leaderboard
              </button>
            </div>

            {/* Notifications */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </h3>
              
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div key={notification.id} className={`p-3 rounded-xl ${notification.unread ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-white/5'}`}>
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-white">{notification.text}</div>
                      {notification.unread && (
                        <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{notification.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Chat Preview */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Game Chat</span>
              </h3>
              
              <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
                <div className="text-sm">
                  <span className="text-purple-400 font-semibold">You:</span>
                  <span className="text-gray-300 ml-2">Good move!</span>
                </div>
                <div className="text-sm">
                  <span className="text-cyan-400 font-semibold">Opponent:</span>
                  <span className="text-gray-300 ml-2">Thanks! This is intense</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return currentView === 'landing' ? <LandingPage /> : <Dashboard />;
};

export default App;