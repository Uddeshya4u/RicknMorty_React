import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function ListStyleCard({ character }) {
  return (
    <motion.figure
      className='relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-xl p-4 bg-rickColor'
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={{
        hidden: {
          y: -100,
          opacity: 0,
          transition: { type: 'tween', delay: 1 },
        },
        visible: {
          y: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 50 },
        },
      }}
    >
      <div className='flex flex-row items-center gap-3'>
        <div className='flex size-20 items-center justify-center rounded-2xl'>
          <img
            src={character.image}
            alt={character.name}
            className='w-full rounded-sm'
          />
        </div>
        <div className='flex flex-col '>
          <figcaption className='flex flex-row items-center'>
            <span className='text-xl'>{character.name}</span>
            <span className='mx-1'>·</span>
            <span
              className={`text-lg ${
                character.status == 'Alive'
                  ? 'text-green-500'
                  : character.status == 'Dead'
                  ? 'text-red-600'
                  : 'text-gray-500'
              }`}
            >
              {character.status}
            </span>
          </figcaption>
          <p className='text-xl font-normal'>{character.species}</p>
        </div>
      </div>
    </motion.figure>
  );
}

export default ListStyleCard;
