import React from "react";
import RickAndMortyCharacters from "./RickAndMortyCharacters"; // Import your new component
import "./App.css"; // Keep your existing CSS import

function App() {
  return (
    <div className="App">
      <h1>Welcome to Rick and Morty Characters</h1>
      <RickAndMortyCharacters /> {/* Use the new component here */}
    </div>
  );
}

export default App;
