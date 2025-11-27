import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

interface TechRadarProps {
  compact?: boolean;
}

const data = [
  { subject: 'Java', A: 90, fullMark: 100 },
  { subject: 'Go', A: 85, fullMark: 100 },
  { subject: 'Spring Boot', A: 95, fullMark: 100 },
  { subject: 'Kafka', A: 80, fullMark: 100 },
  { subject: 'Redis', A: 85, fullMark: 100 },
  { subject: 'MySQL', A: 85, fullMark: 100 },
  { subject: 'AWS', A: 75, fullMark: 100 },
  { subject: 'Sys Design', A: 85, fullMark: 100 },
  { subject: 'LLD', A: 80, fullMark: 100 },
  { subject: 'HLD', A: 75, fullMark: 100 },
];

const getProficiencyLabel = (value: number) => {
    if (value >= 90) return 'Expert';
    if (value >= 80) return 'Advanced';
    if (value >= 60) return 'Proficient';
    if (value >= 40) return 'Intermediate';
    return 'Beginner';
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 dark:bg-slate-50/95 border border-slate-700 dark:border-slate-200 p-3 rounded-lg shadow-xl backdrop-blur-md z-50 relative">
        <p className="font-bold text-slate-100 dark:text-slate-900 mb-1">{label}</p>
        <p className="text-sm text-blue-400 dark:text-blue-600 font-semibold">
           {getProficiencyLabel(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

const TechRadar: React.FC<TechRadarProps> = ({ compact = false }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Colors
  const gridColor = isDark ? '#334155' : '#cbd5e1'; // slate-700 : slate-300
  const textColor = isDark ? '#94a3b8' : '#64748b'; // slate-400 : slate-500
  const strokeColor = '#3b82f6'; // blue-500
  const fillColor = '#3b82f6'; // blue-500

  // Responsive settings based on 'compact' prop
  const fontSize = compact ? 9 : 13;
  const outerRadius = compact ? "60%" : "70%";
  
  // Format labels for compact mode to save space
  const formatLabel = (label: string) => {
      if (!compact) return label;
      const map: Record<string, string> = {
          'Spring Boot': 'Spring',
          'Sys Design': 'System',
          'MySQL': 'SQL',
          'Java': 'Java',
          'Go': 'Go',
          'Kafka': 'Kafka',
          'Redis': 'Redis',
          'AWS': 'AWS',
          'LLD': 'LLD',
          'HLD': 'HLD'
      };
      return map[label] || label;
  };

  return (
    <div className={`w-full relative ${compact ? 'h-[250px]' : 'h-[450px]'}`}>
       {/* Background Glow Effect */}
       <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl scale-75"></div>
       
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius={outerRadius} data={data}>
          <PolarGrid gridType="polygon" stroke={gridColor} strokeWidth={1} strokeDasharray="4 4" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: textColor, fontSize: fontSize, fontWeight: compact ? 500 : 600 }} 
            tickFormatter={formatLabel}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke={strokeColor}
            strokeWidth={compact ? 2 : 3}
            fill={fillColor}
            fillOpacity={0.4}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TechRadar;