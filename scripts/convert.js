const fs = require('fs')
const csv = require('fast-csv')
let outCSVStream = csv.createWriteStream({headers: true})
let outStream = fs.createWriteStream('stock_summary_converted.csv')
outStream.on("finish", function () {
  console.log("DONE!")
})
outCSVStream.pipe(outStream);

function parseNumber(str){
  if(str.endsWith('B'))
    return parseFloat(str)*1000000000.0
  if(str.endsWith('M'))
    return parseFloat(str)*1000000.0

  return parseFloat(str)
}
csv.fromPath('stock_summary.csv')
  .on("data", function (data) {
    let stock = {
      symbol:data[0],
      company: data[1],
      mc: parseNumber(data[2]),
      ev: parseNumber(data[3]),
      pe: parseNumber(data[4]),
      pb: parseNumber(data[5]),
      industry: data[6],
      location: data[7],
      description: data[8].replace(/[(\\n)\\]/g,'')
    }
    outCSVStream.write(stock)
    console.log(stock)
  })
