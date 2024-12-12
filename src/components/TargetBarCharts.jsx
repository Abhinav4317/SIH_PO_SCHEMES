import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TargetsBarChart = ({ targets }) => {
  // Separate savings and insurance schemes
  const savingsSchemes = targets.filter(
    (scheme) =>
      !scheme.name.startsWith("PLI") && !scheme.name.startsWith("RPLI")
  );

  const pliSchemes = targets.filter((scheme) => scheme.name.startsWith("PLI"));

  const rpliSchemes = targets.filter((scheme) =>
    scheme.name.startsWith("RPLI")
  );

  // Prepare data for charts
  const prepareSchemesData = (schemes) => {
    return schemes.map((scheme) => ({
      name: scheme.name.replace(/^(PLI - |RPLI - )/, ""), // Remove prefix
      target: parseFloat(scheme.target),
    }));
  };

  return (
    <div className="w-full space-y-8">
      {/* Savings Schemes Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Savings Schemes Targets</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={prepareSchemesData(savingsSchemes)}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={100}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="target" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insurance Schemes - Split into PLI and RPLI */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* PLI Schemes Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">PLI Schemes Targets</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={prepareSchemesData(pliSchemes)}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={100}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="target" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* RPLI Schemes Chart */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">RPLI Schemes Targets</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={prepareSchemesData(rpliSchemes)}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={100}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="target" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TargetsBarChart;
