import React, { useState } from 'react';
import './ScrollToTopButton.css';


function ScrollToTopButton(props) {

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 200) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop);

  return (
    <>
      <div className={`scrollTop text-yellow-600 bg-black rounded-full pl-1 pr-5 p-6 mb-${props.myHeight}`} onClick={scrollTop} style={{ height: 40, display: showScroll ? 'flex' : 'none' }} >
        <svg viewBox="0 0 20 20" fill="currentColor" className="arrow-circle-up w-10 h-10"><path stroke="black" strokeWidth="1" fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"></path></svg> <span className="font-semibold text-white unselectable">Top</span>
      </div>
    </>
  );
}


export default ScrollToTopButton;