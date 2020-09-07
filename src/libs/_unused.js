
//manual expansion removal
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
 let script = [
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
  ]; 


   function removeExpansions(collection, script) {
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