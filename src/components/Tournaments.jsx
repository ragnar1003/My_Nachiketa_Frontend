import { useState, useEffect } from 'react';
import lichessAPI from '../services/lichessAPI';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    setLoading(true);
    setError('');
    
    try {
      const tournamentData = await lichessAPI.getTournaments();
      setTournaments(tournamentData.slice(0, 20)); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'started': return 'bg-green-100 text-green-800';
      case 'created': return 'bg-blue-100 text-blue-800';
      case 'finished': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Tournaments</h1>
      
      <div className="max-w-6xl mx-auto">
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2">Loading tournaments...</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {tournaments.length > 0 && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map((tournament) => (
              <div key={tournament.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold line-clamp-2">{tournament.fullName}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(tournament.status)}`}>
                    {tournament.status}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Variant:</span>
                    <span className="font-medium capitalize">{tournament.variant.name}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Time Control:</span>
                    <span className="font-medium">{tournament.clock.limit / 60}+{tournament.clock.increment}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{formatDuration(tournament.minutes)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Players:</span>
                    <span className="font-medium">{tournament.nbPlayers || 0}</span>
                  </div>
                  
                  {tournament.startsAt && (
                    <div className="flex justify-between">
                      <span>Starts:</span>
                      <span className="font-medium">{formatDate(tournament.startsAt)}</span>
                    </div>
                  )}
                  
                  {tournament.finishesAt && (
                    <div className="flex justify-between">
                      <span>Ends:</span>
                      <span className="font-medium">{formatDate(tournament.finishesAt)}</span>
                    </div>
                  )}
                </div>

                {tournament.winner && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded border">
                    <div className="flex items-center">
                      <span className="text-yellow-600 font-medium">🏆 Winner:</span>
                      <span className="ml-2 font-semibold">{tournament.winner.name}</span>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    ID: {tournament.id}
                  </div>
                  <a
                    href={`https://lichess.org/tournament/${tournament.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                  >
                    View on Lichess
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {tournaments.length === 0 && !loading && !error && (
          <div className="text-center py-8 text-gray-500">
            No tournaments found
          </div>
        )}
      </div>
    </div>
  );
};

export default Tournaments;