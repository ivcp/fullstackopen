import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries/queries';
import BirthYearForm from './BirthYearForm';

const Authors = props => {
  const { loading, error, data } = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '20px' }}>
        <BirthYearForm authors={data.allAuthors} />
      </div>
    </div>
  );
};

export default Authors;
