import React, { useEffect, useState } from 'react';
import RedirectButton from './RedirectButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AnimatedList from './animatable-components/AnimatedList';

export default function Searchbar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [currentURL, setCurrentURL] = useState('');
  const navigate = useNavigate();

  // Functions
  const onSeeAllResultsClick = () => {
    console.log('CurrentURL', currentURL);
    navigate('/', { state: { query: currentURL } });
  };

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
  };

  const fetchCharacters = async (query) => {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?&name=${query}`
    );
    const characterList = response.data.results;
    if (characterList.length >= 5) {
      setResults(characterList.slice(0, 5));
      setCurrentURL(query);
    } else {
      setResults(characterList);
      setCurrentURL(query);
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        fetchCharacters(query);
      } else if (query && results.length == 0) {
        setResults([]);
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className='relative'>
      <input
        type='text'
        placeholder='Search...'
        className='p-1 rounded text-2xl RnM-font-regular bg-appBG text-cementGray w-[120px] lg:w-max '
        onChange={handleSearchInput}
      />
      {results.length > 0 && (
        <div className='w-max rounded-xl bg-black p-2 absolute top-0 left-28 border-white border-2 md:top-0 md:right-0 lg:top-12 lg:left-0 lg:z-50'>
          <AnimatedList residents={results} />
          <RedirectButton
            title={!results.length > 5 ? 'See results' : 'See all results'}
            onClick={onSeeAllResultsClick}
            otherStyles={'mt-2 h-max p-2 font-bold'}
          />
        </div>
      )}
    </div>
  );
}
