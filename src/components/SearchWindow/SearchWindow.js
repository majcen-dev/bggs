import React from 'react';
import './SearchWindow.css';


function SearchWindow(props) {
  return (
    <>
      <div className="searchWindowOverlay" onClick={() => props.setSearchOpen(false)}></div>
      <div className="searchWindowContainer fixed z-40">
        <div
          className="bg-blue-100 text-gray-900 rounded-lg shadow-md p-6 pr-10"
          style={{ minWidth: 280 + "px" }}
        >
          <button
            className="opacity-75 cursor-pointer absolute top-0 right-0 py-2 px-3 hover:opacity-100 focus:outline-none"
            onClick={() => props.setSearchOpen(false)}
          >
            <span className="text-2xl">×</span>
          </button>
          <div>
            <h3 className="mb-8 text-xl font-semibold pb-2 border-b border-gray-800">Search:</h3>
            <div className="flex items-center border-b border-gray-600 py-2">
              <input className="appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text"
                placeholder="search term"
                value={props.search}
                onChange={e => props.setSearch(e.target.value)}
                onKeyUp={e => { if (e.keyCode === 13) { e.target.blur(); props.setSearchOpen(false); } }}
                autoFocus={true}
              />
              <svg viewBox="0 0 20 20" fill="currentColor" className="search 6-8 h-6 text-gray-600 mr-2"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>

            <div className="w-9/12 mt-2 ml-8 hidden">
              <input type="text" placeholder="Search:" value={props.search} onChange={e => props.setSearch(e.target.value)}
                onKeyUp={e => { if (e.keyCode === 13) { e.target.blur(); props.setSearch("") } }}
                className="h-8 w-24 ml-2 border-2 border-gray-300 bg-white px-2 rounded-lg text-sm pr-6 focus:outline-none"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default SearchWindow;