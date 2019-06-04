const fs = require('fs');
const cheerio = require('cheerio')

const html = fs.readFileSync('in/go.html', 'utf8');
const $ = cheerio.load(html)

let csv = "";
let tournoi = "";
let caption = "";
let ville = "";
let date = "";
let handicap = "";
let levelav = "";
let levelap = "";

$('table').each(function(i, table) {

  /*
  <caption>(Rennes,
  19-01-2019)
  &nbsp;&nbsp;niveau d'inscription :  7K (avant : -617, apr&egrave;s : -602)</caption>
  */

  caption = $(table).find('caption').text();
  cap = caption.match(/^\((.*)\,\n(.*)\)\n.*:(.*)\(.*:(.*),.*:(.*)\)$/);
  if (cap) {
    ville = cap[1];
    date = cap[2];
    handicap = cap[3].trim();
    levelav = cap[4].trim();
    levelap = cap[5].trim();
    tournoi = date + ";" + ville + ";" + handicap + ";" + levelav + ";" + levelap + ";";
  }

  $(table).find('tr').each(function(j, tr) {
    csv_ligne = "";

    $(tr).find('td').each(function(k, td) {
      csv_ligne += $(td).text() + ";";
    });
    if (csv_ligne) {
      csv += tournoi + csv_ligne.slice(0, -1) + "\n";
    }
  });
});

console.log(csv);
// console.log(i + ("tournois"));

fs.writeFileSync('out/go.csv', csv)