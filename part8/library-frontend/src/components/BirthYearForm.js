import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries/queries';

const BirthYearForm = ({ authors }) => {
  const [mutate, { loading }] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error => console.log(error.message),
  });
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const editAuthor = e => {
    e.preventDefault();
    mutate({ variables: { name, born } });
    setName('');
    setBorn('');
  };

  if (loading) {
    return <p>Updating...</p>;
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form action="sumbit" onSubmit={editAuthor}>
        <div>
          <label htmlFor="name">name</label>
          <select name="" id="name" onChange={e => setName(e.target.value)}>
            {authors.map(author => (
              <option key={author.id}>{author.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year">born</label>
          <input
            id="year"
            type="number"
            onChange={e => setBorn(Number(e.target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
