import { configDotenv } from "dotenv";
import  processMLSData  from './utils/processMLSData.js';
import  mockData1 from './data/mockData1.js';
import  mockData2 from './data/mockData2.js';

configDotenv();

export const index = async () => {
  try {
    await processMLSData(mockData1);
    await processMLSData(mockData2);
  } catch (error) {
    console.error('Error processing data:', error.message);
  }
}

index();