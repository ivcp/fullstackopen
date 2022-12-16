import notificationReducer from './notificationReducer';

describe('notification reducer', () => {
  test('returns new notification with setNotification', () => {
    const initialMessage = '';
    const action = {
      type: 'notification/setNotification',
      payload: 'Brand new notification!',
    };

    const state = notificationReducer(initialMessage, action);
    expect(state).toBe(action.payload);
  });
  test('reset to initial state with removeNotification', () => {
    const action = {
      type: 'notification/removeNotification',
    };

    const state = notificationReducer(undefined, action);
    expect(state).toBe('');
  });
});
