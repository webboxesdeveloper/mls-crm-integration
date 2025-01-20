import normalizeValidationSend from './normalizeValidationSend.js';

const processMLSData = async (rawDataArr) => {

  if (!Array.isArray(rawDataArr)) {
    throw new Error('Expected an array for rawDataArr');
  }

  const promises = rawDataArr.map(rawData => normalizeValidationSend(rawData));
  const results = await Promise.allSettled(promises);

  results.forEach(result => {
    if (result.status === 'fulfilled') {
      console.log('Success:', result.value);
    } else {
      console.error('Error:', result.reason);
    }
  });
};

export default processMLSData;