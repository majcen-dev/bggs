import React, { useState, useEffect } from 'react';
import './DisplayGallery.css';

import Gallery from "react-photo-gallery";
import { XMasonry, XBlock } from "react-xmasonry";


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}



function DisplayGallery(props) {
  const [bigPhotos, setBigPhotos] = useState([]);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    let photos = [];

    let cond0 = props.collection[0] && props.collection[0].cover;
    if (cond0) {
      photos = props.collection.map(each => ({ src: each.cover, alt: each.name, width: each.img_x, height: each.img_y, key: each.objectid, urlid: each.objectid }));
    }

    setBigPhotos(photos);
  }, [props.collection]);

  function onClick(event, { photo, index }) {
    window.open("https://boardgamegeek.com/boardgame/" + event.target.attributes.urlid.value, "_blank");
  }

  function onClickOthr(event) {
    window.open("https://boardgamegeek.com/boardgame/" + event.target.attributes.urlid.value, "_blank");
  }

  if (props.debugTable)
    return (
      <table>
        <tbody>
          {props.collection.map(each => {
            return (
              <tr key={each.objectid}>
                <td><img className="photoCard" src={each.thumbnail} alt={each.name} onClick={onClickOthr} urlid={each.objectid} /></td>
                <td>
                  {each.objectid} / <b>{each.name}</b>
                  <br />Players: <b>{each.minplayers}-{each.maxplayers}</b> / Time: <b>{each.minplaytime}-{each.maxplaytime}min</b>
                  <br />Average: <b>{each.average}</b>
                </td>
                <td><img className="photoCard" width="150px" src={each.cover} alt={each.name} onClick={onClickOthr} urlid={each.objectid} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );


  if (props.collection[0] && !props.collection[0].cover)
    return (
      <XMasonry targetBlockWidth={120}>
        {props.collection.map((each, i) => {
          return (
            <XBlock key={i}>
              <img className="photoCard" src={each.thumbnail} alt={each.name} onClick={onClickOthr} urlid={each.objectid} key={each.objectid} />
            </XBlock>
          );
        })}
      </XMasonry>
    );



  if (navigator.appVersion.includes("Mac OS")) {
    return (
      <XMasonry targetBlockWidth={250}>
        {props.collection.map((each, i) => {
          return (
            <XBlock key={i}>
              <img className="photoCard" src={each.cover || each.thumbnail} alt={each.name} onClick={onClickOthr} urlid={each.objectid} />
            </XBlock>
          );
        })}
      </XMasonry>
    );
  }

  if (width * height < 800000) {
    return (
      <Gallery photos={bigPhotos} margin={1} targetRowHeight={160} onClick={onClick} />
    );
  } else if (width * height < 1000000) {
    return (
      <Gallery photos={bigPhotos} margin={1} targetRowHeight={200} onClick={onClick} />
    );
  } else {
    return (
      <Gallery photos={bigPhotos} margin={1} targetRowHeight={250} onClick={onClick} />
    );
  }
}

export default DisplayGallery;