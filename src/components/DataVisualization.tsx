'use client';

import { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface ChartData {
  name: string;
  value: number;
  color: string;
  percentage?: number;
}

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

const chartData: ChartData[] = [
  { name: 'Active Users', value: 8429, color: '#10b981', percentage: 45 },
  { name: 'New Signups', value: 2341, color: '#3b82f6', percentage: 25 },
  { name: 'Premium Users', value: 1876, color: '#8b5cf6', percentage: 20 },
  { name: 'Inactive', value: 934, color: '#ef4444', percentage: 10 }
];

const revenueData: ChartData[] = [
  { name: 'Jan', value: 45000, color: '#10b981' },
  { name: 'Feb', value: 52000, color: '#10b981' },
  { name: 'Mar', value: 48000, color: '#10b981' },
  { name: 'Apr', value: 61000, color: '#10b981' },
  { name: 'May', value: 55000, color: '#10b981' },
  { name: 'Jun', value: 67000, color: '#10b981' }
];

const metrics: MetricCard[] = [
  {
    title: 'Total Revenue',
    value: '$328,000',
    change: '+12.5%',
    trend: 'up',
    icon: CurrencyDollarIcon,
    color: 'text-emerald-400'
  },
  {
    title: 'Active Sessions',
    value: '1,429',
    change: '+8.2%',
    trend: 'up',
    icon: UserGroupIcon,
    color: 'text-blue-400'
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '-2.1%',
    trend: 'down',
    icon: ArrowTrendingUpIcon,
    color: 'text-purple-400'
  },
  {
    title: 'Page Views',
    value: '89,432',
    change: '+15.3%',
    trend: 'up',
    icon: EyeIcon,
    color: 'text-amber-400'
  }
];

const recentActivity = [
  {
    id: 1,
    user: 'John Doe',
    action: 'Created new order',
    time: '2 minutes ago',
    value: '$245.00',
    type: 'order'
  },
  {
    id: 2,
    user: 'Jane Smith',
    action: 'Updated profile',
    time: '5 minutes ago',
    value: null,
    type: 'profile'
  },
  {
    id: 3,
    user: 'Bob Johnson',
    action: 'Cancelled subscription',
    time: '12 minutes ago',
    value: '-$29.99',
    type: 'subscription'
  },
  {
    id: 4,
    user: 'Alice Brown',
    action: 'Made payment',
    time: '18 minutes ago',
    value: '$89.50',
    type: 'payment'
  }
];

const PieChart = ({ data }: { data: ChartData[] }) => {
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, animatedValue: 0 })));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data.map(d => ({ ...d, animatedValue: d.percentage || 0 })));
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {animatedData.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const strokeDasharray = `${percentage} ${100 - percentage}`;
          const strokeDashoffset = -cumulativePercentage;
          cumulativePercentage += percentage;

          return (
            <circle
              key={item.name}
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke={item.color}
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out animate-glow"
              style={{
                filter: `drop-shadow(0 0 8px ${item.color}40)`
              }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gradient">{total.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Total Users</div>
        </div>
      </div>
    </div>
  );
};

const BarChart = ({ data }: { data: ChartData[] }) => {
  const [animatedHeights, setAnimatedHeights] = useState(data.map(() => 0));
  const maxValue = Math.max(...data.map(d => d.value));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedHeights(data.map(d => (d.value / maxValue) * 100));
    }, 300);
    return () => clearTimeout(timer);
  }, [data, maxValue]);

  return (
    <div className="flex items-end justify-between h-48 space-x-2">
      {data.map((item, index) => (
        <div key={item.name} className="flex flex-col items-center flex-1">
          <div className="relative w-full bg-white/5 rounded-t-lg overflow-hidden">
            <div
              className="w-full rounded-t-lg transition-all duration-1000 ease-out animate-glow"
              style={{
                height: `${animatedHeights[index]}%`,
                background: `linear-gradient(to top, ${item.color}, ${item.color}80)`,
                boxShadow: `0 0 20px ${item.color}40`
              }}
            />
          </div>
          <div className="mt-2 text-center">
            <div className="text-xs font-medium">{item.name}</div>
            <div className="text-xs text-muted-foreground">${item.value.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export function DataVisualization() {
  const [activeChart, setActiveChart] = useState<'pie' | 'bar'>('pie');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.title}
            className="card-modern animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {metric.title}
                </p>
                <p className="text-xl font-bold mt-1">{metric.value}</p>
                <div className="flex items-center mt-2 space-x-1">
                  {metric.trend === 'up' ? (
                    <ArrowUpIcon className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <ArrowDownIcon className="w-3 h-3 text-red-400" />
                  )}
                  <span
                    className={`text-xs ${
                      metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-xl glass ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="card-modern animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Analytics Overview</h3>
          <div className="flex space-x-1 glass rounded-lg p-1">
            <button
              onClick={() => setActiveChart('pie')}
              className={`p-2 rounded-md transition-modern ${
                activeChart === 'pie'
                  ? 'gradient-primary text-white shadow-glow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ChartPieIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveChart('bar')}
              className={`p-2 rounded-md transition-modern ${
                activeChart === 'bar'
                  ? 'gradient-primary text-white shadow-glow'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ChartBarIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-6">
          {activeChart === 'pie' ? (
            <PieChart data={chartData} />
          ) : (
            <BarChart data={revenueData} />
          )}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2">
          {(activeChart === 'pie' ? chartData : revenueData).map((item, index) => (
            <div
              key={item.name}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5 transition-modern animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm">{item.name}</span>
              <span className="text-xs text-muted-foreground ml-auto">
                {activeChart === 'pie' 
                  ? `${item.percentage}%` 
                  : `$${item.value.toLocaleString()}`
                }
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card-modern animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <ClockIcon className="w-5 h-5 text-muted-foreground" />
        </div>
        
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-modern animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`p-2 rounded-lg glass ${
                activity.type === 'order' ? 'text-emerald-400' :
                activity.type === 'payment' ? 'text-blue-400' :
                activity.type === 'subscription' ? 'text-red-400' :
                'text-amber-400'
              }`}>
                {activity.type === 'order' && <ShoppingCartIcon className="w-4 h-4" />}
                {activity.type === 'payment' && <CurrencyDollarIcon className="w-4 h-4" />}
                {activity.type === 'subscription' && <UserGroupIcon className="w-4 h-4" />}
                {activity.type === 'profile' && <GlobeAltIcon className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.user}</p>
                <p className="text-xs text-muted-foreground">{activity.action}</p>
              </div>
              <div className="text-right">
                {activity.value && (
                  <p className={`text-sm font-medium ${
                    activity.value.startsWith('-') ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {activity.value}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}