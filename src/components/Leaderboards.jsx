import { useState, useEffect } from 'react';
import lichessAPI from '../services/lichessAPI';

const Leaderboards = () => {
  const [leaderboards, setLeaderboards] = useState({});
  const [selectedVariant, setSelectedVariant] = useState('bullet');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const variants = [
    { key: 'bullet', name: 'Bullet' },
    { key: 'blitz', name: 'Blitz' },
    { key: 'rapid', name: 'Rapid' },
    { key: 'classical', name: 'Classical' },
    { key: 'correspondence', name: 'Correspondence' },
    { key: 'chess960', name: 'Chess960' },
    { key: 'kingOfTheHill', name: 'King of the Hill' },
    { key: 'threeCheck', name: 'Three-check' },
  ];

  useEffect(() => {
    fetchLeaderboard(selectedVariant);
  }, [selectedVariant]);

  const fetchLeaderboard = async (variant) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await lichessAPI.getLeaderboard(variant, 10);
      setLeaderboards(prev => ({ ...prev, [variant]: data.users }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Leaderboards</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {variants.map((variant) => (
              <button
                key={variant.key}
                onClick={() => setSelectedVariant(variant.key)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedVariant === variant.key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2">Loading leaderboard...</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {leaderboards[selectedVariant] && !loading && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">
                Top 10 - {variants.find(v => v.key === selectedVariant)?.name}
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {leaderboards[selectedVariant].map((player, index) => (
                <div key={player.username} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold text-gray-600 mr-4">
                      #{index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{player.username}</h3>
                      {player.title && (
                        <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          {player.title}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      {player.perfs[selectedVariant]?.rating || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {player.perfs[selectedVariant]?.games || 0} games
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboards;