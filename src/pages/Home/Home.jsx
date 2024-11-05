import React from 'react';
import CharacterList from '../../components/CharacterList/CharacterList';
import './Home.css';

const Home = () => {
  return (
    <main className="home">
      <h2>Welcome to the Rick and Morty Universe</h2>
      <CharacterList />
    </main>
  );
};

export default Home;
