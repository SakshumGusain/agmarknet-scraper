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

const deleteTable = () => {
  const sql = `DROP TABLE CommodityTable`;

  db.run(sql, (err) => {
    logger.error(err);
  });
};

deleteTable();
