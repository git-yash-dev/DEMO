import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust this to your backend URL
const USE_MOCK_DATA = true; // Set to false when backend is available

const ApiService = {
  // Get stored token
  async getToken() {
    try {
      return await AsyncStorage.getItem('jwt_token');
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  // Store token
  async setToken(token) {
    try {
      await AsyncStorage.setItem('jwt_token', token);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  },

  // Remove token
  async removeToken() {
    try {
      await AsyncStorage.removeItem('jwt_token');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },

  // Mock data for demo purposes
  getMockData(url, method = 'GET') {
    if (url === '/auth/login' && method === 'POST') {
      return { token: 'mock_jwt_token_12345', user: { id: '1', name: 'Demo User', email: 'demo@example.com' } };
    }
    if (url === '/auth/register' && method === 'POST') {
      return { token: 'mock_jwt_token_12345', user: { id: '1', name: 'Demo User', email: 'demo@example.com' } };
    }
    if (url === '/me') {
      return { user: { id: '1', name: 'Demo User', email: 'demo@example.com', createdAt: '2024-01-01T00:00:00Z' } };
    }
    if (url === '/reports') {
      return {
        reports: [
          {
            id: '1',
            title: 'Broken Streetlight on Main St',
            description: 'The streetlight at the corner of Main St and 2nd Ave has been out for three days.',
            location: 'Main St & 2nd Ave',
            department: 'Public Works',
            status: 'pending',
            createdAt: '2024-09-03T10:30:00Z',
            user: { name: 'John Smith' }
          },
          {
            id: '2',
            title: 'Pothole on Elm Street',
            description: 'Large pothole causing damage to vehicles near 123 Elm Street.',
            location: '123 Elm Street',
            department: 'Transportation',
            status: 'in_progress',
            createdAt: '2024-09-02T14:15:00Z',
            user: { name: 'Sarah Johnson' }
          },
          {
            id: '3',
            title: 'Park Bench Vandalism',
            description: 'Several park benches have been vandalized with graffiti at Central Park.',
            location: 'Central Park',
            department: 'Parks & Recreation',
            status: 'resolved',
            createdAt: '2024-09-01T09:00:00Z',
            user: { name: 'Mike Wilson' }
          }
        ]
      };
    }
    if (url === '/reports' && method === 'POST') {
      return { id: '4', message: 'Report submitted successfully' };
    }
    throw new Error('Mock endpoint not found');
  },

  // Make authenticated request
  async makeRequest(url, options = {}) {
    // Use mock data if enabled
    if (USE_MOCK_DATA) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        return this.getMockData(url, options.method);
      } catch (error) {
        throw new Error(error.message);
      }
    }

    const token = await this.getToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, config);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  // Authentication methods
  login: async (email, password) => {
    const response = await this.makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      await this.setToken(response.token);
    }

    return response;
  },

  register: async (email, password, name) => {
    // Replace this with your actual registration logic
    // Example:
    // return fetch('/api/register', { ... })
    return Promise.resolve({ success: true });
  },

  async logout() {
    await this.removeToken();
  },

  // User methods
  async getCurrentUser() {
    return await this.makeRequest('/me');
  },

  // Reports methods
  async getReports() {
    return await this.makeRequest('/reports');
  },

  async createReport(reportData) {
    return await this.makeRequest('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  },

  async getReport(id) {
    return await this.makeRequest(`/reports/${id}`);
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const token = await this.getToken();
    return !!token;
  }
}

export default ApiService;