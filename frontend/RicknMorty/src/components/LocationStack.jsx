import React from 'react';
import LocationRows from './LocationRows';

function LocationStack(props) {
  const { locations } = props;
  return (
    <>
      <div className='w-full grid grid-cols-1 gap-2'>
        {locations.map((location) => {
          return <LocationRows location={location} key={location.id} />;
        })}
      </div>
    </>
  );
}

export default LocationStack;
