// API service for fetching data from the Valorant API

// Base URL for the API server
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://valorant-api-ocyo.onrender.com' // Actual Render deployment URL
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

/**
 * Fetches compositions for the current user
 * @returns {Promise<Array>} Array of user composition objects
 */
export const fetchUserCompositions = async () => {
  try {
    // Assuming authentication token is handled (e.g., via cookies or headers)
    // Adjust fetch options if specific headers (like Authorization) are needed
    const response = await fetch(`${API_URL}/api/user/compositions`);
    
    if (!response.ok) {
      throw new Error(`API Error fetching user comps: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user compositions:', error);
    throw error;
  }
};

/**
 * Fetches recommended compositions from the API
 * @returns {Promise<Array>} Array of recommended composition objects
 */
export const fetchRecommendedCompositions = async () => {
  try {
    const response = await fetch(`${API_URL}/api/recommended/compositions`);
    
    if (!response.ok) {
      throw new Error(`API Error fetching recommended comps: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recommended compositions:', error);
    throw error;
  }
};

/**
 * Updates an existing composition
 * @param {number} id - The ID of the composition to update
 * @param {Object} updatedData - The updated composition data
 * @returns {Promise<Object>} The updated composition object
 */
export const updateComposition = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/api/compositions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API Error updating composition: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating composition ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a composition by ID
 * @param {number} id - The ID of the composition to delete
 * @returns {Promise<boolean>} True if successful
 */
export const deleteComposition = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/compositions/${id}`, {
      method: 'DELETE'
      // No headers needed for simple DELETE usually, unless auth is required
    });

    if (!response.ok) {
      // Handle cases where the response might not have a JSON body (e.g., 404 Not Found)
      let errorMsg = `API Error deleting composition: ${response.statusText} (${response.status})`;
      try {
        const errorData = await response.json();
        errorMsg = errorData.message || errorMsg;
      } catch (jsonError) {
        // Ignore JSON parsing error if response body is empty or not JSON
      }
      throw new Error(errorMsg);
    }

    // Check for 204 No Content or 200 OK with potential success message
    if (response.status === 204) {
        return true; // Standard successful DELETE response
    }
    // Handle 200 OK if the API sends a body on successful delete
    // const data = await response.json(); 
    // return data.success || true; 
    return true; // Assuming 200 or 204 means success

  } catch (error) {
    console.error(`Error deleting composition ${id}:`, error);
    throw error;
  }
}; 