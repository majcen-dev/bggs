const parseXML = (rawXML) => {
    const oParser = new DOMParser();
    const oDOM = oParser.parseFromString(rawXML, "application/xml");

    let collection = [];

    if (oDOM.firstChild.nodeName.startsWith('error')) {
        return false;
    }


    for (let i = 0; i <= oDOM.getElementsByTagName('item').length - 1; i++) {
        let item = oDOM.getElementsByTagName('item')[i];
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
            obj.thumbnail = "https://error.com/";
        }
        try { obj.lastmodified = item.querySelector('status').getAttribute('lastmodified') } catch (error) { obj.lastmodified = "_null"; }

        if (obj.ownerRating === "N/A")
            obj.ownerRating = 0;

        collection.push(obj);
    }
    return collection;
}

const pullDataBGG = async (username) => {
    if (!username) return "ERROR: No username!";

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

async function getBGGDataFromFetch(username) {
    let retrievedData = await pullDataBGG(username);
    if (typeof retrievedData === "string")
        return retrievedData;

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

        //different time filtering logic - changes TBD
        /* if (inputMinTime > 0) {
            const gameMinTime = Number.parseInt(each['minplaytime'], 10) || 0;
            let condition = inputMinTime <= gameMinTime;

            if (condition === false) continue;
        }

        if (inputMaxTime > 0) {
            const gameMaxTime = Number.parseInt(each['maxplaytime'], 10) || 1000;
            let condition = inputMaxTime >= gameMaxTime;

            if (condition === false) continue;
        } */

        if (inputMinTime > 0 || inputMaxTime > 0) {
            const gameMinTime = Number.parseInt(each['minplaytime'], 10) || 0;
            const gameMaxTime = Number.parseInt(each['maxplaytime'], 10) || 1000;
            if (inputMaxTime === 0) inputMaxTime = 1000;

            const minValueInter = (gameMinTime - inputMinTime) * (gameMinTime - inputMaxTime) <= 0;
            const maxValueInter = (gameMaxTime - inputMinTime) * (gameMaxTime - inputMaxTime) <= 0;

            let intersection = false;

            if (minValueInter) { intersection = true; }
            else if (maxValueInter) { intersection = true; }
            else if (gameMinTime < inputMinTime && gameMaxTime > inputMaxTime) { intersection = true; }

            if (intersection === false) continue;
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