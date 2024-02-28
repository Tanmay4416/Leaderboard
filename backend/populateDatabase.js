const {createUser} = require('./database');
const { v4: uuidv4 } = require('uuid');

const datasize = 10000;
const country = [
    "US",
    "GB",
    "CA",
    "AU",
    "DE",
    "FR",
    "IT",
    "JP",
    "CN",
    "BR",
    "IN"
];

const generateNames = () => {
    const result = 'User ' + Math.random().toString(36).substring(2);
    return result;
}


function generateTimestamp() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    // const day = String(currentDate.getDate() - 14 + Math.ceil(Math.random()*7)).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

console.log(generateTimestamp());


// console.log(Date());

for (let idx = 0; idx < datasize ; idx++) {
    createUser(uuidv4(), generateNames(), Math.ceil(Math.random()*10000), country[Math.ceil(Math.random()*10)], generateTimestamp());
}




