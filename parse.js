const fs = require('fs');
const cheerio = require('cheerio')

const html = fs.readFileSync('in/go.html', 'utf8');
const $ = cheerio.load(html)

let csv = "";
let tournoi = "";

$('table').each(function(i, table) {
  tournoi = "Tournoi #" + (i + 1);
  csv += "\n" + tournoi;

  $(table).find('tr').each(function(j, tr) {
    csv += $(tr).find('h4').text();

    $(tr).find('td').each(function(k, td) {
      csv += $(td).text() + " ; ";
    });

    csv += "\n";
  });
});

console.log(csv);
// console.log(i + ("tournois"));

fs.writeFileSync('out/go.csv', csv)