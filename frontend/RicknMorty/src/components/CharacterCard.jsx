import React from 'react';
import { motion, spring } from 'framer-motion';

export default function CharacterCard({ character }) {
  return (
    <motion.div
      className='card bg-cementGray min-w-96 w-fit relative shadow-cementGray shadow-sm'
      whileHover={{
        scale: 1.03,
      }}
    >
      <div
        className={`badge badge-lg absolute top-2 right-2 ${
          character.status == 'Alive'
            ? 'bg-green-400'
            : character.status == 'Dead'
            ? 'bg-red-600'
            : 'bg-gray-500'
        }`}
      >
        {character.status}
      </div>
      <figure>
        <img
          src={character.image}
          alt={character.name}
          className='w-full rounded-t-xl'
        />
      </figure>
      <div className='card-body'>
        <motion.h2 className='card-title RnM-font-regular text-2xl'>
          {character.name}
        </motion.h2>
        <p className='RnM-font-regular text-xl'>{character.gender}</p>
        <p className='RnM-font-regular text-xl'>{character.species}</p>
      </div>
    </motion.div>
  );
}
