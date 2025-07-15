import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnomalyDetectionPanel = ({ anomalies, onInvestigate, onDismiss }) => {
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);

  const getAnomalyIcon = (type) => {
    switch (type) {
      case 'suspicious_timing': return 'Clock';
      case 'location_mismatch': return 'MapPin';
      case 'unusual_pattern': return 'TrendingUp';
      case 'duplicate_entry': return 'Copy';
      case 'time_fraud': return 'AlertTriangle';
      default: return 'AlertCircle';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-error';
    if (confidence >= 60) return 'text-warning';
    return 'text-secondary';
  };

  const getConfidenceBg = (confidence) => {
    if (confidence >= 80) return 'bg-error/10 border-error/20';
    if (confidence >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-secondary/10 border-secondary/20';
  };

  const formatAnomalyType = (type) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">AI Anomaly Detection</h3>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {anomalies.length} anomalies detected
            </span>
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={14} className="mr-1" />
              Configure
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {anomalies.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="ShieldCheck" size={48} className="mx-auto text-success mb-4" />
            <p className="text-foreground font-medium">No anomalies detected</p>
            <p className="text-muted-foreground text-sm mt-1">
              All attendance patterns appear normal
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {anomalies.map((anomaly) => (
              <div
                key={anomaly.id}
                className={`
                  p-4 rounded-lg border transition-all duration-200 cursor-pointer
                  ${selectedAnomaly?.id === anomaly.id 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
                  }
                `}
                onClick={() => setSelectedAnomaly(selectedAnomaly?.id === anomaly.id ? null : anomaly)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${getConfidenceBg(anomaly.confidence)}
                    `}>
                      <Icon 
                        name={getAnomalyIcon(anomaly.type)} 
                        size={18} 
                        className={getConfidenceColor(anomaly.confidence)}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground">
                          {formatAnomalyType(anomaly.type)}
                        </h4>
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium border
                          ${getConfidenceBg(anomaly.confidence)} ${getConfidenceColor(anomaly.confidence)}
                        `}>
                          {anomaly.confidence}% confidence
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {anomaly.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Icon name="User" size={12} />
                          <span>{anomaly.employeeName}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="Calendar" size={12} />
                          <span>{new Date(anomaly.date).toLocaleDateString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{anomaly.time}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onInvestigate(anomaly);
                      }}
                    >
                      <Icon name="Search" size={14} className="mr-1" />
                      Investigate
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDismiss(anomaly.id);
                      }}
                    >
                      <Icon name="X" size={14} />
                    </Button>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedAnomaly?.id === anomaly.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Detection Details</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Algorithm:</span>
                            <span className="text-foreground">{anomaly.algorithm}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Severity:</span>
                            <span className={`font-medium ${getConfidenceColor(anomaly.confidence)}`}>
                              {anomaly.confidence >= 80 ? 'High' : anomaly.confidence >= 60 ? 'Medium' : 'Low'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">First Detected:</span>
                            <span className="text-foreground">
                              {new Date(anomaly.firstDetected).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-foreground mb-2">Recommendations</h5>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {anomaly.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Icon name="ArrowRight" size={12} className="mt-0.5 text-primary" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {anomaly.relatedIncidents && anomaly.relatedIncidents.length > 0 && (
                      <div className="mt-4">
                        <h5 className="font-medium text-foreground mb-2">Related Incidents</h5>
                        <div className="space-y-2">
                          {anomaly.relatedIncidents.map((incident, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <span className="text-sm text-foreground">{incident.description}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date(incident.date).toLocaleDateString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnomalyDetectionPanel;