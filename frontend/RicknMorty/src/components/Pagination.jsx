import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ totalPages, setCurrentPage }) {
  const [shouldDeactivatePrev, setShouldDeactivatePrev] = useState(false);
  const [shouldDeactivateNext, setShouldDeactivateNext] = useState(false);
  function onPageChange(e) {
    setCurrentPage(e.selected);
    if (e.selected == 0) {
      setShouldDeactivatePrev(true);
    } else if (e.selected == totalPages - 1) {
      setShouldDeactivateNext(true);
    } else {
      setShouldDeactivatePrev(false);
      setShouldDeactivateNext(false);
    }
  }
  return (
    <>
      <ReactPaginate
        containerClassName='paginationContainer'
        pageClassName='pageLinks'
        activeClassName='activePage'
        pageCount={totalPages}
        onPageChange={onPageChange}
        breakLabel={<CustomPagingExpand title={'...'} />}
        previousLabel={
          shouldDeactivatePrev ? (
            <CustomPagingButtons
              title={'Prev'}
              otherStyles={'bg-gray-600 cursor-not-allowed'}
            />
          ) : (
            <CustomPagingButtons title={'Prev'} />
          )
        }
        nextLabel={
          shouldDeactivateNext ? (
            <CustomPagingButtons
              title={'Next'}
              otherStyles={'bg-gray-600 cursor-not-allowed'}
            />
          ) : (
            <CustomPagingButtons title={'Next'} />
          )
        }
      />
    </>
  );
}

function CustomPagingButtons({ title, otherStyles }) {
  return (
    <div
      className={`bg-rickColor RnM-font-regular text-2xl rounded-xl p-1 ${otherStyles}`}
    >
      {title}
    </div>
  );
}
function CustomPagingExpand({ title }) {
  return (
    <div className=' RnM-font-regular text-2xl rounded-xl p-1 text-mortyColor'>
      {title}
    </div>
  );
}
