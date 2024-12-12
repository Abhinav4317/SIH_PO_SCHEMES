// filterUtils.js

// Helper function to filter by state
export const filterByState = (data, state) => {
  return data.filter((item) => item.statename === state);
};

// Helper function to filter by region
export const filterByRegion = (data, state, region) => {
  return data.filter(
    (item) => item.statename === state && item.regionname === region
  );
};

// Helper function to filter by district
export const filterByDistrict = (data, state, region, district) => {
  return data.filter(
    (item) =>
      item.statename === state &&
      item.regionname === region &&
      item.Districtname === district
  );
};

// Get places based on role PMO
export const getPMOPlaces = (data) => {
  return [...new Set(data.map((item) => item.statename))]; // Get unique state names
};

// Get places based on role State General
export const getStateGeneralPlaces = (data, state) => {
  const filteredData = filterByState(data, state);
  return [...new Set(filteredData.map((item) => item.regionname))]; // Get unique region names
};

// Get places based on role Bhopal HQ
export const getBhopalHQPlaces = (data, state, region) => {
  const filteredData = filterByRegion(data, state, region);
  return [...new Set(filteredData.map((item) => item.Districtname))]; // Get unique district names
};

// Get places based on role Gwalior
export const getGwaliorPlaces = (data, state, region) => {
  const filteredData = filterByRegion(data, state, region);
  return [...new Set(filteredData.map((item) => item.Districtname))]; // Get unique district names
};

// Get places based on role Indore
export const getIndorePlaces = (data, state, region) => {
  const filteredData = filterByRegion(data, state, region);
  return [...new Set(filteredData.map((item) => item.Districtname))]; // Get unique district names
};

// Get places based on role District
export const getDistrictPlaces = (data, state, region, district) => {
  const filteredData = filterByDistrict(data, state, region, district);
  return filteredData.map((item) => `${item.officename} ${item.officeType}`); // Concatenate officename and officeType
};
