import agentsData from '../data/agents.json';
import mapsData from '../data/maps.json';
import recommendedCompsData from '../data/recommendedComps.json';
import exampleCompsData from '../data/exampleComps.json';

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
  
  // Process the composition to ensure it has complete agent data
  return {
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
  // Return cached data if available
  if (recommendedCompsCache) {
    return recommendedCompsCache;
  }
  
  // Simulate API fetch delay (remove in production)
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Process the data to ensure it has complete agent data
  const processedData = recommendedCompsData.map(processCompData);
  
  // Cache and return the data
  recommendedCompsCache = processedData;
  return recommendedCompsCache;
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

// Function to delete user composition from localStorage
export const deleteUserComp = async (compId) => {
  try {
    // Simulate API delay (remove in production)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Get existing compositions
    const existingComps = JSON.parse(localStorage.getItem('userComps')) || [];
    
    // Filter out the composition to delete
    const updatedComps = existingComps.filter(comp => comp.id !== compId);
    
    // Save updated list to localStorage
    localStorage.setItem('userComps', JSON.stringify(updatedComps));
    
    return true; // Return success
  } catch (error) {
    console.error('Error deleting composition:', error);
    throw new Error('Failed to delete composition');
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

export default {
  getAgents,
  getMaps,
  getRecommendedComps,
  getExampleComps,
  getAgentById,
  getMapByValue,
  saveUserComp,
  deleteUserComp,
  getUserComps
}; 