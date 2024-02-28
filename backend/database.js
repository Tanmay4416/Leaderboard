let mysql = require('mysql2');

const dotenv = require('dotenv');
dotenv.config();

let pool = mysql.createPool({
    host            : process.env.MYSQL_HOST,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE,
    port            : 48804
}).promise();


const getAllData = async ()  => {
    const result = await pool.query('SELECT * FROM Users_info');
    return result[0];
};

const getCurrentLeaderboard = async ()  => {
    const sql_query = 'SELECT Name,UID,Score FROM Users_info WHERE Timestamp >= DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -1 WEEK) ORDER BY Score DESC LIMIT 200';
    const result = await pool.query(sql_query);
    return result[0];
};

const getOldLeaderboard = async (country)  => {
    const sql_query = 'SELECT Name,UID,Score,Country,TimeStamp FROM Users_info WHERE Timestamp BETWEEN DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -2 WEEK) AND DATE_ADD(CURRENT_TIMESTAMP, INTERVAL -1 WEEK) AND Country LIKE ? ORDER BY Score DESC LIMIT 200';
    const result = await pool.query(sql_query,[country]);
    return result[0];
};

const getUserRankById = async (id) => {
    const result = await pool.query('SELECT COUNT(*) FROM Users_info WHERE Score > (SELECT Score FROM Users_info WHERE UID LIKE ?);', [id]);
    return result[0];
};

const createUser = async (Uid,Name,Score,Country,Timestamp) => {
    const result = await pool.query('INSERT INTO Users_info(UID, Name, Score, Country, TimeStamp) VALUES(?,?,?,?,?)', [Uid,Name,Score,Country,Timestamp]);
    console.log('user created');
    return result[0];
};


// console.log(getUserRankById('24e63b94-be7e-4edb-8c1a-7053220db6d6'));
// getAllData().then((res) => console.log(res));
// createUser('3','anmay',0,'IN');

module.exports = {
    getAllData,
    getUserRankById,
    createUser,
    getCurrentLeaderboard,
    getOldLeaderboard
};
// console.log(getAllData());

