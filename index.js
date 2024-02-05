
const cheerio = require("cheerio");
const axios = require("axios");

async function performScraping() {
  const result = await axios.request({
    method: "GET",
    url: "https://agmarknet.gov.in/OtherPages/CommodityList.aspx",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    },
  });

  const $ = cheerio.load(result.data);
  let commodities = [];
  let classesArray = [];

  
  $("#cphBody_GridView1 tr").each((index, element) => {
    const rowColumns = $(element).find("td"); 

    const className = $(rowColumns.eq(0)).text().trim();
    
    if (className) {
      
      let classObject = className
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

  console.log(commodities)

  const fs = require("fs");

  const jsonData = JSON.stringify(commodities, null, 2); // The second argument is for pretty formatting

  fs.writeFile("commodities.json", jsonData, (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file has been saved!");
    }
  });
}

performScraping();
