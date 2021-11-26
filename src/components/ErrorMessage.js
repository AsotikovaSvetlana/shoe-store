import React from 'react';

export default function ErrorMessage(props) {
  const { handleError } = props;
  return (
    <div className="error-message">
      <span>Ошибка! Повторить запрос?</span>
      <button 
        className="btn btn-danger btn-block btn-lg" 
        onClick={handleError}
      >
        Да
      </button>
    </div>
  )
}
