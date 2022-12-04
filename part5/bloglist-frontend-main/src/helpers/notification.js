const notify = (setMessage, message, setError, error) => {
  setMessage(message);
  setError(error);
  setTimeout(() => {
    setMessage(null);
  }, 5000);
};

export default notify;
