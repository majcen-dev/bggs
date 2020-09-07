import React from 'react';
import './AlertLoading.css';
import './Loader.css';


function AlertLoading(props) {
  return (
    <>
      <div className="alertLoadingOverlay"></div>
      <div className="fixed top-0 right-0 m-6 z-40">
        <div
          className="bg-indigo-300 text-indigo-800 rounded-lg shadow-md p-6 pr-10"
          styles="min-width: 240px"
        >
          <div className="flex items-center font-semibold">
            <span className="loader"></span>
            <span>
              Loading data from server.
              <br />Please wait... {props.loadingProgress}
            </span>            
        </div>
        </div>
      </div>
    </>
  );
}

export default AlertLoading;