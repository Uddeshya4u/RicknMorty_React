import React from 'react';

function SingleEpisode({ episode }) {
  const filterEpisode = (episode) => {
    const indexOfEpisode = episode.indexOf('E');
    const episodeNum = episode.substring(indexOfEpisode, episode.length);
    return episodeNum;
  };
  return (
    <div className='bg-rickColor m-2 text-xl p-2 rounded flex flex-col min-w-40'>
      <div className='flex flex-row'>
        <h3>{filterEpisode(episode.episode)}</h3>
        <p> &nbsp; : &nbsp; </p>
        <p>{episode.name}</p>
      </div>
      <div className='flex flex-row'>
        <p>Aired on &nbsp; : &nbsp; </p>
        <p>{episode.air_date}</p>
      </div>
    </div>
  );
}

export default SingleEpisode;
