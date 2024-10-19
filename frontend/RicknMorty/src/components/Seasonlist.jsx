import React from 'react';
import SingleEpisode from './SingleEpisode';

function Seasonlist({ list }) {
  return (
    <>
      <div className='flex flex-col m-2 RnM-font-regular'>
        <div className='w-[140px] h-[20px] text-center  text-xl border-l-solid border-l-[25px] border-l-transparent border-r-[25px] border-r-solid border-r-transparent border-b-[25px] border-b-solid border-b-cementGray'>
          {list.season}
        </div>
        <div className='bg-cementGray flex flex-col gap-4 md:flex-row md:flex-wrap lg:flex-row lg:flex-wrap rounded-tr-lg rounded-br-lg rounded-bl-lg'>
          {list.episodes.map((episode) => {
            return <SingleEpisode episode={episode} key={episode.id} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Seasonlist;
