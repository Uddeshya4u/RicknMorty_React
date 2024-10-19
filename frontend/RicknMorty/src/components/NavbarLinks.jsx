import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NavbarLinks({ title, link, setIsOpen }) {
  return (
    <div className='RnM-font-regular text-2xl hover:underline mt-1'>
      <Link
        to={link}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        {title}
      </Link>
    </div>
  );
}
