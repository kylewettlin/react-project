import agentsData from '../data/agents.json';
import mapsData from '../data/maps.json';
import recommendedCompsData from '../data/recommendedComps.json';
import exampleCompsData from '../data/exampleComps.json';
import { fetchAllCompositions, createComposition } from './api';

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
    // Fetch compositions from API instead of using local data
    const apiComps = await fetchAllCompositions();
    
    console.log('API compositions received:', apiComps);
    
    // Check if the API returned valid data
    if (apiComps && Array.isArray(apiComps) && apiComps.length > 0) {
      // Process the data to ensure it has complete agent data
      const processedData = apiComps.map(processCompData);
      console.log('Processed API data:', processedData);
      
      // Cache and return the data
      recommendedCompsCache = processedData;
      return recommendedCompsCache;
    } else {
      // If API returned empty or invalid data, throw error to trigger fallback
      throw new Error('API returned empty or invalid data');
    }
  } catch (error) {
    console.error('Error fetching compositions from API:', error);
    
    // Fallback to local data if API fails
    console.log('Falling back to local data');
    const processedData = recommendedCompsData.map(processCompData);
    recommendedCompsCache = processedData;
    return recommendedCompsCache;
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

// Function to save user composition to localStorage
export const saveUserComp = async (comp) => {
  try {
    // Simulate API delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Get existing compositions
    const existingComps = JSON.parse(localStorage.getItem('userComps')) || [];
    
    // Add new composition
    const updatedComps = [...existingComps, comp];
    
    // Save to localStorage
    localStorage.setItem('userComps', JSON.stringify(updatedComps));
    
    return comp.id; // Return the ID of the saved composition
  } catch (error) {
    console.error('Error saving composition:', error);
    throw new Error('Failed to save composition');
  }
};

// Function to delete user composition
export const deleteUserComp = async (compId) => {
  try {
    const response = await fetch(`/api/comps/${compId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete composition: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error deleting composition:', error);
    throw new Error('Failed to delete composition');
  }
};

// Function to edit user composition
export const editUserComp = async (compId, updatedData) => {
  try {
    const response = await fetch(`/api/comps/${compId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to update composition: ${response.statusText}`);
    }

    const updatedComp = await response.json();
    return updatedComp;
  } catch (error) {
    console.error('Error updating composition:', error);
    throw new Error('Failed to update composition');
  }
};

// Function to get user compositions from localStorage
export const getUserComps = async () => {
  try {
    // Simulate API delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get compositions from localStorage
    const userComps = JSON.parse(localStorage.getItem('userComps')) || [];
    
    // Process the data to ensure it has complete agent data
    const processedData = userComps.map(processCompData);
    
    return processedData;
  } catch (error) {
    console.error('Error loading user compositions:', error);
    throw new Error('Failed to load user compositions');
  }
};

// Function to add a new composition via API
export const addComposition = async (composition) => {
  try {
    // Call the API to create the composition
    const result = await createComposition(composition);
    
    // If successful and we have a cache, update it
    if (result.success && recommendedCompsCache) {
      const processedComp = processCompData(result.composition);
      recommendedCompsCache = [...recommendedCompsCache, processedComp];
    }
    
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