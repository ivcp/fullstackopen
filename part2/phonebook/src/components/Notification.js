const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  const styles = error ? 'message error' : 'message';

  return <div className={styles}>{message}</div>;
};

export default Notification;
