import notificationReducer from './notificationReducer';
import deepFreeze from 'deep-freeze';

describe('notification reducer', () => {
  it('sets notification message with notification/setMessage', () => {
    const initialState = {
      message: null,
      error: false,
    };
    const action = {
      type: 'notification/addMessage',
      payload: { message: 'test msg', error: true },
    };
    deepFreeze(initialState);
    const newState = notificationReducer(initialState, action);
    console.log(newState);
    expect(newState.message).toBe(action.payload.message);
    expect(newState).toEqual(action.payload);
  });
});
