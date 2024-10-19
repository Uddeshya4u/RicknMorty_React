import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';

function FilterDropdown({
  setFilter,
  setCurrentPage,
  handleSpeciesTap,
  options,
}) {
  const [categoryIsOpen, setCategoryIsOpen] = useState(false);
  const handleOnClick = () => {
    setCategoryIsOpen(!categoryIsOpen);
  };

  return (
    <div className='relative'>
      <motion.div
        className='bg-cementGray rounded-xl p-3 mr-2 RnM-font-regular text-2xl'
        onClick={handleOnClick}
      >
        Filter {!categoryIsOpen ? <span>&#11167;</span> : <span>&#11165;</span>}
      </motion.div>
      {categoryIsOpen && (
        <MainDropDown
          items={options}
          setFilter={setFilter}
          setCurrentPage={setCurrentPage}
          setCategoryIsOpen={setCategoryIsOpen}
          handleSpeciesTap={handleSpeciesTap}
        />
      )}
    </div>
  );
}
const MainDropDown = ({
  items,
  setFilter,
  setCurrentPage,
  setCategoryIsOpen,
  handleSpeciesTap,
}) => {
  const [selectedItem, setSelectedItem] = useState('');
  const handleClick = (key) => {
    setSelectedItem((prev) => (prev += `${key}`));
  };

  useEffect(() => {
    if (selectedItem === '') {
      return;
    }
    let selectedFilter = selectedItem.split(' ');
    if (selectedFilter.length === 2 && selectedFilter[1] === 'species') {
      handleSpeciesTap();
      setCategoryIsOpen(false);
    }
    if (selectedFilter.length === 3) {
      let filterString = `&${selectedFilter[1]}=${selectedFilter[2]}`;
      setCurrentPage(0);
      setFilter(filterString);
      setCategoryIsOpen(false);
    }
    console.log('Selected String', selectedFilter);
  }, [selectedItem]);

  return (
    <motion.div className='bg-cementGray rounded-xl p-3 mr-2 RnM-font-regular text-2xl absolute top-0 -left-28 z-10'>
      <ul>
        {items.map((item, ind) => {
          return <DropDownItem key={ind} item={item} onSelect={handleClick} />;
        })}
      </ul>
    </motion.div>
  );
};
const DropDownItem = ({ item, onSelect }) => {
  const [shouldOpen, setShouldOpen] = useState(false);
  const handleOnClick = () => {
    onSelect(` ${item.key}`);
    setShouldOpen(!shouldOpen);
  };
  return (
    <>
      <li onClick={handleOnClick}>{item.title}</li>
      {item.subCategories && shouldOpen && item.subCategories.length > 0 && (
        <motion.div className='bg-cementGray rounded-xl p-3 mr-2 RnM-font-regular text-2xl absolute top-0 -left-40 z-10'>
          <ul>
            {item.subCategories.map((item, ind) => {
              return <DropDownItem key={ind} item={item} onSelect={onSelect} />;
            })}
          </ul>
        </motion.div>
      )}
    </>
  );
};

export default FilterDropdown;
