import axios from 'axios';

const postToCRM = async (endpoint, data) => {
    if (process.env.MOCK_CRM_API === 'true') {
        console.log(`[MOCKED] Data sent to CRM endpoint: ${endpoint}`);
        console.log(JSON.stringify(data, null, 2));
        await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
        try {
            await axios.post(endpoint, data);
        } catch (error) {
            throw new Error(`Failed to send data to CRM: ${error.message}`);
        }
    }
}

export default postToCRM;