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

  // Get tournaments (returns a stream)
  async getTournaments() {
    try {
      const response = await fetch(`${API_BASE}/tournament`);
      if (!response.ok) {
        throw new Error('Failed to fetch tournaments');
      }
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = '';
      
      // Read the stream with timeout protection
      const timeout = setTimeout(() => {
        reader.cancel();
        throw new Error('Tournament fetch timeout');
      }, 10000); // 10 second timeout
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          result += decoder.decode(value, { stream: true });
        }
        clearTimeout(timeout);
      } catch (streamError) {
        clearTimeout(timeout);
        throw new Error('Failed to read tournament stream');
      }
      
      // Parse NDJSON (newline-delimited JSON)
      if (!result.trim()) {
        return [];
      }
      
      const lines = result.trim().split('\n').filter(line => line.trim());
      const tournaments = [];
      
      for (const line of lines) {
        try {
          const tournament = JSON.parse(line);
          tournaments.push(tournament);
        } catch (parseError) {
          console.warn('Failed to parse tournament line:', line);
          // Continue with other tournaments instead of failing completely
        }
      }
      
      return tournaments;
    } catch (error) {
      console.error('Tournament fetch error:', error);
      // Fallback to arena tournaments endpoint
      return this.getTournamentsArena();
    }
  },

  // Fallback method for tournaments
  async getTournamentsArena() {
    try {
      const response = await fetch(`${API_BASE}/tournament/arena`);
      if (!response.ok) {
        throw new Error('Failed to fetch arena tournaments');
      }
      
      const text = await response.text();
      if (!text.trim()) {
        return [];
      }
      
      const lines = text.trim().split('\n').filter(line => line.trim());
      const tournaments = [];
      
      for (const line of lines) {
        try {
          const tournament = JSON.parse(line);
          tournaments.push(tournament);
        } catch (parseError) {
          console.warn('Failed to parse arena tournament line:', line);
        }
      }
      
      return tournaments;
    } catch (error) {
      console.error('Arena tournament fetch error:', error);
      throw new Error('Failed to fetch tournaments from all sources');
    }
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