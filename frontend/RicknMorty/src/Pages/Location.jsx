import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import LocationStack from '../components/LocationStack';

function Location() {
  let locationsApi = 'https://rickandmortyapi.com/api/location';
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
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
  ];

  const fetchLocations = async () => {
    const result = await axios.get(`${locationsApi}/?page=${currentPage + 1}`);
    setIsLoading(true);
    const data = result.data;
    setTotalPages(data.info['pages']);
    setLocations(data.results);
    setIsLoading(false);
    console.log('Locations', data.results);
  };

  useEffect(() => {
    fetchLocations();
  }, [currentPage]);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div className='flex flex-col py-2'>
            <div className='RnM-font-regular text-5xl text-center text-mortyColor '>
              Locations
            </div>
            <LocationStack locations={locations} />
          </div>
        </>
      )}
    </>
  );
}

export default Location;
