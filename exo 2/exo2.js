const fs = require('fs')
let csvToJson = require('convert-csv-to-json')
var ss = require('simple-statistics')

const fileName = process.argv[2]

function sanitise(x) {
    if (isNaN(x)) {
        return NaN;
    }
    return x;
}

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

function writeFile(path, data, options = {}) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, options, (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })
}

/**
 * Read a CSV file and convert it to json file
 */
const getFileDatas = async () => {

    if (fileName.includes('.csv') && readFile(`./${fileName}`)) {
        try {
            const data =  csvToJson.parseSubArray('*',',').getJsonFromCsv(`./${fileName}`);
            const fileNameWithoutCsv = fileName.split('.csv')
            csvToJson.generateJsonFileFromCsv(`./${fileName}`,`./${fileNameWithoutCsv[0]}.json`);
            console.log('Data : ', data);

            const sumSugar = ss.sum(data.slice(1).map(a => parseInt(a.sugars)))
            const avgRating = ss.average(data.slice(1).map(a => parseInt(a.rating)))
            const maxSodium = ss.max(data.slice(1).map(a => parseInt(a.sodium)))
            const minProtein = ss.min(data.slice(1).map(a => parseInt(a.protein)))

            const allStats = {
                SumSugars: sumSugar,
                AvgRating: avgRating,
                MaxSodium: maxSodium,
                MinProtein: minProtein
            }

            writeFile(`./${fileNameWithoutCsv[0]}-stats.txt`, JSON.stringify(allStats), {encoding: 'utf-8'})
        }
        catch (error) {
            console.error('Error : ', error);
        }
        finally {
            console.log('Finis');
        }
    } else {
        console.log('File is not a CSV or does not exist');
    }
}

getFileDatas()