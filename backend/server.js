const express = require('express');
const {getCurrentLeaderboard, getUserRankById, getOldLeaderboard} = require('./database');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const str = `<h4>API for this week's leaderboard :  <em>https://leaderboard-1gbs.onrender.com/leaderboard</em></h4> 
<h4>API for previous week's leaderboard by country :  <em>https://leaderboard-1gbs.onrender.com/leaderboard?country={country's 2 letter ISO code}</em>
<ul><li style="color:MediumSeaGreen"><p style="color:black">example : </p><em>https://leaderboard-1gbs.onrender.com/leaderboard?country=IN</em>
</li><li>Country codes in database : IN,US,GB,CA,AU,DE,FR,IT,JP,CN,BR</li></ul></h4> 
<h4>API for User's rank :  <em>https://leaderboard-1gbs.onrender.com/leaderboard/rank?id={User_Id}</em><ul><li style="color:DodgerBlue;"}>
<p style="color:black">example : </p><em>https://leaderboard-1gbs.onrender.com/leaderboard/rank?id=00148f01-15ae-4fdf-92b0-0cf02c79901c</em></li></ul></h4>`;

app.get('/', (req,res) => {
    res.send(str);
});


app.get('/leaderboard', (req,res) => {
    let {country} = req.query;
    const displayCurr = (result) => {
        let str = `<ol>`;
                result.map((user) => {
                    str += `<li>Name : ${user.Name} | UID : ${user.UID} | Score : ${user.Score}</li>`;
                })
                str += `</ol>`;
                res.send(str);
    }

    const displayPrev = (result) => {
        let str = `<ol>`;
                result.map((user) => {
                    str += `<li>Name : ${user.Name} | UID : ${user.UID} | Score : ${user.Score}</li> | Country : ${user.Country}`;
                })
                str += `</ol>`;
                res.send(str);
    }

    if(!country) {
        getCurrentLeaderboard().then((result) => {
            if(result) {
                // console.log(result);
                displayCurr(result);
            } else {
                res.status(400).json('no users found');
            }
        }).catch(err => res.status(400).json('error getting leaderboard'));
    } else {
        getOldLeaderboard(country).then((result) => {
            if(result) {
                // console.log(result);
                displayPrev(result);
            } else {
                res.status(400).json('no users found');
            }
        }).catch(err => console.log(err));
    }
});


app.get('/leaderboard/rank', (req,res) => {
    let {id} = req.query;
    getUserRankById(id).then((result) => {
        if(result) {
            console.log('Rank: ',result[0]['COUNT(*)']);
            res.send(`Rank : ${result[0]['COUNT(*)']} | UID : ${id}`);
        } else {
            res.status(400).json('no such user found');
        }
    }).catch(err => res.status(400).json('error occured'));
});




app.listen(3001, () => {
    console.log('app running on port 3001');
});