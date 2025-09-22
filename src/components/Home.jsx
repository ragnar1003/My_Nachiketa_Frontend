import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          ♟️ Lichess Explorer
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore the world of online chess with Lichess.org data. 
          Check player profiles, browse leaderboards, and discover tournaments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          <Link 
            to="/profile" 
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border hover:border-blue-300"
          >
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-semibold mb-2">Player Profiles</h3>
            <p className="text-gray-600">
              Search for any Lichess player and view their detailed profile, 
              ratings, and statistics.
            </p>
          </Link>
          
          <Link 
            to="/leaderboards" 
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border hover:border-blue-300"
          >
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Leaderboards</h3>
            <p className="text-gray-600">
              Check out the top players across different game variants 
              and time controls.
            </p>
          </Link>
          
          <Link 
            to="/tournaments" 
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border hover:border-blue-300"
          >
            <div className="text-4xl mb-4">⚔️</div>
            <h3 className="text-xl font-semibold mb-2">Tournaments</h3>
            <p className="text-gray-600">
              Discover ongoing and upcoming tournaments with detailed 
              information and results.
            </p>
          </Link>
        </div>
        
        <div className="mt-12 p-6 bg-blue-50 rounded-lg max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-2">About Lichess</h3>
          <p className="text-gray-600">
            Lichess.org is a free, open-source chess server powered by volunteers and donations. 
            This application uses the Lichess API to provide insights into the chess community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;