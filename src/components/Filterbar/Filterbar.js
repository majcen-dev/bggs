import React, { useLayoutEffect, useState, useEffect } from 'react';
import './Filterbar.css';

import ScrollToTopButton from './../ScrollToTopButton';

import { Player1Icon, Player3Icon, ClockIcon, RightIcon, LeftIcon, Undo, FilterMenuIcon1, FilterMenuIcon2 } from './Svgs'
import { ReactComponent as Die1 } from './diceSvgs/die1.svg';
import { ReactComponent as Die2 } from './diceSvgs/die2.svg';
// import { ReactComponent as Die3 } from './diceSvgs/die3.svg';
import { ReactComponent as Die4 } from './diceSvgs/die4.svg';
// import { ReactComponent as Die5 } from './diceSvgs/die5.svg';
import { ReactComponent as Die6 } from './diceSvgs/die6.svg';
import { ReactComponent as Dice } from './diceSvgs/dice.svg';



function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function Filterbar(props) {
  const [width, height] = useWindowSize();

  const [playerRange, setPlayerRange] = useState("0");
  const [minTimeRange, setMinTimeRange] = useState("0");
  const [maxTimeRange, setMaxTimeRange] = useState("190");

  const [playerTimeoutID, setPlayerTimeoutID] = useState(0);
  const [minPTTimeoutID, setMinPTTimeoutID] = useState(0);
  const [maxPTTimeoutID, setMaxPTTimeoutID] = useState(0);

  const [showBig, setShowBig] = useState(false);

  useEffect(() => {
    const thumb = document.querySelectorAll('.range-thumb')[0];
    const input = document.querySelectorAll('.range')[0];
    const max = input.max;
    const tw = thumb.clientWidth; // Thumb width. See CSS
    const w = input.clientWidth;
    const xPX = playerRange * (w - tw) / max;
    thumb.style.left = xPX + "px";

    function debounce(fn, delay) {
      return function (...args) {
        if (playerTimeoutID) {
          clearTimeout(playerTimeoutID);
          setPlayerTimeoutID(0);
        }
        let toID = setTimeout(() => {
          fn(...args);
        }, delay);
        setPlayerTimeoutID(toID);
      }
    }
    const dbnc = debounce(() => {
      handlePlayers(Number.parseInt(playerRange, 10));
    }, 300);
    dbnc();
    // eslint-disable-next-line
  }, [playerRange, width, height, showBig]);

  useEffect(() => {
    const thumb = document.querySelectorAll('.range-thumb')[1];
    const input = document.querySelectorAll('.range')[1];
    const max = input.max;
    const tw = thumb.clientWidth; // Thumb width. See CSS
    const w = input.clientWidth;
    const xPX = minTimeRange * (w - tw) / max;
    thumb.style.left = xPX + "px";

    function debounce(fn, delay) {
      return function (...args) {
        if (minPTTimeoutID) {
          clearTimeout(minPTTimeoutID);
          setMinPTTimeoutID(0);
        }
        let toID = setTimeout(() => {
          fn(...args);
        }, delay);
        setMinPTTimeoutID(toID);
      }
    }
    const dbnc = debounce(() => {
      let numMax = Number.parseInt(maxTimeRange, 10);
      let numMin = Number.parseInt(minTimeRange, 10);


      if (numMax < numMin)
        setMaxTimeRange(numMin + "");

      handleMinTime(numMin);

    }, 300);
    dbnc();
    // eslint-disable-next-line
  }, [minTimeRange, width, height, showBig]);

  useEffect(() => {
    const thumb = document.querySelectorAll('.range-thumb')[2];
    const input = document.querySelectorAll('.range')[2];
    const max = input.max - input.min;
    const tw = thumb.clientWidth; // Thumb width. See CSS
    const w = input.clientWidth;
    const xPX = (maxTimeRange - input.min) * (w - tw) / max;
    thumb.style.left = xPX + "px";

    function debounce(fn, delay) {
      return function (...args) {
        if (maxPTTimeoutID) {
          clearTimeout(maxPTTimeoutID);
          setMaxPTTimeoutID(0);
        }
        let toID = setTimeout(() => {
          fn(...args);
        }, delay);
        setMaxPTTimeoutID(toID);
      }
    }
    const dbnc = debounce(() => {
      let numMax = Number.parseInt(maxTimeRange, 10);
      let numMin = Number.parseInt(minTimeRange, 10);


      if (numMax < numMin)
        setMinTimeRange(numMax + "");

      if (numMax === 190)
        numMax = 0;
      handleMaxTime(numMax);

    }, 300);
    dbnc();
    // eslint-disable-next-line
  }, [maxTimeRange, width, height, showBig]);

  function handlePlayers(players) {
    props.handleFilter(players, null, null, null);
  }
  function handleMinTime(minTime) {
    props.handleFilter(null, minTime, null, null);
  }
  function handleMaxTime(maxTime) {
    props.handleFilter(null, null, maxTime, null);
  }
  function handleRandom(random) {
    props.handleFilter(null, null, null, random);
  }

  return (
    <span className={props.collectionSize === 0 ? "hidden" : ""}>
      <ScrollToTopButton myHeight={showBig ? "80" : "16"} />
      <span className={showBig ? "hidden" : " unselectable"}>
        <div onClick={() => setShowBig(!showBig)} className="fixed bottom-0 left-0 mb-3 ml-2 z-30 cursor-pointer text-gray-600"><FilterMenuIcon1 /></div>
        <div onClick={() => setShowBig(!showBig)} className="fixed bottom-0 right-0 mb-3 mr-2 z-30 cursor-pointer text-gray-600"><FilterMenuIcon2 /></div>
        <div id="filterBar" className="fixed bottom-0 z-20 bg-blue-100 h-12 w-screen border-t-2 border-blue-200">
          <div className=" ">
            <div className="flex justify-evenly font-semibold">

              <div className="flex justify-evenly w-20">
                <span onClick={() => handleRandom(0)} className="w-6 h-6 mt-2 cursor-pointer text-gray-600"><Undo /></span>
                <Dice onClick={() => handleRandom(1)} className="w-8 h-8 cursor-pointer mt-2" />
              </div>

              <div><span className="hidden tny:inline" onClick={() => setShowBig(!showBig)} ><Player3Icon/>{props.filterPlayers === 0 ? "Any" : props.filterPlayers}</span></div>
              <div><span className="hidden xs:inline" onClick={() => setShowBig(!showBig)} ><ClockIcon />{props.filterMinTime === 0 ? "0" : props.filterMinTime}-{props.filterMaxTime === 0 ? "∞" : props.filterMaxTime} <span className="hidden ms:inline">min</span></span></div>
            </div></div>
        </div>
      </span>

      <span className={!showBig ? "hidden" : " unselectable"}>
        <div onClick={() => setShowBig(!showBig)} className="fixed bottom-0 left-0 mb-64 ml-2 z-30 cursor-pointer text-gray-600"><FilterMenuIcon1 /></div>
        <div onClick={() => setShowBig(!showBig)} className="fixed bottom-0 right-0 mb-64 mr-2 z-30 cursor-pointer text-gray-600"><FilterMenuIcon2 /></div>

        <div onClick={() => setShowBig(!showBig)} className="fixed bottom-0 left-0 mb-3 ml-2 z-30 cursor-pointer text-gray-600 flippedButton"><FilterMenuIcon1 /></div>
        <div onClick={() => setShowBig(!showBig)} className="fixed bottom-0 right-0 mb-3 mr-2 z-30 cursor-pointer text-gray-600 flippedButton"><FilterMenuIcon2 /></div>
        <div id="filterBar" className="fixed bottom-0 z-20 bg-blue-100 h-72 w-screen pt-2 border-t-2 border-blue-200">

          <div className="flex flex-col items-center">
            <div className="flex justify-evenly w-10/12 mt-2 mb-2">
              <span onClick={() => handleRandom(0)} className="w-6 h-6 inline cursor-pointer"><Undo /></span>
              <Die1 onClick={() => handleRandom(1)} className="w-6 h-6 inline cursor-pointer" />
              <Die2 onClick={() => handleRandom(2)} className="w-6 h-6 inline cursor-pointer" />
              {/* <Die3 className="w-6 h-6 hidden tny:inline cursor-pointer" /> */}
              <Die4 onClick={() => handleRandom(4)} className="w-6 h-6 hidden xs:inline cursor-pointer" />
              {/* <Die5 className="w-6 h-6 hidden xs:inline cursor-pointer" /> */}
              <Die6 onClick={() => handleRandom(6)} className="w-6 h-6 hidden xs:inline cursor-pointer" />
              {/* <Die6 className="w-8 h-8 hidden ms:inline cursor-pointer" /> */}
            </div>



            <div className="w-screen xs:w-11/12">
              <div className="font-semibold ml-10">Number of players:</div>
              <span className="hidden xs:inline" onClick={() => { setPlayerRange("0") }}><Player1Icon /></span>
              <div className="w-10/12 inline-block">
                <div className="range-div inline">
                  <input onChange={e => setPlayerRange(e.target.value)} type="range" className="range ml-5 xs:ml-0 my-3" min="0" max="8" step="1" value={playerRange} />
                  <span className="range-thumb">{playerRange === "0" ? "Any" : playerRange}{playerRange === "8" ? "+" : ""}</span>
                </div>
              </div>
              <span className="hidden sm:inline" onClick={() => { setPlayerRange("0") }}><Player3Icon /></span>
            </div>

            <div className="w-screen xs:w-11/12">
              <div className="font-semibold ml-10">Min playtime:</div>
              <span className="hidden xs:inline" onClick={() => { setMinTimeRange("0") }}><ClockIcon /></span>
              <div className="w-10/12 inline-block">
                <div className="range-div inline">
                  <input onChange={e => setMinTimeRange(e.target.value)} type="range" className="range ml-5 xs:ml-0 my-3" min="0" max="180" step="10" value={minTimeRange} />
                  <span className="range-thumb">{minTimeRange === "0" ? "0" : minTimeRange + " min"}{minTimeRange === "180" ? "+" : ""}</span>
                </div>
              </div>
              <span className="hidden sm:inline" onClick={() => { setMinTimeRange("0") }}><RightIcon /></span>
            </div>

            <div className="w-screen xs:w-11/12">
              <div className="font-semibold ml-10">Max playtime:</div>
              <span className="hidden xs:inline" onClick={() => { setMaxTimeRange("190") }}><LeftIcon /></span>
              <div className="w-10/12 inline-block">
                <div className="range-div inline">
                  <input onChange={e => setMaxTimeRange(e.target.value)}
                    type="range" className="range ml-5 xs:ml-0 my-3" min="10" max="190" step="10" value={maxTimeRange} />
                  <span className="range-thumb">{maxTimeRange === "190" ? "∞" : maxTimeRange + " min"}</span>
                </div>
              </div>
              <span className="hidden sm:inline" onClick={() => { setMaxTimeRange("190") }}><ClockIcon /></span>
            </div>
          </div>

        </div></span>
    </span>
  );
}

export default Filterbar;