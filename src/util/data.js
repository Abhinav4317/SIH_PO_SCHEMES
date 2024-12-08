// utils.js

// Raw demographic data
export const demographicData = [
  {
    age: "0-18",
    gender: "Male",
    population: 1200,
    income: "Medium",
    occupation: "Business",
  },
  {
    age: "0-18",
    gender: "Female",
    population: 922,
    income: "Medium",
    occupation: "Business",
  },
  {
    age: "19-35",
    gender: "Male",
    population: 2230,
    income: "Medium",
    occupation: "Salaried",
  },
  {
    age: "19-35",
    gender: "Female",
    population: 1661,
    income: "Low",
    occupation: "Farmer",
  },
  {
    age: "36-60",
    gender: "Male",
    population: 1889,
    income: "Low",
    occupation: "Salaried",
  },
  {
    age: "36-60",
    gender: "Female",
    population: 1649,
    income: "High",
    occupation: "Farmer",
  },
  {
    age: "60+",
    gender: "Male",
    population: 1360,
    income: "Low",
    occupation: "Salaried",
  },
  {
    age: "60+",
    gender: "Female",
    population: 1288,
    income: "Medium",
    occupation: "Business",
  },
];

// Fetch age groups
export const getAgeGroups = () => {
  return ["0-18", "19-35", "36-60", "60+"];
};

// Fetch population by gender
export const getPopulationByGender = () => {
  return {
    Male: demographicData
      .filter((d) => d.gender === "Male")
      .reduce((acc, curr) => {
        acc[curr.age] = (acc[curr.age] || 0) + curr.population;
        return acc;
      }, {}),
    Female: demographicData
      .filter((d) => d.gender === "Female")
      .reduce((acc, curr) => {
        acc[curr.age] = (acc[curr.age] || 0) + curr.population;
        return acc;
      }, {}),
  };
};

// Fetch population by income level
export const getPopulationByIncome = () => {
  return ["Low", "Medium", "High"].map((income) => ({
    income,
    population: demographicData
      .filter((d) => d.income === income)
      .reduce((acc, curr) => acc + curr.population, 0),
  }));
};

// Fetch occupation distribution
export const getOccupationDistribution = () => {
  return ["Business", "Salaried", "Farmer"].map((occupation) => ({
    occupation,
    population: demographicData
      .filter((d) => d.occupation === occupation)
      .reduce((acc, curr) => acc + curr.population, 0),
  }));
};
