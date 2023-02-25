import React, { useEffect } from 'react';

const Notify = ({ errorMessage, setErrorMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line

  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

export default Notify;
