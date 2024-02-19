<a name="readme-top"></a>


# agmarket-scraper
- Scrapes the commodities data from https://agmarknet.gov.in/OtherPages/CommodityList.aspx
- Fetches data of each commodity from https://data.gov.in
- Runs data fecthing daily at 8:30 AM using Github actions
- Data is getting stored in SQLite database 



<!-- ABOUT THE PROJECT -->
## About The Project

This is the project where data of each commodities from each states and districts are being fetched from an API and being stored in a database for future references and various usage.  

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

These are the steps that one can follow on setting the project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Firstly install the latest package of npm
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Follow these steps to make the project work._

1. Get an API Key from [here](https://data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi) by registering to get the full access of API
2. Clone the repo
   ```sh
   git clone https://github.com/ChakshuGautam/agmarknet-scraper.git
   ```
3. Install NPM package
   ```sh
   npm install
   ```
4. Create a `.env` file and store your API key in that file
   ```js
   COMMODITIES_API_KEY = 'ENTER YOUR API'
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

_For using the data that is being stored in database can be fetched by following these steps._

 - On your terminal just run the file getData
    ```sh
   node getData.js
   ```
   What it does is that it ask you to provide a date and runs a sql command and fetches all the data from database a creates and .csv file 

_For storing and creating a table in API.db database._

 - Run following command on terminal
   ```sh
   node commoditiesAPI.js
   ```
   It fetches data from API and creates a table in database if not present and stores all the data on that table


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Clone the repository
2. Create your Feature Branch (`git checkout -b feature/your-feature-name`)
3. Commit your Changes (`git commit -m 'your-commit-message'`)
4. Push to the Branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


