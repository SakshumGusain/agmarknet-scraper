import dotenv from 'dotenv'
dotenv.config()
const apiKey= process.env.COMMODITIES_API_KEY   
const apiUrl= "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"

export {apiKey, apiUrl}