// API service for fetching data from the Valorant API

// Base URL - change this to your Render deployment URL when deployed
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-valorant-api.onrender.com' 
  : 'http://localhost:3001';

/**
 * Fetches all compositions from the API
 * @returns {Promise<Array>} Array of composition objects
 */
export const fetchAllCompositions = async () => {
  try {
    const response = await fetch(`${API_URL}/api/compositions`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
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