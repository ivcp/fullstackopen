import React from 'react';
import { RECOMMENDATIONS } from '../queries/queries';
import { useQuery } from '@apollo/client';

const Recommendations = ({ show }) => {
  const { loading, error, data } = useQuery(RECOMMENDATIONS);

  if (!show) {
    return null;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  const books = data.allBooks.filter(book =>
    book.genres.includes(data.me.favouriteGenre)
  );
  return (
    <div>
      <p>
        Book in your favourite genre <strong>{data.me.favouriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
