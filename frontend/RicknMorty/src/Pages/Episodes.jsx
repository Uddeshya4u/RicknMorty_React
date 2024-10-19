import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import EpisodesListing from '../components/EpisodesListing';

function Episodes() {
  let episodesApi = 'https://rickandmortyapi.com/api/episode';
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalEpisodes, setTotalEpisodes] = useState(0);
  let pageNum = 1;

  const fetchEpisodes = async () => {
    let episodeData = [];
    setIsLoading(true);
    const result = await axios.get(`${episodesApi}?page=${pageNum}`);
    const data = result.data.results;
    const totalPages = result.data.info['pages'];
    episodeData.push(...data);
    for (let i = pageNum + 1; i <= totalPages; i++) {
      const response = await axios.get(`${episodesApi}?page=${i}`);
      let data = response.data.results;
      episodeData.push(...data);
    }
    setEpisodes(episodeData);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchEpisodes();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div className='flex flex-col py-2'>
            <div className='RnM-font-regular text-5xl text-center text-mortyColor '>
              Episodes
            </div>
            <EpisodesListing episodes={episodes} />
          </div>
        </>
      )}
    </>
  );
}

export default Episodes;
