const fs = require('fs')
let csvToJson = require('convert-csv-to-json');

const fileName = process.argv[2]

/**
 * Read a specific file
 * @param {*} path 
 * @param {*} options 
 * @returns 
 */
function readFile(path, options = {}) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, options, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

/**
 * Read a CSV file and convert it to json file
 */
const getFileDatas = async () => {

    if (fileName.includes('.csv')) {
        try {
            const data =  csvToJson.parseSubArray('*',',').getJsonFromCsv(`./${fileName}`);
            const fileNameWithoutCsv = fileName.split('.csv')
            csvToJson.generateJsonFileFromCsv(`./${fileName}`,`./${fileNameWithoutCsv[0]}.json`);
            console.log('Data : ', data);
        }
        catch (error) {
            console.error('Error : ', error);
        }
        finally {
            console.log('Finis');
        }
    } else {
        console.log('File is not a CSV');
    }
}

getFileDatas()