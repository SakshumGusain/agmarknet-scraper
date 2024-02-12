import cheerio from "cheerio";
import axios from "axios";
import winston from "winston";
import fs from 'fs'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

async function performScraping() {
  let retry = 0;
  let maxRetry = 5;

  while (retry < maxRetry) {
    try {
      const result = await axios.request({
        method: "GET",
        url: "https://agmarknet.gov.in/OtherPages/CommodityList.aspx",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        },
      });

      return result;
    } catch (err) {
      logger.error(`Attempt ${retry + 1} failed: ${err.message}`);
      retry++;
    }

    throw new Error("Failed to perform scraping after multiple attempts");
  }
}

performScraping()
  .then((result) => {
    const $ = cheerio.load(result.data);
    let commodities = [];
    let classesArray = [];

    $("#cphBody_GridView1 tr").each((index, element) => {
      const rowColumns = $(element).find("td");

      const className = $(rowColumns.eq(0)).text().trim();

      if (className) {
        let classObject = className;
        classesArray.push(classObject);
      }
    });

    $("#cphBody_GridView1 tr").each((index, element) => {
      const rowColumns = $(element).find("td");

      const className = $(rowColumns.eq(0)).text().trim();

      if (classesArray.includes(className)) {
        return;
      }

      for (let i = 1; i < rowColumns.length; i++) {
        const name = $(rowColumns.eq(i)).text().trim();
        if (name) {
          commodities.push(name);
        }
      }
    });

    logger.info(commodities);

    const jsonData = JSON.stringify(commodities, null, 2); // The second argument is for pretty formatting

    fs.writeFile("commodities.json", jsonData, (err) => {
      if (err) {
        logger.error("Error writing JSON file:", err);
      } else {
        logger.info("JSON file has been saved!");
      }
    });
  })
  .catch((err) => {
    logger.error(err);
  });
