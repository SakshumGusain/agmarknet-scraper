// const dotenv = require('dotenv');
// dotenv.config();

// require('dotenv').config({path: './.env'})
// console.log(process.env)

// const dotenv = require("dotenv");

// import { sqlite3 } from "sqlite3";

const sqlite3 = require("sqlite3").verbose
const db = new sqlite3.Database('./API.db')


const apiKey = '579b464db66ec23bdd000001d8da8c7a0a6e414b62369865cb09a51c'//process.env.COMMODITIES_API_KEY;
const apiUrl = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';


const queryParams = new URLSearchParams({
  'api-key': apiKey,
  'format': 'json',
  'limit': 10000
});

const urlWithParams = `${apiUrl}?${queryParams}`;

const recordData = document.getElementById('main-div')

fetch(urlWithParams, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
  },
})
  .then(response => response.json())
  .then(data => {

      console.log(data)

      storeCSV(data)

      recordData.innerHTML = data.records.slice(0, 10).map(record => 
        `<tr>
          <td>${record.arrival_date}</td>
          <td>${record.commodity}</td>
          <td>${record.district}</td>
          <td>${record.grade}</td>
          <td>${record.market}</td>
          <td>${record.max_price}</td>
          <td>${record.min_price}</td>
          <td>${record.modal_price}</td>
          <td>${record.state}</td>
          <td>${record.variety}</td>
        </tr>`      
      ).join("")

      // createTable(data)
      // insertRows(db, data)
  })
  .catch(error => console.error('Error:', error));


  // const createTable = (data) => {

  //   const headers = Object.keys(data.records[0]).toString();
  //   db.run("CREATE TABLE IF NOT EXISTS commodities(" + headers +  ")")
  //   db.close()

  // }

  // const insertRows = (db, data) => {

  //   const headers = Object.keys(data.records[0]).toString();
  //   db.serialize(function() {
      
  //     let sql = "INSERT INTO commodities (" + headers + ") VALUES ("
  //     data.records.map(record => {
  //       let values = Object.values(record).join("','")
  //       let finalSql = sql + "'" + values + "');"
  //       db.run(finalSql)
  //     })

  //   })

  // }

  
  const storeCSV = (data) => {

    const headers = Object.keys(data.records[0]).toString();

    const main = data.records.map((record) => {

      return Object.values(record).toString();

    });

    const csv = [...main].join('\n');

    startCSVDownload(csv);
  } 

  
  const startCSVDownload = (input) => {

    const blob = new Blob([input], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);

    document.getElementById('btn').addEventListener('click', () => {

        const a = document.createElement('a');
        a.download = 'data.csv';
        a.href = url;
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);

    })
  }