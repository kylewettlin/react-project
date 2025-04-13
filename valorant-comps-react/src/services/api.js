// API service for fetching data from the Valorant API

// Base URL for the API server
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-valorant-api.onrender.com' // Update this with your actual production URL when deployed
  : 'http://localhost:3001';

console.log('Using API URL:', API_URL);

/**
 * Fetches all compositions from the API
 * @returns {Promise<Array>} Array of composition objects
 */
export const fetchAllCompositions = async () => {
  try {
    console.log(`Fetching compositions from ${API_URL}/api/compositions`);
    const response = await fetch(`${API_URL}/api/compositions`);
    
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API returned data length:', data.length);
    return data;
  } catch (error) {
    console.error('Error fetching compositions:', error);
    throw error;
  }
};

/**
 * Fetches a single composition by ID
 * @param {number} id - The composition ID
 * @returns {Promise<Object>} Composition object
 */
export const fetchCompositionById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/compositions/${id}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching composition ${id}:`, error);
    throw error;
  }
};

/**
 * Fetches all maps from the API
 * @returns {Promise<Array>} Array of map names
 */
export const fetchMaps = async () => {
  try {
    const response = await fetch(`${API_URL}/api/maps`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching maps:', error);
    throw error;
  }
};

/**
 * Creates a new composition
 * @param {Object} composition - The composition object to create
 * @returns {Promise<Object>} Response with the created composition
 */
export const createComposition = async (composition) => {
  try {
    console.log('Creating new composition:', composition);
    const response = await fetch(`${API_URL}/api/compositions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(composition),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }
    
    console.log('API create response:', data);
    return data;
  } catch (error) {
    console.error('Error creating composition:', error);
    throw error;
  }
}; 