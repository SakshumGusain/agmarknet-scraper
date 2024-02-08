import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./API.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.log(err);
});

const deleteTable = () => {
  const sql = `DROP TABLE CommodityTable`;

  db.run(sql, (err) => {
    console.log(err);
  });
};

deleteTable();
