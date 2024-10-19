import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimatedList from './animatable-components/AnimatedList';
import { FaAnglesDown, FaAnglesUp } from 'react-icons/fa6';

export default function LocationRows({ location }) {
  const [residents, setResidents] = useState([]);
  const [showResidents, setShowResidents] = useState(false);
  useEffect(() => {
    fetchResidents();
    return () => {};
  }, []);

  async function fetchResidents() {
    if (getURL() === '') {
      return;
    }
    try {
      const result = await axios.get(
        `https://rickandmortyapi.com/api/character/${getURL()}`
      );
      //console.log(result.data);
      setResidents(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  const getURL = () => {
    const residentsArray = location.residents;
    if (residentsArray.length === 0) {
      return '';
    }
    let resultArray = '[';

    for (let resident of residentsArray) {
      let resultString = '';
      let lengthOfResidents = resident.length;
      while (lengthOfResidents != 0) {
        if (resident[lengthOfResidents - 1] == '/') {
          break;
        }
        resultString += resident[lengthOfResidents - 1];
        lengthOfResidents--;
      }
      resultArray =
        resultArray + resultString.split('').reverse().join('') + ',';
    }

    resultArray = resultArray.substring(0, resultArray.length - 1) + ']';

    return resultArray;
  };
  const handleOnCLick = (e) => {
    setShowResidents((prev) => !prev);
  };

  return (
    <div className='rounded-md bg-cementGray h-full m-2 p-4 RnM-font-regular grid'>
      <div className='text-3xl text-center col-span-2'>
        <span className='text-rickColor'>Name : </span>
        <span className='text-mortyColor'> {location.name}</span>
      </div>
      <div className=' text-2xl col-span-2 grid grid-rows-subgrid grid-cols-2'>
        <div className='justify-self-start'>
          <span className='text-rickColor'>Type: </span>
          <span className='text-mortyColor'>{location.type}</span>
        </div>
        <div className='justify-self-end'>
          <span className='text-rickColor'>Dimension: </span>
          <span className='text-mortyColor'>{location.dimension}</span>
        </div>
      </div>
      <div className='col-span-2 justify-center'>
        {showResidents && (
          <AnimatedList
            residents={residents}
            otherStyles={'md:flex-row md:flex-wrap lg:flex-row lg:flex-wrap '}
          />
        )}
        <div
          className='flex items-center justify-center text-2xl text-emerald-500 gap-2'
          onClick={handleOnCLick}
        >
          <p className=''>
            {showResidents ? 'Hide Residents' : 'Show Residents'}
          </p>
          {showResidents ? <FaAnglesUp /> : <FaAnglesDown />}
        </div>
      </div>
    </div>
  );
}
