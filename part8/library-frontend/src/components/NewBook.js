import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries/queries';

const NewBook = ({ show, setError }) => {
  const [mutate, { loading }] = useMutation(ADD_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: ALL_BOOKS, variables: { genre: '' } },
    ],
    onError: error => setError(error.message),
  });

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  if (!show) {
    return null;
  }
  if (loading) {
    return <p>Adding book...</p>;
  }

  const submit = async event => {
    event.preventDefault();

    mutate({ variables: { title, author, published, genres } });

    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
