import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const api = {
  // Check backend health
  checkHealth: async () => {
    const res = await apiClient.get('/health');
    return res.data;
  },

  // Fetch all registered personas
  fetchPersonas: async () => {
    const res = await apiClient.get('/personas');
    return res.data.personas || [];
  },

  // Synthesize a new persona using Gemma 4 AI Quick Launch
  synthesizePersona: async ({ name, context = '', apiKey = '', useLocal = false }) => {
    const res = await apiClient.post('/persona/synthesize', {
      name,
      context,
      api_key: apiKey,
      use_local: useLocal,
    });
    return res.data.profile;
  },

  // Save/anchor a persona in persistent memory
  createPersona: async (personaData) => {
    const res = await apiClient.post('/persona/create', personaData);
    return res.data.persona;
  },

  // Fetch all collective hubs
  fetchHubs: async () => {
    const res = await apiClient.get('/hubs');
    return res.data.hubs || [];
  },

  // Create a new custom debate hub
  createHub: async (hubData) => {
    const res = await apiClient.post('/hubs/create', hubData);
    return res.data.hub;
  },

  // Send 1-on-1 dialogue message with real-time sentiment analysis
  sendChatMessage: async ({ personaId, message, history = [], apiKey = '', useLocal = false }) => {
    const res = await apiClient.post('/chat/send', {
      persona_id: personaId,
      message,
      history,
      api_key: apiKey,
      use_local: useLocal,
    });
    return res.data;
  },

  // Send Collective debate message to a multi-persona hub
  sendGroupChatMessage: async ({ hubId, message, history = [], apiKey = '', useLocal = false }) => {
    const res = await apiClient.post('/chat/group/send', {
      hub_id: hubId,
      message,
      history,
      api_key: apiKey,
      use_local: useLocal,
    });
    return res.data;
  },
};

export default api;
