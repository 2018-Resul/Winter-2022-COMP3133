var fs = require('fs'); 
const csv = require('csv-parser');



fs.unlink('canada.txt', (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log("File Deleted...")
})

fs.unlink('usa.txt', (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log("File Deleted...")
})



function getFilteredData(y, callback){ 
    const result = [];                 
    fs.createReadStream('input_countries.csv')
      .pipe(csv())
      .on('data', (row) => {
        const headers = Object.keys(row);
        if(row[headers[0]] === y )
            result.push(row);
     })
      .on('end', () => {
          console.log('CSV file successfully processed');
          callback(result)
       });
}

getFilteredData("Canada", getCanada);

function getCanada(result){
    fs.writeFileSync('canada.txt', JSON.stringify(result) );
}


getFilteredData("United States", getUSA);
function getUSA(result){
    fs.writeFileSync('usa.txt', JSON.stringify(result) );
}