import React from "react";
import RickAndMortyCharacters from "./components/RickAndMortyCharacters";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to Rick and Morty Characters</h1>
      <RickAndMortyCharacters /> {/* Use the new component here */}
    </div>
  );
}

export default App;
