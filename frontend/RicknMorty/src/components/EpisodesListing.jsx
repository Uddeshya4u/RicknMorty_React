import React, { useState } from 'react';
import { useEffect } from 'react';
import Seasonlist from './Seasonlist';

export default function EpisodesListing(props) {
  const { episodes } = props;
  const [seasonlisting, setSeasonlisting] = useState([]);
  const filterEpisode = () => {
    const seasonList = [];
    const episodeArray = episodes.map((episode) => {
      const season = filterSeason(episode['episode']);
      return season;
    });
    const numObj = {};
    for (let i = 0; i < episodeArray.length; i++) {
      if (episodeArray[i] in numObj) {
        numObj[episodeArray[i]]++;
      } else {
        numObj[episodeArray[i]] = 1;
      }
    }
    const seasonListArray = [];
    let currentIndex = 0;
    for (const key in numObj) {
      const newObj = {
        season: key,
        episodes: episodes.slice(currentIndex, currentIndex + numObj[key]),
      };
      seasonListArray.push(newObj);
      currentIndex = currentIndex + numObj[key];
    }
    console.log(seasonListArray);
    setSeasonlisting(seasonListArray);
  };

  useEffect(() => {
    filterEpisode();
  }, []);

  const filterSeason = (episode) => {
    const indexOfEpisode = episode.indexOf('E');
    const season = episode.substring(0, indexOfEpisode);
    return season;
  };

  return (
    <>
      <div className='w-full grid grid-cols-1 gap-2'>
        {seasonlisting.map((episodes, index) => {
          return <Seasonlist list={episodes} key={index} />;
        })}
      </div>
    </>
  );
}
