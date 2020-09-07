# BGG Selctor

BGG Selector lets you view your [BGG](https://boardgamegeek.com/) boardgame collection and helps you choosing what to play next.  

Built with [ReactJS](https://reactjs.org/) and [Express](https://expressjs.com/).

## Feaures
* Import your BGG collection
* Fetch better thumbnails
* Filter your collection by number of players and playtime
* Open the BGG web page for selected boardgame
* **Select a random game to play next**


## Live version:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; https://bggs.herokuapp.com/

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <sub>*Hosted on Heroku. Please wait for up to 10s for the server to wake up.*</sup>
<br/><br/>

# How to use

Click "Get collection" to input your [BGG](https://boardgamegeek.com/) username and confirm with "Get Data".

The app will make a request to the BGG API:  
https://www.boardgamegeek.com/xmlapi2/collection?username=USERNAME&excludesubtype=boardgameexpansion&version=1   
The result will get parsed as JSON to your browsers localStorage and displayed as a gallery of all your boardgames **not** marked as expansions. Images provided by the BGG API aren't friendly for gallery views (the thumbnail is too small and the cover image is too large).

## Download better images to improve user exeperince

Click your name, gallery size or the get image and then "Get Large Thumbnails".

![alternativetext](https://imgur.com/1uQ4rVI.png)

![alternativetext](https://imgur.com/CCvd6hc.png)
  

The sever then has to manually search for a better version of each image and its dimensions, which may take a while.
Your localStorage database will get updates with better thumbnail URLs to be diplayed inside the app. Each image in the gallery will also fit more neatly inside the gallery.
While the initial load may be slower, the images will be cached by modern browsers, so you won't be redownloading them on each visit, but they are still not *permanently* saved. **Please note that the total downoad size of all larger images can be up to 10MB per 100 images, but is usally smaller.**

The fetch request is done in batches of 100 to avoid timeouts.

## Before and after getting large thumbnails
![alternativetext](https://imgur.com/ZYrLZCb.png)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![alternativetext](https://imgur.com/WWgytiI.png)

## Navigation
**Some options may be hidden depending on your viewport width.**

Click a thumbnail to open its BGG web page
  

## Top menu

![alternativetext](https://imgur.com/1uQ4rVI.png)  
Click any of these items to open a window that enables you to retrieve your BGG collection, remove it from localStorage or get larger thunbnails.    
![alternativetext](https://imgur.com/Uq0sQr7.png)  
  

## Small buttons

![alternativetext](https://imgur.com/EXjZzeR.png)  
* Sort by Average BGG rating - descending
* Sort by Name - ascending
* Sort randomly
* Open search window - typing inside automatically filters your collection
* Open INFO page
  

## Bottom menu
  
The menu icon on each side expands or colapses this menu.

## Collapsed

![alternativetext](https://imgur.com/NsG5TZW.png)  

The dice icon displays **1** random boardgame from your collection.  
You can click multiple times to get a different boardgame.  
The arrow resets this random filter.  
The other two icons display your currently set filters.

## Expanded

![alternativetext](https://imgur.com/di139P7.png)  

The dice icons display **1**, **2**, **4** or **6** random boardgames from your collection.  
You can click them multiple times to get different boardgames.  
The arrow resets this random filter.  
  
The sliders filter your collection based on number of players and game duration.  
A game will be displayed if the inteval between its max and min playtime falls between the two time sldiers.

![alternativetext](https://imgur.com/kFoyMam.png)  

Clicking an icon next to each slider will reset it to its default value.