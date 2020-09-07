const parseXML = (rawXML) => {
    const oParser = new DOMParser();
    const oDOM = oParser.parseFromString(rawXML, "application/xml");

    let collection = [];

    if (oDOM.firstChild.nodeName.startsWith('error')) {
        return false;
    }


    for (let i = 0; i <= oDOM.getElementsByTagName('item').length - 1; i++) {
        let item = oDOM.getElementsByTagName('item')[i];
        // try {} catch (error) {} 
        // let obj = {
        //     objectid: item.getAttribute('objectid') || "0",
        //     name: item.querySelector('name').textContent || "_null",
        //     minplayers: item.querySelector('stats').getAttribute('minplayers') || "0",
        //     maxplayers: item.querySelector('stats').getAttribute('maxplayers') || "0",
        //     minplaytime: item.querySelector('stats').getAttribute('minplaytime') || "0",
        //     maxplaytime: item.querySelector('stats').getAttribute('maxplaytime') || "0",
        //     playingtime: item.querySelector('stats').getAttribute('playingtime') || "0",
        //     ownerRating: item.querySelector('stats rating').getAttribute('value') || "0.0",
        //     average: item.querySelector('stats rating average').getAttribute('value') || "0.0",
        //     numplays: item.querySelector('numplays').textContent || "0",
        //     thumbnail: ((item.querySelector('thumbnail') || {}).textContent) || "_null",
        //     image: ((item.querySelector('image') || {}).textContent) || "_null",
        //     lastmodified: item.querySelector('status').getAttribute('lastmodified') || "_null"
        // }
        let obj = {};
        try { obj.objectid = item.getAttribute('objectid') } catch (error) { obj.objectid = "0"; }
        try { obj.name = item.querySelector('name').textContent } catch (error) { obj.name = "_null"; }
        try { obj.minplayers = item.querySelector('stats').getAttribute('minplayers') } catch (error) { obj.minplayers = "0"; }
        try { obj.maxplayers = item.querySelector('stats').getAttribute('maxplayers') } catch (error) { obj.maxplayers = "0"; }
        try { obj.minplaytime = item.querySelector('stats').getAttribute('minplaytime') } catch (error) { obj.minplaytime = "0"; }
        try { obj.maxplaytime = item.querySelector('stats').getAttribute('maxplaytime') } catch (error) { obj.maxplaytime = "0"; }
        try { obj.playingtime = item.querySelector('stats').getAttribute('playingtime') } catch (error) { obj.playingtime = "0"; }
        try { obj.ownerRating = item.querySelector('stats rating').getAttribute('value') } catch (error) { obj.ownerRating = "0"; }
        try { obj.average = item.querySelector('stats rating average').getAttribute('value') } catch (error) { obj.average = "0"; }
        try { obj.numplays = item.querySelector('numplays').textContent } catch (error) { obj.numplays = "0"; }
        try { obj.thumbnail = item.querySelector('thumbnail').textContent } catch (error) {
            obj.thumbnail = "http://error.com/";
        }
        // try { obj.image = item.querySelector('image').textContent } catch (error) { obj.image = "_null"; }
        try { obj.lastmodified = item.querySelector('status').getAttribute('lastmodified') } catch (error) { obj.lastmodified = "_null"; }
        //
        if (obj.ownerRating === "N/A")
            obj.ownerRating = 0;

        collection.push(obj);
    }
    return collection;
}

const pullDataBGG = async (username) => {
    if (!username) return "ERROR: No username!";

    // const CORS_XML_PROXY = `https://majcen-cors-api-proxy.herokuapp.com/proxy/xml/`;
    // const BGG_API_URL = `https://www.boardgamegeek.com/xmlapi/collection/`;
    // let BGG_USER_API_URL = CORS_XML_PROXY + BGG_API_URL + username;

    // const BGG_USER_API_URL = `http://192.168.64.111:3040/api/getCollection/`
    //     + `https://www.boardgamegeek.com/xmlapi2/collection?username=${username}&excludesubtype=boardgameexpansion&stats=1`;
    const BGG_USER_API_URL = `/api/getCollection/`
        + `https://www.boardgamegeek.com/xmlapi2/collection?username=${username}&excludesubtype=boardgameexpansion&stats=1`;

    let fetched = await fetch(BGG_USER_API_URL);
    let rawTextData = await fetched.text();


    if (rawTextData.length < 200 && rawTextData.includes('<error')) {
        return "ERROR: Invalid username.";
    }

    if (rawTextData.length < 200 && rawTextData.includes('<message>')) {
        return "INFO: BGG is processing your request. Please try again in a few seconds.";
    }

    const collectionObjects = parseXML(rawTextData);

    if (!collectionObjects)
        return false;

    let removedDupes = collectionObjects
        .map(each => each['objectid'])
        .map((each, i, arr) => arr.indexOf(each) === i && i)
        .filter(each => each || each === 0)
        .map(each => collectionObjects[each]);

    return removedDupes;
}
/* 
function removeExpansionsSlow(collection) {

    let collectionWithIndexes = collection.map((each, i) => {
        return { index: i, name: each.name };
    })

    let arrayOfExpansionGroups = [];
    collectionWithIndexes.forEach((each) => {
        const subGroups = collectionWithIndexes.filter(el => el['name'].startsWith(each['name']));
        arrayOfExpansionGroups.push(subGroups);
    });
    arrayOfExpansionGroups = arrayOfExpansionGroups.filter(each => each.length > 1);

    const arrayOfExpansionsWithDuplicates = arrayOfExpansionGroups.map(each => each.slice(1)).flat();
    let mySet = new Set();
    arrayOfExpansionsWithDuplicates.forEach(each => {
        mySet.add(each['index']);
    });
    const listOfExpansionIndexes = [...mySet];

    listOfExpansionIndexes.forEach(each => {
        collection[each] = false;
    });

    collection = collection.filter(each => each);

    return collection;
};
 */


/* let script = [
    {
      objectid: "179803",
      name: "Arcadia Quest: Inferno",
      tempName: "Arcadia Quest:"
    },
    {
      objectid: "13",
      name: "Naseljenci otoka Catan",
      tempName: "Catan:"
    },
    {
      objectid: "113294",
      name: "Escape: Der Fluch des Tempels",
      tempName: "Escape:"
    },
    {
      objectid: "112138",
      name: "Krosmaster: Arena",
      tempName: "Krosmaster"
    },
    {
      objectid: "30549",
      name: "Pandemie",
      tempName: "Pandemic"
    },
    {
      objectid: "252328",
      name: "Star Wars: X-Wing (Second Edition)",
      tempName: "Star Wars: X-Wing"
    },
  ]; */


/* function removeExpansions(collection, script) {
    let collectionCopy = collection.map((each) => ({ ...each }));



    //pre Script
    if (script && script.length > 0) {
        for (let i = 0; i < collectionCopy.length; i++) {
            for (let j = 0; j < script.length; j++) {
                if (collectionCopy[i]['objectid'] === script[j]['objectid']) {
                    collectionCopy[i]['name'] = script[j]['tempName'];
                }
            }
        }
    }

    collectionCopy.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });


    let collectionOfBaseGames = [];
    for (let i = 0, temp = "_null_"; i < collectionCopy.length; i++) {
        let currentName = collectionCopy[i].name;
        if (currentName.startsWith(temp) && currentName !== temp)
            continue;

        collectionOfBaseGames.push(collectionCopy[i]);
        temp = currentName;
    }

    ////post Script
    if (script && script.length > 0) {
        for (let i = 0; i < collectionOfBaseGames.length; i++) {
            for (let j = 0; j < script.length; j++) {
                if (collectionOfBaseGames[i]['objectid'] === script[j]['objectid']) {
                    collectionOfBaseGames[i]['name'] = script[j]['name'];
                }
            }
        }
    }

    collectionOfBaseGames.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });

    return collectionOfBaseGames;
} */

async function getBGGDataFromFetch(username) {
    let retrievedData = await pullDataBGG(username);
    if (typeof retrievedData === "string")
        return retrievedData;
    /* if (script)
        retrievedData = removeExpansions(retrievedData, script); */

    retrievedData.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });

    return retrievedData;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getArrayOfCovers(collection, stringsOnly = false) {
    // const API_URL = "http://192.168.64.111:3040/api/get-image-ids/";
    const API_URL = "/api/get-image-ids/";
    let arrayOfThumbs = collection.map(each => each['thumbnail']);
    const fetchRequest = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arrayOfThumbs)
    });
    const arrayOfCovers = await fetchRequest.json();

    if (stringsOnly)
        return arrayOfCovers;

    let collectionCopy = [...collection];
    for (let i = 0; i < collectionCopy.length; i++) {
        Object.defineProperty(collectionCopy[i], 'cover', {
            value: arrayOfCovers[i],
            writable: true,
            enumerable: true,
            configurable: true
        });
    }
    return collectionCopy;
}

async function getArrayOfCoversRatio(collection, stringsOnly = false) {
    // const API_URL = "http://192.168.64.111:3040/api/get-image-ids-ratio/";
    const API_URL = "/api/get-image-ids-ratio/";
    let arrayOfThumbs = collection.map(each => each['thumbnail']);
    const fetchRequest = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arrayOfThumbs)
    });
    const arrayOfCovers = await fetchRequest.json();

    if (stringsOnly)
        return arrayOfCovers;

    let collectionCopy = [...collection];
    for (let i = 0; i < collectionCopy.length; i++) {
        collectionCopy[i].cover = arrayOfCovers[i].imgUrl;
        collectionCopy[i].img_x = arrayOfCovers[i].img_x;
        collectionCopy[i].img_y = arrayOfCovers[i].img_y;
    }
    return collectionCopy;
}

function filterMethod(myCollection, searchSting, playerNumber, inputMinTime, inputMaxTime, random) {
    let workCol = [];

    for (let i = 0; i < myCollection.length; i++) {
        const each = myCollection[i];

        if (playerNumber > 0) {
            const minPlayerNum = Number.parseInt(each['minplayers'], 10) || 0;
            const maxPlayerNum = Number.parseInt(each['maxplayers'], 10) || 1000;
            let condition = playerNumber <= maxPlayerNum;
            if (playerNumber < 8)
                condition = playerNumber >= minPlayerNum && playerNumber <= maxPlayerNum;

            if (condition === false) continue;
        }

        if (inputMinTime > 0) {
            const numTime = Number.parseInt(each['minplaytime'], 10) || 0;
            let condition = inputMinTime <= numTime;

            if (condition === false) continue;
        }

        if (inputMaxTime > 0) {
            const numTime = Number.parseInt(each['maxplaytime'], 10) || 1000;
            let condition = inputMaxTime >= numTime;

            if (condition === false) continue;
        }

        if (searchSting.length > 0) {
            const searchStrings = searchSting.split(' ');

            let found = true;
            searchStrings.forEach(fEach => {
                const regex = new RegExp(fEach, "gi");
                if (!each['name'].match(regex))
                    found = false;
            });
            if (found === false) continue;
        }
        workCol.push(each);
    }


    if (random > 0) {
        for (let i = workCol.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [workCol[i], workCol[j]] = [workCol[j], workCol[i]];
        }
        workCol = workCol.slice(0, random);
    }

    return workCol;
}

function sortDisplayed(myCollection, sort) {
    let copy = [...myCollection];

    if (sort === "") {
        copy.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
    } else if (sort === "avgAsc") {
        copy.sort((a, b) => {
            if (a.average < b.average) return -1;
            if (a.average > b.average) return 1;
            return 0;
        });
    } else if (sort === "avgDsc") {
        copy.sort((a, b) => {
            if (a.average > b.average) return -1;
            if (a.average < b.average) return 1;
            return 0;
        });

    } else if (sort === "myAsc") {
        copy.sort((a, b) => {
            if (a.ownerRating < b.ownerRating) return -1;
            if (a.ownerRating > b.ownerRating) return 1;
            return 0;
        });
    } else if (sort === "myDsc") {
        copy.sort((a, b) => {
            if (a.ownerRating > b.ownerRating) return -1;
            if (a.ownerRating < b.ownerRating) return 1;
            return 0;
        });
    }
    return copy;
}


export { parseXML, getBGGDataFromFetch, sleep, getArrayOfCovers, getArrayOfCoversRatio, filterMethod, sortDisplayed };