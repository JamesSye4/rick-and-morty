import { useEffect, useState } from "react";

function useFetchCharacters(page) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters((prev) => [...prev, ...data.results]);
        setHasMore(data.info.next !== null);
      })
      .catch((e) => setError("Failed to fetch data"))
      .finally(() => setLoading(false));
  }, [page]);

  return { characters, loading, error, hasMore };
}

export default useFetchCharacters;

