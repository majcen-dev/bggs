import React, { useState, useEffect } from 'react';

import './App.css';
import { getBGGDataFromFetch, getArrayOfCoversRatio, sleep, filterMethod, sortDisplayed } from './libs/Helper';

import DisplayGallery from "./components/DisplayGallery"
import Navbar from './components/Navbar';
import Filterbar from './components/Filterbar';
import AlertLoading from './components/AlertLoading';
import AlertInfo from './components/AlertInfo';

import SelectCollections from './components/SelectCollections';
import SearchWindow from './components/SearchWindow';


function App() {
  const [owner, setOwner] = useState("");
  const [myCollection, setMyCollection] = useState([]);
  const [fiterCollection, setFiterCollection] = useState([]);
  const [debugMode, setDebugMode] = useState(false);
  const [filterPlayers, setFilterPlayers] = useState(0);
  const [filterMinTime, setFilterMinTime] = useState(0);
  const [filterMaxTime, setFilterMaxTime] = useState(0);
  const [random, setRandom] = useState(0);
  const [randomChange, setRandomChange] = useState(false);
  const [sort, setSort] = useState("");
  const [sortChange, setSortChange] = useState(false);
  const [hasCovers, setHasCovers] = useState(false);

  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("");
  const [getterFormOpen, setGetterFormOpen] = useState(false);
  const [showAlertLoading, setShowAlertLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState("");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);


  useEffect(() => {
    const col = filterMethod(myCollection, search, filterPlayers, filterMinTime, filterMaxTime, random);
    setFiterCollection(col);
    // eslint-disable-next-line
  }, [search, filterPlayers, filterMinTime, filterMaxTime,/*  myCollection,  */ random, randomChange]);


  useEffect(() => {
    let col = sortDisplayed(fiterCollection, sort);
    setFiterCollection(col);
    // eslint-disable-next-line
  }, [sort, sortChange]);

  useEffect(() => {
    (window.location.hash === "#debug") ? setDebugMode(true) : setDebugMode(false);
    if (window.location.hash === "#debug") alert(`w=${window.innerWidth} h=${window.innerHeight} w*h=${window.innerWidth * window.innerHeight}`);
    if (window.location.hash === "#reset") {
      localStorage.removeItem('FULL_COLLECTION');
      localStorage.removeItem('COLLECTION_OWNER');
    }

    const fullCollectionString = localStorage.getItem('FULL_COLLECTION');
    if (fullCollectionString) {
      const ownerName = localStorage.getItem('COLLECTION_OWNER');
      setOwner(ownerName);
      setUserName(ownerName);
      setMyCollection(JSON.parse(fullCollectionString));

      let fullCollectionObj = JSON.parse(fullCollectionString);

      for (let i = fullCollectionObj.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fullCollectionObj[i], fullCollectionObj[j]] = [fullCollectionObj[j], fullCollectionObj[i]];
      }
      setFiterCollection(fullCollectionObj);

      if (fullCollectionObj[0].cover)
        setHasCovers(true);
    }
  }, []);

  async function buttonGetCollecionBGG(username) {
    if (username.length < 3) return false;
    setShowAlertLoading(true);
    let retrievedData = await getBGGDataFromFetch(username);
    setShowAlertLoading(false);
    if (typeof retrievedData === "string") {
      setStatus(retrievedData); return;
    }
    if (!retrievedData || retrievedData.length === 0) {
      setStatus("retrievedData || retrievedData.length === 0");
      console.error('error - condition triggered:  !retrievedData || retrievedData.length === 0'); return;
    }

    localStorage.setItem('FULL_COLLECTION', JSON.stringify(retrievedData));
    localStorage.setItem('COLLECTION_OWNER', username);
    setMyCollection(retrievedData);
    setFiterCollection([...retrievedData]);
    setOwner(username);
  }

  async function buttonAddCoversToCollection() {
    if (myCollection.length === 0) {
      setStatus("ERROR: Import your collection first.");
      return;
    }

    setShowAlertLoading(true);

    const SUB_ARR_SIZE = 100;
    let collectionWithCovers;

    if (myCollection.length > SUB_ARR_SIZE) {
      const fullLen = myCollection.length;
      let arrOfArrs = [];

      let numOfArrays = Math.floor(fullLen / SUB_ARR_SIZE);
      let remainder = fullLen % SUB_ARR_SIZE;

      for (let i = 0; i < numOfArrays; i++) {
        let startPos = i * SUB_ARR_SIZE;
        let endPos = i * SUB_ARR_SIZE + SUB_ARR_SIZE;
        if (i === 0) {
          startPos = 0;
          endPos = i * SUB_ARR_SIZE + SUB_ARR_SIZE;
        }
        arrOfArrs.push(myCollection.slice(startPos, endPos));
      }
      if (remainder !== 0) {
        let startPos = (numOfArrays) * SUB_ARR_SIZE;
        let endPos = numOfArrays * SUB_ARR_SIZE + remainder;
        arrOfArrs.push(myCollection.slice(startPos, endPos));
      }

      let arrOfArrsReturned = [];

      for (let i = 0; i < arrOfArrs.length; i++) {
        setLoadingProgress(`(${i}/${arrOfArrs.length})`);

        const each = arrOfArrs[i];
        const returned = await getArrayOfCoversRatio(each);
        arrOfArrsReturned.push(returned);
        await sleep(1000);
      }

      collectionWithCovers = [].concat(...arrOfArrsReturned);

    } else
      collectionWithCovers = await getArrayOfCoversRatio(myCollection);

    setShowAlertLoading(false);

    if (collectionWithCovers && collectionWithCovers.length > 0) {
      localStorage.setItem('FULL_COLLECTION', JSON.stringify(collectionWithCovers));
      setMyCollection(collectionWithCovers);
      setFiterCollection([...collectionWithCovers]);
      if (collectionWithCovers[0].cover)
        setHasCovers(true);
    }
  }

  function buttonClearData() {
    localStorage.removeItem('FULL_COLLECTION');
    localStorage.removeItem('COLLECTION_OWNER');
    setOwner("");
    setMyCollection([]);
    setFiterCollection([]);
    setHasCovers(false);
    window.location.reload();
  }

  function handleFilter(players, minTime, maxTime, random) {
    if (players === 0 || players)
      setFilterPlayers(players);
    if (minTime === 0 || minTime)
      setFilterMinTime(minTime);
    if (maxTime === 0 || maxTime)
      setFilterMaxTime(maxTime);
    if (random === 0 || random) {
      setRandomChange(!randomChange);
      setRandom(random);
    }
  }



  return (
    <div className="">
      <Navbar
        owner={owner}
        collectionSize={myCollection.length}
        filteredSize={fiterCollection.length}
        setSort={setSort} setSortChange={setSortChange} sortChange={sortChange}
        setRandom={setRandom} setRandomChange={setRandomChange} randomChange={randomChange}
        buttonAddCoversToCollection={buttonAddCoversToCollection}
        hasCovers={hasCovers}
        setGetterFormOpen={setGetterFormOpen}
        setSearchOpen={setSearchOpen}
        search={search}
        setSearch={setSearch}
      />

      {showAlertLoading && <AlertLoading loadingProgress={loadingProgress} />}
      {status && <AlertInfo statusText={status} setStatus={setStatus} />}

      {getterFormOpen && <SelectCollections
        collectionSize={myCollection.length}
        setGetterFormOpen={setGetterFormOpen}
        userName={userName}
        setUserName={setUserName}
        buttonGetCollecionBGG={buttonGetCollecionBGG}
        buttonAddCoversToCollection={buttonAddCoversToCollection}
        buttonClearData={buttonClearData}
        hasCovers={hasCovers}
      />}

      {searchOpen && <SearchWindow
        setSearchOpen={setSearchOpen}
        search={search}
        setSearch={setSearch}
      />}
      <div className="mt-13"></div>
      <div className="mb-80">
        <DisplayGallery collection={fiterCollection} debugTable={debugMode} />
      </div>
      <Filterbar
        search={search}
        handleFilter={handleFilter}
        setSearch={setSearch}
        filterPlayers={filterPlayers}
        filterMinTime={filterMinTime}
        filterMaxTime={filterMaxTime}
        collectionSize={myCollection.length}
      ></Filterbar>
    </div>
  );
}

export default App;