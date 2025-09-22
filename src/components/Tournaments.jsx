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
      console.log('Fetching tournaments...');
      
    
      const response = await fetch('https://lichess.org/api/tournament');
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      console.log('Response text length:', text.length);
      console.log('First 500 characters:', text.substring(0, 500));
      
      if (!text.trim()) {
        setTournaments([]);
        setError('No tournaments data received');
        return;
      }
      
      
      if (!text.trim()) {
        setTournaments([]);
        setError('No tournaments data received');
        return;
      }
      
      try {
        
        const data = JSON.parse(text);
        console.log('Parsed data structure:', Object.keys(data));
        
        let allTournaments = [];
        
        
        if (data.created && Array.isArray(data.created)) {
          console.log('Found created tournaments:', data.created.length);
          allTournaments = allTournaments.concat(data.created);
        }
        
        if (data.started && Array.isArray(data.started)) {
          console.log('Found started tournaments:', data.started.length);
          allTournaments = allTournaments.concat(data.started);
        }
        
        if (data.finished && Array.isArray(data.finished)) {
          console.log('Found finished tournaments:', data.finished.length);
          allTournaments = allTournaments.concat(data.finished);
        }
        
        console.log('Total tournaments found:', allTournaments.length);
        
        
        const tournaments = [];
        for (let i = 0; i < Math.min(allTournaments.length, 20); i++) {
          const tournament = allTournaments[i];
          
          
          if (tournament && tournament.id && tournament.fullName) {
            
            if (!tournament.variant) {
              tournament.variant = { name: 'Unknown' };
            }
            
           
            if (!tournament.clock) {
              tournament.clock = { limit: 0, increment: 0 };
            }
            
            tournaments.push(tournament);
          } else {
            console.warn(`Skipping invalid tournament at index ${i}:`, tournament);
          }
        }
        
        console.log('Valid tournaments:', tournaments.length);
        setTournaments(tournaments);
        
        if (tournaments.length === 0) {
          setError('No valid tournaments found in response');
        }
        
      } catch (parseError) {
        console.error('Failed to parse tournaments JSON:', parseError);
        setError(`Failed to parse tournaments data: ${parseError.message}`);
      }
      
    } catch (err) {
      console.error('Tournament fetch error:', err);
      setError(`Failed to load tournaments: ${err.message}`);
      setTournaments([]);
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
            <p className="mb-2">{error}</p>
            <button
              onClick={fetchTournaments}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {tournaments.length > 0 && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.filter(tournament => tournament && tournament.id).map((tournament) => (
              <div key={tournament.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold line-clamp-2">{tournament.fullName || 'Unnamed Tournament'}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(tournament.status || 'unknown')}`}>
                    {tournament.status || 'Unknown'}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Variant:</span>
                    <span className="font-medium capitalize">{tournament.variant?.name || 'Unknown'}</span>
                  </div>
                  
                  {tournament.clock && (
                    <div className="flex justify-between">
                      <span>Time Control:</span>
                      <span className="font-medium">
                        {Math.floor((tournament.clock.limit || 0) / 60)}+{tournament.clock.increment || 0}
                      </span>
                    </div>
                  )}
                  
                  {tournament.minutes && (
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{formatDuration(tournament.minutes)}</span>
                    </div>
                  )}
                  
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

                {tournament.winner && tournament.winner.name && (
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