const xlsx = require('xlsx');
const path = require('path');

const getXLSdata = async (location, kinderName) => {
    const excel = xlsx.readFile(path.resolve(__dirname, '../../database/Kindergartens/', `${location}.xls`));
    //const sheet = excel.SheetNames.find(name => name === location);
    const jsonSheet = xlsx.utils.sheet_to_json(excel.Sheets[excel.SheetNames[0]]);
    const kinderIndex = (Object.values(jsonSheet).findIndex(el => el['어린이집명'] == kinderName));
    return jsonSheet[kinderIndex];
};

//console.log(getXLSdata('서울특별시', '국방부청사어린이집'));
module.exports = getXLSdata;