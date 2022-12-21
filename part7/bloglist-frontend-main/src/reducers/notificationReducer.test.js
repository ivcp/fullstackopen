import notificationReducer from './notificationReducer';
import deepFreeze from 'deep-freeze';

describe('notification reducer', () => {
  it('sets notification message with notification/setMessage', () => {
    const initialState = {
      message: null,
      error: false,
    };
    const action = {
      type: 'notification/setMessage',
      payload: 'test msg',
    };
    deepFreeze(initialState);
    const newState = notificationReducer(initialState, action);
    console.log(newState);
    expect(newState.message).toBe(action.payload);
  });
  it('sets error status with notification/setError', () => {
    const initialState = {
      message: null,
      error: false,
    };
    const action = {
      type: 'notification/setError',
      payload: true,
    };
    deepFreeze(initialState);
    const newState = notificationReducer(initialState, action);
    console.log(newState);
    expect(newState.error).toBe(action.payload);
  });
});
