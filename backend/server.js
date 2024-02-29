const express = require('express');
const {getCurrentLeaderboard, getUserRankById, getOldLeaderboard} = require('./database');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('https://leaderboard-1gbs.onrender.com/', (req,res) => {
    res.send("<h4>For this week's leaderboard : https://leaderboard-1gbs.onrender.com/leaderboard</h4>");
});


app.get('/leaderboard', (req,res) => {
    let {country} = req.query;
    // country = country.slice(1);

    if(!country) {
        getCurrentLeaderboard().then((result) => {
            if(result) {
                // console.log(result);
                res.json(result);
            } else {
                res.status(400).json('no users found');
            }
        }).catch(err => res.status(400).json('error getting leaderboard'));
    } else {
        getOldLeaderboard(country).then((result) => {
            if(result) {
                // console.log(result);
                res.json(result);
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
            res.json(result[0]);
        } else {
            res.status(400).json('no such user found');
        }
    }).catch(err => res.status(400).json('error occured'));
});




app.listen(3001, () => {
    console.log('app running on port 3001');
});