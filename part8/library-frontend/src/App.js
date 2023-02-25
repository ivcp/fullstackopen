import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';
import { useApolloClient } from '@apollo/client';
import Notify from './components/Notify';
import Recommendations from './components/Recommendations';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem('library-user-token');
    if (token) {
      setToken(token);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      {errorMessage && (
        <Notify errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      )}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommendations')}>recommend</button>
        )}
        {token && <button onClick={logout}>log out</button>}
      </div>

      <Authors show={page === 'authors'} setError={setErrorMessage} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={setErrorMessage} />

      <Recommendations show={page === 'recommendations'} />

      <Login
        setError={setErrorMessage}
        setToken={setToken}
        show={page === 'login'}
      />
    </div>
  );
};

export default App;
