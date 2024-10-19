import React from 'react';

function Loading() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <span className='loading loading-ring text-green-400 w-[400px] h-[400px]'></span>
    </div>
  );
}

export default Loading;
