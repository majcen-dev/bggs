import React from 'react';
import './ClearSearchButton.css';


function ClearSearchButton(props) {
  return (
    <>
      <div className={`clearSearch text-blue-600 bg-white rounded-full pl-3 pr-1 p-2 flex`} onClick={() => { props.setSearch(""); props.setSearchOpen(false); }} style={{ height: 40 }} >
        <span className="font-semibold text-black mr-1 unselectableSearch">Clear</span>
        <svg viewBox="0 0 20 20" fill="currentColor" className="search-circle w-8 h-8"><path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd"></path></svg>
      </div>

    </>
  );
}

export default ClearSearchButton;