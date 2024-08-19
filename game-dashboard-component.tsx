import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Users, DollarSign, Calendar, TrendingUp, Activity, UserPlus } from 'lucide-react';

const generateData = () => [
  { name: '第1天', 活躍用戶: 4000, 新用戶: 2400, 收入: 2400, 在線時長: 45 },
  { name: '第2天', 活躍用戶: 3000, 新用戶: 1398, 收入: 2210, 在線時長: 50 },
  { name: '第3天', 活躍用戶: 2000, 新用戶: 9800, 收入: 2290, 在線時長: 40 },
  { name: '第4天', 活躍用戶: 2780, 新用戶: 3908, 收入: 2000, 在線時長: 55 },
  { name: '第5天', 活躍用戶: 1890, 新用戶: 4800, 收入: 2181, 在線時長: 48 },
  { name: '第6天', 活躍用戶: 2390, 新用戶: 3800, 收入: 2500, 在線時長: 52 },
  { name: '第7天', 活躍用戶: 3490, 新用戶: 4300, 收入: 2100, 在線時長: 47 },
];

const MetricCard = ({ title, value, icon: Icon, change }) => (
  <Card className="flex-1 p-4 hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% 從上週
      </p>
    </CardContent>
  </Card>
);

const GameDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateData());
  }, []);

  const totalUsers = data.reduce((sum, day) => sum + day.新用戶, 0);
  const avgRevenue = data.reduce((sum, day) => sum + day.收入, 0) / data.length;
  const avgOnlineTime = data.reduce((sum, day) => sum + day.在線時長, 0) / data.length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">遊戲數據儀表板</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard title="總用戶數" value={totalUsers} icon={Users} change={5.2} />
        <MetricCard title="平均日收入" value={`$${avgRevenue.toFixed(2)}`} icon={DollarSign} change={-2.1} />
        <MetricCard title="活躍天數" value={data.length} icon={Calendar} change={0} />
        <MetricCard title="平均在線時長" value={`${avgOnlineTime.toFixed(1)}分鐘`} icon={Activity} change={3.5} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="w-full p-4">
          <CardHeader>
            <h3 className="text-lg font-medium">每日用戶趨勢</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="活躍用戶" stroke="#8884d8" />
                <Line type="monotone" dataKey="新用戶" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="w-full p-4">
          <CardHeader>
            <h3 className="text-lg font-medium">收入與在線時長對比</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="收入" fill="#ffc658" />
                <Bar yAxisId="right" dataKey="在線時長" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameDashboard;
