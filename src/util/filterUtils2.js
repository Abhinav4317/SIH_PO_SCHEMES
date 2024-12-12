import Papa from "papaparse";

// Helper function to parse CSV
export const parsePostOfficeCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

// Helper functions for different roles
const getPMOLocations = (data) => {
  return data.filter((office) => office.Latitude && office.Longitude);
};

const getStateGeneralLocations = (data) => {
  return data.filter(
    (office) =>
      office.StateName === "MADHYA PRADESH" &&
      office.Latitude &&
      office.Longitude
  );
};

const getBhopalHQLocations = (data) => {
  return data.filter(
    (office) =>
      office.StateName === "MADHYA PRADESH" &&
      office.RegionName === "DivReportingCircle" &&
      office.Latitude &&
      office.Longitude
  );
};

const getGwaliorLocations = (data) => {
  console.log("gwalior");
  return data.filter(
    (office) =>
      office.StateName === "MADHYA PRADESH" &&
      office.RegionName === "Jabalpur Region" &&
      office.Latitude &&
      office.Longitude
  );
};

const getIndoreLocations = (data) => {
  return data.filter(
    (office) =>
      office.StateName === "MADHYA PRADESH" &&
      office.RegionName === "Indore Region" &&
      office.Latitude &&
      office.Longitude
  );
};

const getDistrictLocations = (data) => {
  return data.filter(
    (office) =>
      office.StateName === "MADHYA PRADESH" &&
      office.RegionName === "DivReportingCircle" &&
      office.District === "BHOPAL" &&
      office.Latitude &&
      office.Longitude
  );
};

// Main function to get post office locations based on role
export const getPostOfficeLocations = (data, role) => {
  switch (role) {
    case "PMO":
      return getPMOLocations(data);
    case "State General":
      return getStateGeneralLocations(data);
    case "Bhopal HQ":
      return getBhopalHQLocations(data);
    case "Gwalior":
      return getGwaliorLocations(data);
    case "Indore":
      return getIndoreLocations(data);
    case "District":
      return getDistrictLocations(data);
    default:
      return [];
  }
};

// Example usage function
export const fetchPostOfficeLocations = async (role) => {
  try {
    const data = await parsePostOfficeCSV("/pincode-csv.csv");
    return getPostOfficeLocations(data, role);
  } catch (error) {
    console.error("Error fetching post office locations:", error);
    return [];
  }
};
