import React from 'react';

const AttendanceHeatmap = () => {
  const generateHeatmapData = () => {
    const data = [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeks = 12;
    
    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < 7; day++) {
        const attendance = Math.floor(Math.random() * 100) + 1;
        data.push({
          week,
          day,
          dayName: days[day],
          attendance,
          intensity: attendance > 90 ? 'high' : attendance > 70 ? 'medium' : attendance > 50 ? 'low' : 'very-low'
        });
      }
    }
    return data;
  };

  const heatmapData = generateHeatmapData();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'high': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-accent';
      case 'very-low': return 'bg-error';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Attendance Patterns</h3>
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-error rounded-sm"></div>
            <span>&lt;50%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-accent rounded-sm"></div>
            <span>50-70%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning rounded-sm"></div>
            <span>70-90%</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-sm"></div>
            <span>&gt;90%</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="grid grid-cols-13 gap-1 text-xs text-muted-foreground">
          <div></div>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="text-center">
              {i % 2 === 0 ? `W${i + 1}` : ''}
            </div>
          ))}
        </div>
        
        {days.map((day, dayIndex) => (
          <div key={day} className="grid grid-cols-13 gap-1 items-center">
            <div className="text-xs text-muted-foreground w-8">{day}</div>
            {Array.from({ length: 12 }, (_, weekIndex) => {
              const cellData = heatmapData.find(d => d.week === weekIndex && d.day === dayIndex);
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className={`w-4 h-4 rounded-sm ${getIntensityColor(cellData?.intensity)} cursor-pointer hover:opacity-80 transition-opacity`}
                  title={`${day} Week ${weekIndex + 1}: ${cellData?.attendance}% attendance`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceHeatmap;