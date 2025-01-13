import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LineChart, Line, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart, Bar } from 'recharts';
import { Search, Filter, Users, Activity, Hospital, Network, UserPlus, Building2, Target, ArrowUpRight } from 'lucide-react';
import RegionalMap from './Map';

const KPICard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-blue-600 mt-1">{value}</h3>
        {trend && (
          <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </p>
        )}
      </div>
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
  </div>
);

function ZolgensmaDashboard() {
  // State management
  const [selectedAccount, setSelectedAccount] = useState('all');

  // KPI data
  const kpiData = {
    totalHCPs: 245,
    totalPatients: 1525,
    treatmentCenters: 89,
    activeReferrals: 456,
    conversionRate: 72
  };

  // Treatment distribution data
  const treatmentData = [
    { month: 'Jan', zolgensma: 25, evrysdi: 20, spinraza: 15 },
    { month: 'Feb', zolgensma: 28, evrysdi: 22, spinraza: 14 },
    { month: 'Mar', zolgensma: 32, evrysdi: 24, spinraza: 13 }
  ];

  // Patient segments data
  const patientSegments = [
    { name: 'Type 1 SMA', value: 35, color: '#4F46E5' },
    { name: 'Type 2 SMA', value: 45, color: '#10B981' },
    { name: 'Type 3 SMA', value: 20, color: '#F59E0B' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Zolgensma Analytics Platform</h1>
            <p className="text-gray-500">Comprehensive Market Intelligence Dashboard</p>
          </div>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Search HCP or center..."
              className="w-64"
            />
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-6">
          <KPICard 
            title="Total HCPs" 
            value={kpiData.totalHCPs}
            icon={Users}
            trend={5}
          />
          <KPICard 
            title="Total Patients" 
            value={kpiData.totalPatients}
            icon={Activity}
            trend={8}
          />
          <KPICard 
            title="Treatment Centers" 
            value={kpiData.treatmentCenters}
            icon={Hospital}
            trend={3}
          />
          <KPICard 
            title="Active Referrals" 
            value={kpiData.activeReferrals}
            icon={Network}
            trend={12}
          />
          <KPICard 
            title="Conversion Rate" 
            value={`${kpiData.conversionRate}%`}
            icon={Target}
            trend={4}
          />
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white p-1 rounded-lg">
          <TabsTrigger value="overview" className="px-4 py-2">Market Overview</TabsTrigger>
          <TabsTrigger value="hcp" className="px-4 py-2">HCP Analytics</TabsTrigger>
          <TabsTrigger value="accounts" className="px-4 py-2">Account Analytics</TabsTrigger>
          <TabsTrigger value="network" className="px-4 py-2">Referral Network</TabsTrigger>
        </TabsList>

        {/* Market Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <RegionalMap />
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Treatment Distribution Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={treatmentData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="zolgensma" stackId="a" fill="#4F46E5" name="Zolgensma" />
                  <Bar dataKey="evrysdi" stackId="a" fill="#10B981" name="Evrysdi" />
                  <Bar dataKey="spinraza" stackId="a" fill="#F59E0B" name="Spinraza" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        {/* HCP Analytics Tab */}
        <TabsContent value="hcp" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            {/* Patient Segments Card */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Patient Segments</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={patientSegments}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {patientSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-[#4F46E5] mr-2"></span>
                      Type 1 SMA
                    </span>
                    <span className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></span>
                      Type 2 SMA
                    </span>
                    <span className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-[#F59E0B] mr-2"></span>
                      Type 3 SMA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Treatment Distribution Trend Card */}
            <div className="bg-white rounded-lg p-6 col-span-2">
              <h2 className="text-lg font-semibold mb-4">Treatment Distribution Trend</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={treatmentData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="zolgensma" stroke="#4F46E5" name="Zolgensma" />
                    <Line type="monotone" dataKey="evrysdi" stroke="#10B981" name="Evrysdi" />
                    <Line type="monotone" dataKey="spinraza" stroke="#F59E0B" name="Spinraza" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Referral Metrics */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Referral Metrics</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Referral Acceptance Rate</p>
                  <p className="text-2xl font-bold text-blue-600">85%</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Monthly Referrals</p>
                  <p className="text-2xl font-bold text-green-600">20</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Treatment Conversion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">72%</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Account Analytics Tab */}
        <TabsContent value="accounts" className="space-y-6">
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select Account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="boston">Boston Children's - Academic Medical Center</SelectItem>
              <SelectItem value="chop">CHOP - Current IV Site</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-4">Account Profile</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-4">Facility Overview</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span>Academic Medical Center</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-600">Gene Therapy Ready</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SMA Patients:</span>
                    <span>45</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-4">Treatment Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Zolgensma', value: 60, color: '#4F46E5' },
                        { name: 'Other Therapies', value: 40, color: '#10B981' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                    >
                      <Cell fill="#4F46E5" />
                      <Cell fill="#10B981" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-4">Key Performance Metrics</h3>
              <div className="space-y-6">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Patient Conversion</h4>
                  <span className="text-3xl font-bold text-purple-600">75%</span>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-2">Time to Treatment</h4>
                  <span className="text-3xl font-bold text-green-600">21 days</span>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Referral Network Tab */}
        <TabsContent value="network" className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Network Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Active Referrers:</span>
                  <span className="font-bold">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Avg. Time to Referral:</span>
                  <span className="font-bold">7 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Conversion Rate:</span>
                  <span className="font-bold">68%</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Top Referrers</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Boston Children's Hospital:</span>
                  <span className="font-bold">15 referrals</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>CHOP:</span>
                  <span className="font-bold">10 referrals</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Mayo Clinic:</span>
                  <span className="font-bold">8 referrals</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h4 className="font-semibold mb-4">Referral Network Visualization</h4>
              <div className="h-64">
                {/* Placeholder for network visualization */}
                <div className="flex items-center justify-center h-full text-gray-400">
                  Network graph goes here
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ZolgensmaDashboard;
