import agentsData from '../data/agents.json';
import mapsData from '../data/maps.json';
import exampleCompsData from '../data/exampleComps.json';
import { 
  createComposition, 
  fetchUserCompositions,
  fetchRecommendedCompositions,
  fetchAllCompositions,
  updateComposition,
  deleteComposition
} from './api';

// Map of agent names to their image paths
const agentImageCache = {};
agentsData.forEach(agent => {
  agentImageCache[agent.name] = agent.imagePath;
});

// Map of map names to their image paths
const mapImageCache = {};
mapsData.forEach(map => {
  mapImageCache[map.name] = map.imagePath;
});

// Create caches to improve performance
let agentCache = null;
let mapCache = null;
let recommendedCompsCache = null;
let exampleCompsCache = null;

// Helper function to process compositions with complete data
const processCompData = (comp) => {
  // If the comp already has complete data, return it as is
  if (comp.agents && comp.agents[0] && comp.agents[0].imagePath) {
    return comp;
  }
  
  // Process the composition to ensure it has complete agent and map data
  let processedComp = {
    ...comp,
    agents: comp.agents.map(agent => {
      // If agent is just an ID, fetch the full agent data
      if (typeof agent === 'number') {
        return agentsData.find(a => a.id === agent) || { id: agent, name: 'Unknown' };
      }
      // If agent doesn't have an imagePath but has a name, find and add image
      if (!agent.imagePath && agent.name) {
        const fullAgent = agentsData.find(a => a.name === agent.name);
        return fullAgent || agent;
      }
      return agent;
    })
  };
  
  // Process map data if it's just a string
  if (comp.map && typeof comp.map === 'string') {
    const mapName = comp.map;
    const fullMap = mapsData.find(m => m.name === mapName);
    
    if (fullMap) {
      processedComp.mapData = fullMap;
    } else {
      // If no matching map found, create a basic map object
      processedComp.mapData = {
        name: mapName,
        imagePath: mapImageCache[mapName] || null
      };
    }
  }
  
  return processedComp;
};

// Function to fetch all agents
export const getAgents = async () => {
  // Return cached data if available
  if (agentCache) {
    return agentCache;
  }
  
  // Simulate API fetch delay (remove in production)
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Cache and return the data
  agentCache = agentsData;
  return agentCache;
};

// Function to fetch agent by ID
export const getAgentById = async (id) => {
  const agents = await getAgents();
  const agent = agents.find(a => a.id === id);
  
  if (!agent) {
    throw new Error(`Agent with ID ${id} not found`);
  }
  
  return agent;
};

// Function to fetch all maps
export const getMaps = async () => {
  // Return cached data if available
  if (mapCache) {
    return mapCache;
  }
  
  // Simulate API fetch delay (remove in production)
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Cache and return the data
  mapCache = mapsData;
  return mapCache;
};

// Function to fetch map by value
export const getMapByValue = async (value) => {
  const maps = await getMaps();
  const map = maps.find(m => m.value === value);
  
  if (!map) {
    throw new Error(`Map with value ${value} not found`);
  }
  
  return map;
};

// Function to fetch recommended compositions
export const getRecommendedComps = async () => {
  try {
    // Fetch compositions from the dedicated recommended API endpoint
    const recommendedComps = await fetchRecommendedCompositions();
    
    console.log('Recommended API compositions received:', recommendedComps);
    
    // Process the data
    const processedData = recommendedComps.map(processCompData);
    
    // Optionally cache the data
    recommendedCompsCache = processedData;
    return recommendedCompsCache;

  } catch (error) {
    console.error('Error fetching recommended compositions from API:', error);
    // Decide on fallback behavior: return empty array or throw
    // console.log('Falling back to local data is removed, returning empty array');
    return []; // Return empty array on error
    // throw error; // Or re-throw the error
  }
};

// Function to fetch example compositions
export const getExampleComps = async () => {
  // Return cached data if available
  if (exampleCompsCache) {
    return exampleCompsCache;
  }
  
  // Simulate API fetch delay (remove in production)
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Process the data to ensure it has complete agent data
  const processedData = exampleCompsData.map(processCompData);
  
  // Cache and return the data
  exampleCompsCache = processedData;
  return exampleCompsCache;
};

// Function to save user composition to localStorage (Keeping for potential offline/demo use?)
// If this should also use the API, it needs to be updated or removed.
export const saveUserComp = async (comp) => {
  // This currently uses localStorage, NOT the API.
  try {
    await new Promise(resolve => setTimeout(resolve, 400)); 
    const existingComps = JSON.parse(localStorage.getItem('userComps')) || [];
    const updatedComps = [...existingComps, comp];
    localStorage.setItem('userComps', JSON.stringify(updatedComps));
    return comp.id;
  } catch (error) {
    console.error('Error saving composition (localStorage):', error);
    throw new Error('Failed to save composition (localStorage)');
  }
};

// Function to delete user composition (wrapper for API call)
export const deleteUserComp = async (compId) => {
  try {
    // Call the API function
    const success = await deleteComposition(compId);
    return success;
  } catch (error) {
    // Error is already logged in api.js, re-throw for UI handling
    throw new Error('Failed to delete composition'); 
  }
};

// Function to edit user composition (wrapper for API call)
export const editUserComp = async (compId, updatedData) => {
  try {
    // Call the API function
    const updatedComp = await updateComposition(compId, updatedData);
    return updatedComp;
  } catch (error) {
    // Error is already logged in api.js, re-throw for UI handling
    throw new Error('Failed to update composition');
  }
};

// Function to get user compositions from API
export const getUserComps = async () => {
  try {
    // Fetch compositions from the user-specific API endpoint
    const userComps = await fetchUserCompositions(); 

    // Process the data to ensure it has complete agent data
    const processedData = userComps.map(processCompData);
    
    // TODO: Optionally implement caching for user comps

    return processedData;
  } catch (error) {
    console.error('Error loading user compositions:', error);
    // Return empty array or handle error as appropriate for your UI
    return []; 
    // throw new Error('Failed to load user compositions'); // Or re-throw
  }
};

// Function to add a new composition via API
export const addComposition = async (composition) => {
  try {
    // Call the API to create the composition
    const result = await createComposition(composition);
    
    // TODO: Optionally update a userCompsCache if implementing client-side caching for user comps
    
    return result;
  } catch (error) {
    console.error('Error adding composition:', error);
    throw error;
  }
};

export default {
  getAgents,
  getMaps,
  getRecommendedComps,
  getExampleComps,
  getAgentById,
  getMapByValue,
  saveUserComp,
  deleteUserComp,
  editUserComp,
  getUserComps,
  addComposition
}; 