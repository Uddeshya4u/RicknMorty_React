import { motion } from 'framer-motion';

export default function SidebarCross({ onClick, isOpen }) {
  const spanVariants = {
    closed: {
      rotate: 0,
      y: 0,
    },
    open: (spanIndex) => {
      switch (spanIndex) {
        case 0:
          return { rotate: 45, y: 12 };
        case 1:
          return { opacity: 0 };
        case 2:
          return { rotate: -45, y: -12 };
      }
    },
  };

  return (
    <div
      className='flex flex-col gap-1 lg:hidden mt-2 transition ease-in-out delay-[.4s]'
      onClick={onClick}
    >
      <motion.span
        className='bg-appBG w-[40px] h-2 rounded'
        variants={spanVariants}
        animate={isOpen ? 'open' : 'closed'}
        custom={0}
      ></motion.span>
      <motion.span
        className='bg-appBG w-[40px] h-2 rounded'
        variants={spanVariants}
        animate={isOpen ? 'open' : 'closed'}
        custom={1}
      >
        {' '}
      </motion.span>
      <motion.span
        className='bg-appBG w-[40px] h-2 rounded'
        variants={spanVariants}
        animate={isOpen ? 'open' : 'closed'}
        custom={2}
      >
        {' '}
      </motion.span>
    </div>
  );
}
