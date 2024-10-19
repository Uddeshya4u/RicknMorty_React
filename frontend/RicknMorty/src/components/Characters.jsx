import React from 'react';
import CharacterCard from './CharacterCard';

function Characters({ characters }) {
  return (
    <div className='w-full m-2 place-items-center grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 '>
      {characters.map((character) => {
        return <CharacterCard character={character} key={character.id} />;
      })}
    </div>
  );
}

export default Characters;
