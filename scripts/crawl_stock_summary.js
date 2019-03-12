const Crawler = require('crawler')
const csv = require('fast-csv')
const fs = require('fs')
const jsStringEscape = require('js-string-escape')

let outCSVStream = csv.createWriteStream({headers:true})
let outStream = fs.createWriteStream('stock_summary.csv')
outStream.on("finish", function(){
  console.log("DONE!");
});

outCSVStream.pipe(outStream);

count = 0
let crawler = new Crawler({
  maxConnections: 50,
  callback: function (error, res, done) {
    if (error) {
      console.log(error)
    } else {
      let $ = res.$
      let stock = {symbol:res.options.symbol, company: res.options.company}
      $('#stock_header_ratio_table th').each((i, v) => stock[$(v).text().split(/\r?\n/)[0].slice(0, -1)] = $(v).text().split(/\r?\n/)[1])
      stock.indestry = $('th:contains("Industry:")').next().find("a").first().text()
      stock.location = $('th:contains("Headquarter Location")').next().text()
      stock.description = jsStringEscape($('h3:contains("Business Description")').parent().children().remove().end().text())
      outCSVStream.write(stock)
      console.log(`${++count}: `, stock)
    }
    done()
  }
})

crawler.on('drain', ()=>{
  outCSVStream.end()
})

stocks = []

csv.fromPath('symbols.csv')
  .on("data", function (data) {
    crawler.queue(
      {
        symbol: data[0],
        company: data[1],
        uri: `https://www.gurufocus.com/stock/${data[0]}`
      })
  })


