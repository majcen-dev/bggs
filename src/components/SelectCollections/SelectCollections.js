import React from 'react';
import './SelectCollections.css';


function SelectCollections(props) {
  return (
    <>
      <div className="selectCollectionsOverlay" onClick={() => props.setGetterFormOpen(false)}></div>
      <div className="selectCollectionsContainer fixed z-40">
        <div
          className="bg-blue-100 text-gray-900 rounded-lg shadow-md p-6 pr-10"
          style={{minWidth: 280+"px"}}
        >
          <button
            className="opacity-75 cursor-pointer absolute top-0 right-0 py-2 px-3 hover:opacity-100 focus:outline-none"
            onClick={() => props.setGetterFormOpen(false)}
          >
            <span className="text-2xl">×</span>
          </button>
          <div>
            <h3 className="mb-8 text-xl font-semibold pb-2 border-b border-gray-800">Get BGG data</h3>
            <div className="flex items-center border-b border-gray-600 py-2">
              <input className="appearance-none bg-transparent border-none w-full text-gray-900 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text"
                placeholder="username"
                value={props.userName}
                onKeyUp={e => { if (e.keyCode === 13) { e.target.blur(); } }}
                onChange={e => props.setUserName(e.target.value)}
                autoFocus={true}
              />
              <button className="hidden sm:inline flex-shrink-0 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                onClick={() => {props.buttonGetCollecionBGG(props.userName); if(props.userName.length > 0) props.setGetterFormOpen(false);}}
              >Get Data</button>
              <button className="hidden sm:inline flex-shrink-0 border-transparent border-4 text-blue-600 hover:blue-teal-800 text-sm py-1 px-2 rounded"
                onClick={() => props.buttonClearData()}
              >Delete</button>
            </div>
            <div className="sm:hidden flex flex-col">
            <button className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 mt-4 rounded"
                onClick={() => {props.buttonGetCollecionBGG(props.userName); if(props.userName.length > 0) props.setGetterFormOpen(false);}}
              >Get Data</button>
              <button className="flex-shrink-0 block border-transparent border-4 text-blue-600 hover:blue-teal-800 text-sm py-1 px-2 rounded"
                onClick={() => props.buttonClearData()}
              >Delete</button>
              </div>
              
            {(!props.hasCovers && props.collectionSize > 0) &&
              <div className="flex flex-col mt-4">
                <button onClick={() => {props.buttonAddCoversToCollection(); props.setGetterFormOpen(false);}}
                  className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded">
                  Get Large Thumbnails
              </button>
                <div className=" ml-2 mt-2 text-xs text-gray-700">This may take a while</div>
                <div className=" ml-2 mt-2 text-xs text-gray-700">WARNING: around 10MB per 100 games</div>
              </div>}

          </div>
        </div>
      </div>
    </>
  );
}


export default SelectCollections;