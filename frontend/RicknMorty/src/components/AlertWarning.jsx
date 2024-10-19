import React from 'react';
import { AnimatePresence, motion, spring } from 'framer-motion';

function AlertWarning({ showAlert, title }) {
  const exitTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 10,
    duration: 0.1,
  };
  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          initial={{ y: -300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -300, opacity: 0, transition: { exitTransition } }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 10,
            duration: 0.5,
          }}
          className={`alert alert-error m-2 bg-rickColor`}
        >
          <span className='RnM-font-regular text-2xl text-center text-red-600'>
            {title}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AlertWarning;
