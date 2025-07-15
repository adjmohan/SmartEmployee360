import React from 'react';
import Icon from '../../../components/AppIcon';

const PayrollSummaryCards = ({ summaryData }) => {
  const cards = [
    {
      title: 'Total Payroll',
      value: `$${summaryData.totalPayroll.toLocaleString()}`,
      change: '+5.2%',
      changeType: 'increase',
      icon: 'DollarSign',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Employees Processed',
      value: `${summaryData.processedEmployees}/${summaryData.totalEmployees}`,
      change: `${Math.round((summaryData.processedEmployees / summaryData.totalEmployees) * 100)}%`,
      changeType: 'neutral',
      icon: 'Users',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Average Salary',
      value: `$${summaryData.averageSalary.toLocaleString()}`,
      change: '+2.8%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      title: 'Tax Deductions',
      value: `$${summaryData.totalTax.toLocaleString()}`,
      change: '+1.4%',
      changeType: 'increase',
      icon: 'Receipt',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center`}>
              <Icon name={card.icon} size={24} className={card.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              card.changeType === 'increase' ? 'text-success' : 
              card.changeType === 'decrease' ? 'text-error' : 'text-muted-foreground'
            }`}>
              {card.changeType === 'increase' && <Icon name="TrendingUp" size={14} />}
              {card.changeType === 'decrease' && <Icon name="TrendingDown" size={14} />}
              <span>{card.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{card.value}</h3>
            <p className="text-sm text-muted-foreground">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayrollSummaryCards;