const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();




app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, 'build')));
app.post('/api/get-image-ids-ratio/', bodyParser.json(), async (req, res, next) => {

    console.log("Requesting data for: " + req.body.length + " images.");
    try {
        const arrayOfThumbs = req.body;

        const arrLinks = arrayOfThumbs.map(each => {
            const splitArr = each.split('/');
            const lastDigits = splitArr[splitArr.length - 1].replace(/([^0-9]+)/g, "");
            const geekdoLink = "https://api.geekdo.com/api/images/" + lastDigits;
            return geekdoLink;
        });

        let arrImgs = [];

        for (let i = 0; i < arrLinks.length; i++) {
            const each = arrLinks[i];
            //process.stdout.write(`${i}/${arrLinks.length}\r`); /* remove for performace */
            let axiosData;
            try {
                axiosData = await axios.get(arrLinks[i]);
            } catch (error) {
                axiosData = {imgUrl: "https://error.com/", img_x: 1, img_y: 1}
            }
            
            let imgUrl, img_x, img_y;
            try {
                imgUrl = axiosData.data['images']['medium']['url'];
            } catch (error) {
                imgUrl = "https://error.com/";
            }

            try {
                img_x = axiosData.data['dimensions']['width'];
                img_y = axiosData.data['dimensions']['height'];
            } catch (error) {
                img_x = 1;
                img_y = 1;
            }
            arrImgs.push({
                imgUrl: imgUrl,
                img_x: img_x,
                img_y: img_y
            });
        }
        // console.log('First 2:');
        // console.log(arrImgs[0], arrImgs[1]);
        // console.log('Last 2:');
        // console.log(arrImgs[arrImgs.length - 2], arrImgs[arrImgs.length - 1]);
        console.log('Retrieved: ' + arrImgs.length);
        res.json(arrImgs);

    } catch (error) {
        next(error);
    }
});

app.get('/api/getCollection/*', async (req, res, next) => {
    try {
        const TARGET_URL = req.originalUrl.replace(`/api/getCollection/`, "");
        if (TARGET_URL.length < 4) next(new Error('Url too short!'));

        const axiosData = await axios(TARGET_URL);
        res.set('Content-Type', 'text/xml');
        res.send(axiosData.data);

    } catch (error) {
        next(error);
    }
});

app.get('*', (req, res) => {
    res.send(`<a href="javascript:window.location=window.location.origin">Are you lost?</a>`);
});

app.use((err, req, res, next) => {
    res.status(400).send({
        error: err.message
    });
    console.error(err);
});

const PORT = process.env.PORT || 3040;

app.listen(PORT, () => {
    console.log(`Port: ${PORT}/`);
});