import React, { useEffect, useState } from 'react';
import { temporalAPI } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Download, Filter, CalendarDays, RefreshCw } from 'lucide-react';

const COLORS = ['#60a5fa', '#f472b6', '#a78bfa', '#34d399', '#fbbf24', '#f87171', '#818cf8'];

interface AnalyticsDashboardProps {
  userId: string;
}

const decisionTypes = [
  'career_change', 'investment', 'marriage', 'relocation', 'health', 'retirement', 'startup_launch', 'real_estate', 'personal_development'
];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userId }) => {
  const [summary, setSummary] = useState<any>(null);
  const [history, setHistory] = useState<any>(null);
  const [exporting, setExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const params: any = {};
      if (typeFilter) params.decisionType = typeFilter;
      if (dateFrom) params.from = dateFrom;
      if (dateTo) params.to = dateTo;
      const s = await temporalAPI.getAnalyticsSummary(userId, params);
      setSummary(s);
      const h = await temporalAPI.getAnalyticsHistory(userId, params);
      setHistory(h);
    } catch (e: any) {
      setError(e.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line
  }, [userId]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const data = await temporalAPI.exportAnalyticsData(userId, exportFormat);
      let content: string;
      let mimeType: string;
      let filename: string;
      if (exportFormat === 'json') {
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/json';
        filename = `analytics-export-${userId}.json`;
      } else {
        content = data;
        mimeType = 'text/csv';
        filename = `analytics-export-${userId}.csv`;
      }
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      setError(e.message || 'Export failed');
    } finally {
      setExporting(false);
    }
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnalytics();
  };

  const resetFilters = () => {
    setTypeFilter('');
    setDateFrom('');
    setDateTo('');
    setTimeout(fetchAnalytics, 0);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2 mb-2 md:mb-0">
          <h2 className="text-xl font-bold text-white">Advanced Analytics & Reporting</h2>
          <button onClick={fetchAnalytics} className="ml-2 p-2 rounded bg-white/10 hover:bg-white/20 transition-colors text-temporal-400" title="Refresh analytics">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleFilter} className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-1">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="px-2 py-1 rounded bg-white/10 text-white border border-white/20 text-sm"
            >
              <option value="">All Types</option>
              {decisionTypes.map(type => (
                <option key={type} value={type}>{type.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="px-2 py-1 rounded bg-white/10 text-white border border-white/20 text-sm"
              placeholder="From"
              max={dateTo || undefined}
            />
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="px-2 py-1 rounded bg-white/10 text-white border border-white/20 text-sm"
              placeholder="To"
              min={dateFrom || undefined}
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1 rounded bg-temporal-500 text-white hover:bg-temporal-600 transition-colors text-sm"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={resetFilters}
            className="px-2 py-1 rounded bg-white/10 text-gray-400 hover:bg-white/20 transition-colors text-sm"
          >
            Reset
          </button>
          <select
            value={exportFormat}
            onChange={e => setExportFormat(e.target.value as 'json' | 'csv')}
            className="px-2 py-1 rounded bg-white/10 text-white border border-white/20 text-sm"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
          <button
            onClick={handleExport}
            disabled={exporting}
            type="button"
            className="flex items-center px-3 py-2 bg-temporal-500 text-white rounded hover:bg-temporal-600 transition-colors text-sm"
          >
            <Download className="w-4 h-4 mr-1" /> Export
          </button>
        </form>
      </div>
      {error && (
        <div className="mb-4 p-3 bg-red-400/10 text-red-300 rounded">{error}</div>
      )}
      {loading ? (
        <div className="text-gray-400">Loading analytics...</div>
      ) : !summary ? (
        <div className="text-gray-400">No analytics data available for the selected filters.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Decision Types</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={Object.entries(summary.byType).map(([type, count]) => ({ type, count }))}>
                <XAxis dataKey="type" stroke="#fff" tick={{ fill: '#fff', fontSize: 12 }} />
                <YAxis stroke="#fff" allowDecimals={false} tick={{ fill: '#fff', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#222', border: 'none', color: '#fff' }} />
                <Bar dataKey="count" fill="#60a5fa" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={Object.entries(summary.byStatus).map(([status, count]) => ({ status, count }))}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ status, percent }) => `${status}: ${(percent * 100).toFixed(0)}%`}
                >
                  {Object.entries(summary.byStatus).map(([_status, _count], idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#222', border: 'none', color: '#fff' }} />
                <Legend formatter={value => <span style={{ color: '#fff' }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Confidence</h3>
            <div className="flex flex-col items-center justify-center h-full">
              <span className="text-5xl font-bold text-temporal-400 mb-2">
                {summary.avgConfidence ? summary.avgConfidence.toFixed(1) : '--'}%
              </span>
              <span className="text-gray-400">Avg. Confidence</span>
              <span className="text-2xl font-bold text-white mt-4">{summary.total}</span>
              <span className="text-gray-400">Total Decisions</span>
            </div>
          </div>
        </div>
      )}
      {history && history.decisions && history.decisions.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Recent Decisions & Simulations</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border border-white/10 rounded-xl overflow-hidden">
              <thead className="bg-white/10">
                <tr>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Created</th>
                  <th className="px-4 py-2">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {history.decisions.slice(0, 10).map((d: any) => (
                  <tr key={d.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-2 capitalize">{d.decision_type?.replace('_', ' ')}</td>
                    <td className="px-4 py-2">{d.title}</td>
                    <td className="px-4 py-2 capitalize">{d.status}</td>
                    <td className="px-4 py-2">{new Date(d.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{d.confidence ?? '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-center py-8">No recent decisions or simulations for the selected filters.</div>
      )}
    </div>
  );
};
