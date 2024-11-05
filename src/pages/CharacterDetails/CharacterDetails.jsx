import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacterById } from '../../api/rickAndMortyAPI';
import './CharacterDetails.css';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const data = await fetchCharacterById(id);
        setCharacter(data);
      } catch (error) {
        console.error('Failed to fetch character details:', error);
      } finally {
        setLoading(false);
      }
    };

    getCharacter();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!character) return <p>Character not found.</p>;

  return (
    <div className="character-details">
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>Species: {character.species}</p>
      <p>Status: {character.status}</p>
      <p>Gender: {character.gender}</p>
    </div>
  );
};

export default CharacterDetails;
