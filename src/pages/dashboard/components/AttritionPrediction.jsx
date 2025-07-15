import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttritionPrediction = () => {
  const atRiskEmployees = [
    {
      id: 1,
      name: 'David Wilson',
      department: 'Engineering',
      position: 'Senior Developer',
      riskScore: 85,
      riskLevel: 'high',
      factors: ['Low engagement score', 'Missed recent 1:1s', 'Decreased productivity'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Lisa Anderson',
      department: 'Marketing',
      position: 'Marketing Manager',
      riskScore: 72,
      riskLevel: 'medium',
      factors: ['Salary below market rate', 'Limited growth opportunities', 'High workload'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c5e2e1?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Robert Kim',
      department: 'Sales',
      position: 'Sales Representative',
      riskScore: 68,
      riskLevel: 'medium',
      factors: ['Missing targets', 'Low team collaboration', 'Remote work challenges'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadgeColor = (level) => {
    switch (level) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getRecommendedActions = (riskLevel) => {
    switch (riskLevel) {
      case 'high':
        return ['Schedule immediate 1:1', 'Review compensation', 'Discuss career path'];
      case 'medium':
        return ['Increase engagement', 'Provide feedback', 'Offer development opportunities'];
      default:
        return ['Monitor regularly', 'Maintain communication'];
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="AlertTriangle" size={20} className="text-warning" />
          <h3 className="text-lg font-semibold text-foreground">Attrition Risk Prediction</h3>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Brain" size={16} />
          <span>AI Powered</span>
        </div>
      </div>

      <div className="space-y-4">
        {atRiskEmployees.map((employee) => (
          <div key={employee.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-foreground">{employee.name}</h4>
                  <p className="text-sm text-muted-foreground">{employee.position} • {employee.department}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-2xl font-bold ${getRiskColor(employee.riskLevel)}`}>
                  {employee.riskScore}%
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadgeColor(employee.riskLevel)}`}>
                  {employee.riskLevel.toUpperCase()} RISK
                </span>
              </div>
            </div>

            <div className="mb-3">
              <h5 className="text-sm font-medium text-foreground mb-2">Risk Factors:</h5>
              <div className="flex flex-wrap gap-2">
                {employee.factors.map((factor, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <h5 className="text-sm font-medium text-foreground mb-2">Recommended Actions:</h5>
              <ul className="space-y-1">
                {getRecommendedActions(employee.riskLevel).map((action, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="MessageCircle" size={14} className="mr-1" />
                Schedule 1:1
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="FileText" size={14} className="mr-1" />
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" className="w-full">
          <Icon name="BarChart3" size={16} className="mr-2" />
          View Full Attrition Analysis
        </Button>
      </div>
    </div>
  );
};

export default AttritionPrediction;