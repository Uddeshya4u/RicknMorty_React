import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import Characters from '../components/Characters';
import FilterDropdown from '../components/FilterDropdown';
import Loading from '../components/Loading';
import AlertWarning from '../components/AlertWarning';
import { useLocation } from 'react-router-dom';

export default function SearchResults() {
  let charactersApi = 'https://rickandmortyapi.com/api/character/?';
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  const { query } = location.state || { query: '' };

  const categories = [
    {
      title: 'Status',
      key: 'status',
      subCategories: [
        {
          title: 'Alive',
          key: 'alive',
        },
        {
          title: 'Dead',
          key: 'dead',
        },
        {
          title: 'Unknown',
          key: 'unknown',
        },
      ],
    },
    {
      title: 'Gender',
      key: 'gender',
      subCategories: [
        {
          title: 'Male',
          key: 'male',
        },
        {
          title: 'Female',
          key: 'female',
        },
        {
          title: 'Genderless',
          key: 'genderless',
        },
        {
          title: 'Unknown',
          key: 'unknown',
        },
      ],
    },
    {
      title: 'Species',
      key: 'species',
      subCategories: [],
    },
  ];
  const fetchCharacters = async () => {
    try {
      console.log('query: ', query);
      const result = await axios.get(
        `${charactersApi}&page=${currentPage + 1}${filter}&name=${query}`
      );
      setIsLoading(true);
      const data = result.data;
      setTotalPages(data.info['pages']);
      setCharacters(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log('Error While fetching Characters');
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [currentPage, filter, query]);

  const handleSpeciesTap = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div className='flex items-center flex-col py-2'>
            <AlertWarning
              showAlert={showAlert}
              title=' Believe Me You dont wanna go down that rabbit hole !!!'
            />
            <div className='RnM-font-regular text-5xl text-center text-mortyColor '>
              {`Search Results for ${query}`}
            </div>
            <div className='flex self-end'>
              <FilterDropdown
                setFilter={setFilter}
                setCurrentPage={setCurrentPage}
                handleSpeciesTap={handleSpeciesTap}
                options={categories}
              />
            </div>
            <Characters characters={characters} />
          </div>
          <Pagination totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </>
      )}
    </>
  );
}
