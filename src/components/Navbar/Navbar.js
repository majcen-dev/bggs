import React/* , { useState, useEffect } */ from 'react';
import './Navbar.css';

import ClearSearchButton from './../ClearSearchButton';

import { ReactComponent as Abc } from './svgs/alphabet.svg';
import { ReactComponent as Stars } from './svgs/two-stars.svg';
import { ReactComponent as Random } from './svgs/random.svg';


function Navbar(props) {


  return (
    <>
      <nav className="w-screen fixed top-0 pt-2 z-20 h-13 border-b-2 border-blue-200 bg-blue-500 unselectable">
        <div className="flex justify-between px-2">

          {props.owner &&
            <div className=" ml-4 text-xl text-gray-800 cursor-pointer font-semibold" onClick={() => { props.setGetterFormOpen(true) }}>
              {props.hasCovers && /* PHOTO_IMG + NAME + NUMBER */
                <><svg viewBox="0 0 20 20" fill="currentColor" className="photograph w-6 h-6 pb-01r hidden xs:inline"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
                  <span className="nameTag hidden xs:inline"> {props.owner.length > 12 ? props.owner.substring(0, 12) : props.owner}</span>
                  <span className=""> ({props.filteredSize})</span></>
              }
              {!props.hasCovers && /* PHOTO_TABLE + NAME + NUMBER */
                <><svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 hidden xs:inline pb-01r"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
                  <span className="nameTag hidden xs:inline"> {props.owner.length > 12 ? props.owner.substring(0, 12) : props.owner}</span>
                  <span className=""> ({props.filteredSize})</span></>
              }

            </div>
          }
          {!props.owner && /* PHOTO_TABLE + Get collection */
            <div className="ml-4 text-xl text-gray-800 cursor-pointer" onClick={() => { props.setGetterFormOpen(true) }}>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 inline"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg><span className="">Get collection</span>
            </div>
          }

          {(props.owner && !props.hasCovers) && /* GET BETTER THUMBS BUTTON */
            <div className="ml-4 text-sm text-gray-100 cursor-pointer border-2 border-gray-100 py-1 px-2 rounded-full hidden sm:block" onClick={() => { props.setGetterFormOpen(true) }}>
              <span className="hidden ms:inline">Get</span> <svg viewBox="0 0 20 20" fill="currentColor" className="photograph w-4 h-4 inline pb-01r"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path></svg>
            </div>
          }

          {props.owner &&
            <>
              <div className={"flex justify-around items-center w-6/12 px-2"}>
                <div onClick={() => { props.setSort("avgDsc"); props.setSortChange(!props.sortChange); }} className="cursor-pointer hidden xs:inline">
                  <Stars className="w-6 h-6 mx-3 inline" style={{ fill: "#fff" }} />
                </div>
                <div onClick={() => { props.setSort(""); props.setSortChange(!props.sortChange); }} className="cursor-pointer hidden ms:inline">
                  <Abc className="w-6 h-6 mx-3 inline" style={{ fill: "#fff" }} />
                </div>
                <div onClick={() => { props.setRandom(props.filteredSize); props.setRandomChange(!props.randomChange); }} className="cursor-pointer inline">
                  <Random className="w-6 h-6 mx-3 inline" style={{ fill: "#fff" }} />
                </div>
                <div onClick={() => { props.setSearchOpen(true) }} className="cursor-pointer inline">{/* SEARCH */}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="search-circle w-6 h-6 mx-3 inline" style={{ fill: "#fff" }} ><path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z"></path><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z" clipRule="evenodd"></path></svg>
                </div>
                <div onClick={() => { window.open("https://github.com/majcen-dev/bggs/blob/master/README.md", "_blank"); }} className="cursor-pointer inline">{/* INFO */}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="information-circle w-6 h-6 mx-3 inline" style={{ fill: "#fff" }} ><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                </div>
              </div>
            </>}

        </div>

      </nav>
      {props.search &&
        <ClearSearchButton
          setSearch={props.setSearch}
          setSearchOpen={props.setSearchOpen}
        />}
    </>
  );
}

export default Navbar;