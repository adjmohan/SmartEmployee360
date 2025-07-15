import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalaryTrendChart = () => {
  const salaryData = [
    { month: 'Jan', avgSalary: 75000, totalPayroll: 3375000 },
    { month: 'Feb', avgSalary: 76200, totalPayroll: 3429000 },
    { month: 'Mar', avgSalary: 77500, totalPayroll: 3487500 },
    { month: 'Apr', avgSalary: 78800, totalPayroll: 3546000 },
    { month: 'May', avgSalary: 79200, totalPayroll: 3564000 },
    { month: 'Jun', avgSalary: 80100, totalPayroll: 3604500 },
    { month: 'Jul', avgSalary: 81500, totalPayroll: 3667500 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-popover-foreground mb-2">{label} 2024</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Salary Trends</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salaryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="month" 
              stroke="#64748B"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748B"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="avgSalary" 
              stroke="#2563EB" 
              strokeWidth={3}
              dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
              name="Average Salary"
            />
            <Line 
              type="monotone" 
              dataKey="totalPayroll" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              name="Total Payroll"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalaryTrendChart;