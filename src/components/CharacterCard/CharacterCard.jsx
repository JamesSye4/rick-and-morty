//CharacterCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CharacterCard.css';

const CharacterCard = ({ character }) => {
  return (
    <Link to={`/character/${character.id}`} className="character-card">
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>{character.species}</p>
    </Link>
  );
};

export default CharacterCard;


