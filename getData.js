import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import fs from "fs";
import sqlite3 from "sqlite3";

import winston from "winston";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

const db = new sqlite3.Database("./API.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) logger.error(err);
  });

takeInput();

// function for getting data.csv file from the date the database is created i.e. 06/02/2024
const storeCSV = (data, date) => {
    let newDate = "";
    for (let i = 0; i < date.length; i++) {
      if (date[i] === "/") newDate = newDate + "-";
      else newDate = newDate + date[i];
    }
  
    const main = data.map((record) => {
      return Object.values(record).toString();
    });
  
    const csv = [...main].join("\n");
  
    const filePath = `./${newDate}-data.csv`;
  
    fs.writeFileSync(filePath, csv);
  };
  
  // function to take date input and then getting the all the data for that date from database and then making a .csv file of for that particular date
 
  async function takeInput() {
    const rl = readline.createInterface({ input, output });
  
    const date = await rl.question("Enter date(DD/MM/YYYY): ");
  
    rl.close();
  
    let dataArray = [];
  
    const sql = `SELECT * FROM CommodityTable WHERE arrival_date = ?`;
  
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all(sql, date, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
  
      dataArray = rows;
    } catch (err) {
      logger.error(err.message);
    } finally {
      db.close();
    }
  
    storeCSV(dataArray, date);
  
    db.close((err) => {
      if (err) {
        logger.error(err.message);
      }
      logger.info("Closed the database connection.");
    });
  }