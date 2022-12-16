import { filterAnecdotes } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes);

  const handleChange = e => {
    dispatch(
      filterAnecdotes({
        anecdotes,
        filterBy: e.target.value,
      })
    );
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
