import userReducer from './userReducer';

describe('notification reducer', () => {
  it('sets notification message with notification/setMessage', () => {
    const initialState = null;
    const action = {
      type: 'user/setUser',
      payload: { user: 'test' },
    };

    const newState = userReducer(initialState, action);
    console.log(newState);

    expect(newState).toEqual(action.payload);
  });
});
