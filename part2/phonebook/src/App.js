import { useState, useEffect } from 'react';
import personService from './services/persons';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filterInput, setFilterInput] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData);
      })
      .catch(err => {
        setMessage(err.message);
        setError(true);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some(person => person.name === newName)) {
      const person = persons.find(p => p.name === newName);
      if (
        window.confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(person.id, personObject)
          .then(updatedInfo => {
            setPersons(
              persons.map(p => (p.id !== person.id ? p : updatedInfo))
            );
            setMessage(`Updated number for ${person.name}`);
            setError(false);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch(error => {
            setError(true);
            setMessage(error.response.data.error);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
      setNewName('');
      setNewNumber('');
      return;
    }
    personService
      .add(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
        setMessage(`Added ${newPerson.name}`);
        setError(false);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch(err => {
        setMessage(err.response.data.error);
        setError(true);
      });
  };

  const personsToShow = showAll
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().startsWith(filterInput.toLowerCase())
      );

  const filterBy = e => {
    setFilterInput(e.target.value);
    setShowAll(false);
  };

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(err => {
          setMessage(err.response.data.error);
          setError(true);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filterBy={filterBy} value={filterInput} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
