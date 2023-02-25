import React from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries/queries';
const GenrePicker = ({ setGenreFilter }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: '' },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  const genresArray = data.allBooks.reduce((acc, cur) => {
    return acc.concat(cur.genres);
  }, []);
  const genres = [...new Set(genresArray)];

  return (
    <div>
      {genres.map(genre => (
        <button key={genre} onClick={() => setGenreFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setGenreFilter(null)}>all genres</button>
    </div>
  );
};

export default GenrePicker;
