const API_BASE = 'https://lichess.org/api';

export const lichessAPI = {
  // Get user profile
  async getUserProfile(username) {
    const response = await fetch(`${API_BASE}/user/${username}`);
    if (!response.ok) {
      throw new Error('User not found');
    }
    return response.json();
  },

  
  async getLeaderboard(variant, count = 10) {
    const response = await fetch(`${API_BASE}/player/top/${count}/${variant}`);
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }
    return response.json();
  },

  
  async getTournaments() {
    const response = await fetch(`${API_BASE}/tournament`);
    if (!response.ok) {
      throw new Error('Failed to fetch tournaments');
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';
    
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value);
    }
    
    
    const lines = result.trim().split('\n');
    return lines.map(line => JSON.parse(line));
  },

 
  async getUserGames(username, max = 10) {
    const response = await fetch(`${API_BASE}/games/user/${username}?max=${max}&pgnInJson=true`);
    if (!response.ok) {
      throw new Error('Failed to fetch user games');
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value);
    }
    
    const lines = result.trim().split('\n');
    return lines.map(line => JSON.parse(line));
  },

  
  async getUserStatus(userIds) {
    const response = await fetch(`${API_BASE}/users/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: userIds.join(',') }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user status');
    }
    return response.json();
  }
};

export default lichessAPI;