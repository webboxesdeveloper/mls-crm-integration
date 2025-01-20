import * as postToCRM from '../utils/httpClient.js';
import processMLSData from '../utils/processMLSData';
import normalizeValidationSend from '../utils/normalizeValidationSend.js';
import mockData1 from '../data/mockData1';
import mockData2 from '../data/mockData2';
import errorMockData1 from '../data/errorMockData1';
import errorMockData2 from '../data/errorMockData2';
import errorMockData3 from '../data/errorMockData3';

jest.mock('../utils/httpClient.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('processMLSData', () => {
  beforeEach(() => {
    postToCRM.default.mockResolvedValue({ status: 200, data: 'Mocked response from CRM' });
  });

  it('should normalize and post data1 to the mocked CRM endpoint', async () => {
    await processMLSData(mockData1);
    expect(postToCRM.default).toHaveBeenCalled();
    expect(postToCRM.default).toHaveBeenCalledWith(expect.stringContaining('/customer/762910/properties'), expect.any(Object));
  });

  it('should normalize and post data2 to the mocked CRM endpoint', async () => {
    await processMLSData(mockData2);
    expect(postToCRM.default).toHaveBeenCalled();
    expect(postToCRM.default).toHaveBeenCalledWith(expect.stringContaining('/customer/762910/properties'), expect.any(Object));
  });

  it('should throw validation error when required attribute is missing', async () => {
    const response = await normalizeValidationSend(errorMockData1);
    expect(response.success).toBe(false);
    expect(response.errors).toContainEqual(expect.objectContaining({
      message: expect.stringContaining('Expected string, received null'),
    }));
  });

  it('should throw error when an unsupported MLS source is provided', async () => {
    const response = await normalizeValidationSend(errorMockData2);
    expect(response.success).toBe(false);
    expect(response.errors).toContain('Unsupported MLS source: No matching source found in rawData');
  });

  it('should throw error when an unknown MLS source is provided', async () => {
    const response = await normalizeValidationSend(errorMockData3);
    expect(response.success).toBe(false);
    expect(response.errors).toContain('Unsupported MLS source: Unknown');
  });
});