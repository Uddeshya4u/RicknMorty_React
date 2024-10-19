import { useState } from 'react';
import SidebarCross from './animatable-components/SidebarCross';
import NavbarLinks from './NavbarLinks';
import Searchbar from './Searchbar';
import { motion } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const linksArray = ['Home', 'Locations', 'Episodes']; //Todo:Add Profile when ready ''Profile''.
  const linktoArray = ['/', '/location', '/episodes']; //Todo:Linkfor profile '/profile'
  const handleCrossTapped = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`bg-cementGray p-4 ${isOpen ? 'relative' : ''}`}>
      <div className='container mx-auto flex justify-between items-center'>
        <SidebarCross onClick={handleCrossTapped} isOpen={isOpen} />
        <div className='flex items-center'>
          <img
            src='src\assets\icons\appIcon.png'
            alt='icon'
            className='h-[44px] w-[44px]'
          />
          <h1 className='underline RnM-font-regular text-3xl ml-2'>
            {`Rick 'n' Morty`}
          </h1>
        </div>
        <div className='hidden lg:flex flex-grow justify-evenly items-center space-x-6'>
          {linksArray.map((val, ind) => {
            return (
              <NavbarLinks title={val} key={ind} link={linktoArray[ind]} />
            );
          })}
          <Searchbar />
        </div>
      </div>
      {isOpen && (
        <motion.div
          className=' z-50 lg:hidden mt-4 p-5 bg-cementGray rounded-r-lg w-max absolute left-0 top-12'
          initial={{ opacity: 0, top: 0, marginTop: 0 }}
          animate={{
            opacity: 1,
            top: 12,
            marginTop: '48px',
          }}
          transition={{ delay: 0.1 }}
        >
          <Searchbar setIsOpen={setIsOpen} />
          {linksArray.map((val, ind) => {
            return (
              <NavbarLinks
                title={val}
                key={ind}
                link={linktoArray[ind]}
                setIsOpen={setIsOpen}
              />
            );
          })}
        </motion.div>
      )}
    </nav>
  );
}
export default Navbar;
