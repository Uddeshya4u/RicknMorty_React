import React from 'react';
import ListStyleCard from '../ListStyleCard';
import { AnimatePresence, motion } from 'framer-motion';

export default function AnimatedList({ residents, otherStyles }) {
  return (
    <AnimatePresence>
      <motion.div
        className={`flex flex-col gap-4 ${otherStyles}`}
        initial='hidden'
        animate='visible'
        exit='hidden'
        variants={{
          visible: { transition: { staggerChildren: 0.001 } },
        }}
      >
        {residents.map((resident) => {
          return <ListStyleCard character={resident} key={resident.id} />;
        })}
      </motion.div>
    </AnimatePresence>
  );
}
