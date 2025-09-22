import { useState } from 'react';
import lichessAPI from '../services/lichessAPI';

const Profile = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const data = await lichessAPI.getUserProfile(username);
      setProfile(data);
    } catch (err) {
      setError(err.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>
      
      <div className="max-w-md mx-auto mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Lichess username"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && fetchProfile()}
          />
          <button
            onClick={fetchProfile}
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </div>

      {error && (
        <div className="max-w-md mx-auto mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {profile && (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600 mr-4">
              {profile.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.username}</h2>
              {profile.profile?.firstName && profile.profile?.lastName && (
                <p className="text-gray-600">{profile.profile.firstName} {profile.profile.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-semibold mb-2">Account Info</h3>
              <p><span className="font-medium">Joined:</span> {new Date(profile.createdAt).toLocaleDateString()}</p>
              <p><span className="font-medium">Games Played:</span> {profile.count?.all || 0}</p>
              <p><span className="font-medium">Online:</span> {profile.online ? 'Yes' : 'No'}</p>
            </div>

            {profile.perfs && (
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold mb-2">Ratings</h3>
                {Object.entries(profile.perfs).slice(0, 4).map(([variant, data]) => (
                  <p key={variant}>
                    <span className="font-medium capitalize">{variant}:</span> {data.rating || 'Unrated'}
                  </p>
                ))}
              </div>
            )}
          </div>

          {profile.profile?.bio && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h3 className="font-semibold mb-2">Bio</h3>
              <p>{profile.profile.bio}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;