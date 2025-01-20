import normalizeMLSData from './normalizer.js';
import postToCRM from './httpClient.js';
import { sources } from '../config/dataMapping.js';
import mlsSchema from '../validation/validationSchema.js';

const normalizeValidationSend = async (mockData) => {
    const server_url = process.env.CRM_API_BASE_URL;
    const customerId = 762910;

    const endpoint = `${server_url}/customer/${customerId}/properties`;

    try {
        const normalizedData = normalizeMLSData(mockData);
        const sourceName = sources.find((sourceKey) => mockData[sourceKey]) || 'Unknown';
        if (sourceName === 'Unknown') {
            console.warn('Warning: No valid source found in mockData.');
        }
        const result = mlsSchema.safeParse(normalizedData);

        if (!result.success) {
            console.error('Zod Validation errors:', result.error.errors);
            return {
                success: false,
                errors: result.error.errors,
            };
        } else {
            if (mockData[sourceName]) {
                await postToCRM(endpoint, result.data);
                console.log('Data successfully processed for:', mockData[sourceName]);
                return {
                    success: true,
                    data: result.data,
                };
            } else {
                console.error('No data found for source:', sourceName);
                return {
                    success: false,
                    errors: `No data found for source: ${sourceName}`,
                };
            }
        }
    } catch (err) {
        console.error('Error processing data:', err.message);
        return {
            success: false,
            errors: err.message || 'Unknown error occurred',
        };
    }
};

export default normalizeValidationSend;
