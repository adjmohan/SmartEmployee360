import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SalaryTrendChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('12months');

  const salaryTrendData = [
    { month: 'Jan', totalPayroll: 2200000, avgSalary: 14103, employees: 156 },
    { month: 'Feb', totalPayroll: 2250000, avgSalary: 14423, employees: 156 },
    { month: 'Mar', totalPayroll: 2180000, avgSalary: 13974, employees: 156 },
    { month: 'Apr', totalPayroll: 2320000, avgSalary: 14872, employees: 156 },
    { month: 'May', totalPayroll: 2380000, avgSalary: 15256, employees: 156 },
    { month: 'Jun', totalPayroll: 2420000, avgSalary: 15513, employees: 156 },
    { month: 'Jul', totalPayroll: 2350000, avgSalary: 15064, employees: 156 },
    { month: 'Aug', totalPayroll: 2400000, avgSalary: 15385, employees: 156 },
    { month: 'Sep', totalPayroll: 2450000, avgSalary: 15705, employees: 156 },
    { month: 'Oct', totalPayroll: 2380000, avgSalary: 15256, employees: 156 },
    { month: 'Nov', totalPayroll: 2420000, avgSalary: 15513, employees: 156 },
    { month: 'Dec', totalPayroll: 2480000, avgSalary: 15897, employees: 156 }
  ];

  const chartTypeOptions = [
    { value: 'line', label: 'Line Chart' },
    { value: 'bar', label: 'Bar Chart' }
  ];

  const timeRangeOptions = [
    { value: '6months', label: 'Last 6 Months' },
    { value: '12months', label: 'Last 12 Months' },
    { value: '24months', label: 'Last 24 Months' }
  ];

  const formatCurrency = (value) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const formatAvgSalary = (value) => {
    return `$${value.toLocaleString()}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{`${label} 2024`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'totalPayroll' ? 'Total Payroll: ' : 'Avg Salary: '}
              {entry.dataKey === 'totalPayroll' 
                ? formatCurrency(entry.value)
                : formatAvgSalary(entry.value)
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Salary Trend Analysis</h3>
          <p className="text-sm text-muted-foreground">Track payroll patterns and forecasting</p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 lg:mt-0">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          <Select
            options={chartTypeOptions}
            value={chartType}
            onChange={setChartType}
            className="w-32"
          />
          <Button variant="outline" size="sm">
            <Icon name="Download" size={14} className="mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={salaryTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                yAxisId="left"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={formatAvgSalary}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="totalPayroll"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgSalary"
                stroke="var(--color-accent)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          ) : (
            <BarChart data={salaryTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="totalPayroll" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-success/5 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Growth Trend</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Average salary increased by 12.7% over the last 12 months
          </p>
        </div>

        <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Seasonal Pattern</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Higher payroll costs typically occur in Q2 and Q4
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Forecast</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Projected 8% increase in total payroll for next quarter
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalaryTrendChart;