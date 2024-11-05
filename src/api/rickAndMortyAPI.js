import axios from 'axios';

export const fetchCharacters = async (page = 1) => {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
    return response.data;  // Ensure you are returning response.data
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const fetchCharacterById = async (id) => {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching character by ID:', error);
    throw error;
  }
};
