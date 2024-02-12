import sqlite3 from "sqlite3";
import {apiKey, apiUrl} from './config.js'
import stateData from "./masters/states-and-districts.json" assert { type: "json" };
import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});


// Creating a variable for accessing database
const db = new sqlite3.Database("./API.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) logger.info(err);
});


let delay = 0;
for(let i=0 ; i < stateData.states.length ; i++) {
    setTimeout(() => {
    for(let j=0 ; j < stateData.states[i].districts.length ; j++){
      setTimeout(() => {
            let newState = encodeURIComponent(stateData.states[i].state);
            let newDistrict = encodeURIComponent(stateData.states[i].districts[j]);

            const queryParams = new URLSearchParams({
              "api-key": apiKey,
              format: "json",
              limit: 10000
            });

            const urlWithParams = `${apiUrl}?${queryParams}&filters%5Bstate%5D=${newState}&filters%5Bdistrict%5D=${newDistrict}`;

            fetch(urlWithParams, {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
            })
              .then((response) => {
                if (!response.ok) {
                  logger.error(response);
                  throw new Error();
                }
                return response.json();
              })
              .then((data) => {


                if (
                  data.records.length != 0 &&
                  data.records !== null &&
                  data.records != undefined
                ) {
                  logger.info(data.records)
                  createTable(data)
                  insertRows(db, data);
                }
              })
              .catch((error) => logger.error("Error:", error));
      }, j*5000)
    }
  }, delay*10000)
  delay = (delay + stateData.states[i].districts.length)
}


// this function is to create "CommodityTable" table inside database if it not present
const createTable = (data) => {
  const headers = Object.keys(data.records[0]).join(",");
  const parts = headers.split(",");
  let primaryKey = parts.slice(0, 7).join(",").toString();

  db.run(
    `CREATE TABLE IF NOT EXISTS CommodityTable (${headers}, PRIMARY KEY (${primaryKey}) ON CONFLICT REPLACE)`
  );
};

// insertion of data in "CommodityTable" table
const insertRows = (db, data) => {
  const headers = Object.keys(data.records[0]).join(",");

  db.serialize(function () {
    let sql = `INSERT INTO CommodityTable (${headers}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    data.records.map((record) => {
      let values = Object.values(record);
      db.run(sql, values);
    });
  });
};
