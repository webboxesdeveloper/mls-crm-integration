import { sources, dataMapping } from './dataMapping.js';

const normalizeMLSData = (rawData) => {
  const sourceKeyField = sources.find((key) => !!rawData[key]);
  const sourceKey = rawData[sourceKeyField];
  
  if (!sourceKey) {
    throw new Error(`Unsupported MLS source: No matching source found in rawData`);
  }

  const mapping = dataMapping[sourceKey];
  
  if (!mapping) {
    throw new Error(`Unsupported MLS source: Unknown ${sourceKey}`);
  }

  const normalizedData = {};
  for (const [key, value] of Object.entries(mapping)) {
    if (typeof value === 'function') {
      normalizedData[key] = value(rawData);
    } else if (value) {
      normalizedData[key] = value.split('.').reduce((obj, field) => {
        return obj ? obj[field] : null;
      }, rawData) || null;
    } else {
      normalizedData[key] = null;
    }
  }

  return normalizedData;
}

export default normalizeMLSData;