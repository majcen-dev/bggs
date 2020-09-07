import React from 'react';
import './AlertInfo.css';


function AlertInfo(props) {

  let classTxt = "bg-red-300 text-red-800 rounded-lg shadow-md p-6 pr-10";
  if (props.statusText && props.statusText.startsWith("INFO"))
    classTxt = "bg-yellow-300 text-yellow-800 rounded-lg shadow-md p-6 pr-10";


  return (
    <>
      <div className="alertInfoOverlay" onClick={() => props.setStatus("")}></div>
      <div className="alertInfoContainer z-50">
        <div
          className={classTxt}
          styles="min-width: 240px"
        >
          <button
            className="opacity-75 cursor-pointer absolute top-0 right-0 py-2 px-3 hover:opacity-100 focus:outline-none"
            onClick={() => props.setStatus("")}
          >
            <span className="text-2xl">×</span>
          </button>
          <div className="flex items-center font-semibold">
            <svg viewBox="0 0 20 20" fill="currentColor" className="information-circle w-6 h-6 mr-2">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg><span>{props.statusText}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlertInfo;