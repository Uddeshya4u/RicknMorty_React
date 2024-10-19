import React from 'react';

function RedirectButton({ title, onClick, otherStyles }) {
  return (
    <div
      className={` rounded-lg text-center bg-cementGray text-mortyColor ${otherStyles}`}
      onClick={onClick}
    >
      {title}
    </div>
  );
}

export default RedirectButton;
