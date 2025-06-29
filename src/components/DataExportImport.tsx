import React, { useState } from 'react';
import { Download, Upload, Share2, FileText, Database, Settings, Check, AlertCircle } from 'lucide-react';
import { UserStorage } from '../utils/storage';

export const DataExportImport: React.FC = () => {
  const [exportFormat, setExportFormat] = useState<'json' | 'csv' | 'pdf'>('json');
  const [importStatus, setImportStatus] = useState<'idle' | 'importing' | 'success' | 'error'>('idle');
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'success'>('idle');

  const handleExportData = async () => {
    setExportStatus('exporting');
    
    try {
      const data = {
        user: UserStorage.getUser(),
        decisions: UserStorage.getDecisions(),
        insights: UserStorage.getInsights(),
        exportDate: new Date().toISOString(),
        version: '1.0.0'
      };

      let content: string;
      let filename: string;
      let mimeType: string;

      switch (exportFormat) {
        case 'json':
          content = JSON.stringify(data, null, 2);
          filename = `temporal-nexus-data-${Date.now()}.json`;
          mimeType = 'application/json';
          break;
        
        case 'csv':
          // Convert decisions to CSV
          const csvHeaders = ['ID', 'Type', 'Title', 'Status', 'Priority', 'Created', 'Confidence'];
          const csvRows = data.decisions.map(d => [
            d.id,
            d.type,
            d.title,
            d.status,
            d.priority,
            d.createdAt,
            d.confidence || 'N/A'
          ]);
          content = [csvHeaders, ...csvRows].map(row => row.join(',')).join('\n');
          filename = `temporal-nexus-decisions-${Date.now()}.csv`;
          mimeType = 'text/csv';
          break;
        
        case 'pdf':
          // Generate PDF report
          content = generatePDFReport(data);
          filename = `temporal-nexus-report-${Date.now()}.html`;
          mimeType = 'text/html';
          break;
        
        default:
          throw new Error('Unsupported format');
      }

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);

      setExportStatus('success');
      setTimeout(() => setExportStatus('idle'), 2000);
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus('idle');
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportStatus('importing');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let data: any;

        if (file.type === 'application/json' || file.name.endsWith('.json')) {
          data = JSON.parse(content);
        } else {
          throw new Error('Unsupported file format');
        }

        // Validate data structure
        if (!data.user || !data.decisions) {
          throw new Error('Invalid data format');
        }

        // Import data
        if (data.user) {
          localStorage.setItem('temporal_nexus_user', JSON.stringify(data.user));
        }
        if (data.decisions) {
          localStorage.setItem('temporal_nexus_decisions', JSON.stringify(data.decisions));
        }
        if (data.insights) {
          localStorage.setItem('temporal_nexus_insights', JSON.stringify(data.insights));
        }

        setImportStatus('success');
        setTimeout(() => {
          setImportStatus('idle');
          window.location.reload(); // Refresh to show imported data
        }, 2000);
      } catch (error) {
        console.error('Import error:', error);
        setImportStatus('error');
        setTimeout(() => setImportStatus('idle'), 3000);
      }
    };

    reader.readAsText(file);
  };

  const handleShareData = async () => {
    try {
      const data = UserStorage.exportData();
      const blob = new Blob([data], { type: 'application/json' });
      
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], 'temporal-nexus-data.json', { type: 'application/json' });
        await navigator.share({
          title: 'TEMPORAL NEXUS Decision Data',
          text: 'My decision analysis data from TEMPORAL NEXUS',
          files: [file]
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(data);
        alert('Data copied to clipboard!');
      }
    } catch (error) {
      console.error('Share error:', error);
      alert('Sharing failed. Please try export instead.');
    }
  };

  const generatePDFReport = (data: any) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>TEMPORAL NEXUS Decision Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .header { text-align: center; margin-bottom: 40px; }
        .section { margin-bottom: 30px; }
        .decision { border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 5px; }
        .status { padding: 3px 8px; border-radius: 3px; font-size: 12px; }
        .completed { background: #d4edda; color: #155724; }
        .analyzing { background: #fff3cd; color: #856404; }
        .pending { background: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <div class="header">
        <h1>TEMPORAL NEXUS Decision Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
        <p>User: ${data.user?.name || 'Guest User'}</p>
    </div>
    
    <div class="section">
        <h2>Decision Summary</h2>
        <p>Total Decisions: ${data.decisions.length}</p>
        <p>Completed: ${data.decisions.filter((d: any) => d.status === 'completed').length}</p>
        <p>In Progress: ${data.decisions.filter((d: any) => d.status === 'analyzing').length}</p>
        <p>Pending: ${data.decisions.filter((d: any) => d.status === 'pending').length}</p>
    </div>
    
    <div class="section">
        <h2>Decisions</h2>
        ${data.decisions.map((decision: any) => `
            <div class="decision">
                <h3>${decision.title}</h3>
                <p><strong>Type:</strong> ${decision.type.replace('_', ' ')}</p>
                <p><strong>Status:</strong> <span class="status ${decision.status}">${decision.status}</span></p>
                <p><strong>Priority:</strong> ${decision.priority}</p>
                <p><strong>Created:</strong> ${new Date(decision.createdAt).toLocaleDateString()}</p>
                ${decision.confidence ? `<p><strong>Confidence:</strong> ${decision.confidence}%</p>` : ''}
                <p><strong>Description:</strong> ${decision.description}</p>
            </div>
        `).join('')}
    </div>
    
    <div class="section">
        <h2>Insights</h2>
        ${data.insights.map((insight: any) => `
            <div class="decision">
                <p><strong>${insight.type.toUpperCase()}:</strong> ${insight.message}</p>
                <p><em>Timeframe: ${insight.timeframe}</em></p>
            </div>
        `).join('')}
    </div>
</body>
</html>
    `;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Database className="w-6 h-6 text-temporal-400" />
        <div>
          <h2 className="text-xl font-bold text-white">Data Management</h2>
          <p className="text-sm text-gray-400">Export, import, and share your decision data</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Export Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Download className="w-5 h-5 text-temporal-400" />
            <span>Export Data</span>
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Export Format
              </label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as any)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="json">JSON (Complete Data)</option>
                <option value="csv">CSV (Decisions Only)</option>
                <option value="pdf">PDF Report</option>
              </select>
            </div>
            
            <button
              onClick={handleExportData}
              disabled={exportStatus === 'exporting'}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-temporal-gradient rounded-lg font-semibold text-white disabled:opacity-50 hover:shadow-lg transition-all duration-300"
            >
              {exportStatus === 'exporting' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Exporting...</span>
                </>
              ) : exportStatus === 'success' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Exported!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Import Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Upload className="w-5 h-5 text-quantum-400" />
            <span>Import Data</span>
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select JSON File
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                disabled={importStatus === 'importing'}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-temporal-500 file:text-white file:cursor-pointer"
              />
            </div>
            
            {importStatus !== 'idle' && (
              <div className={`flex items-center space-x-2 p-3 rounded-lg ${
                importStatus === 'importing' ? 'bg-temporal-400/20 text-temporal-300' :
                importStatus === 'success' ? 'bg-collective-400/20 text-collective-300' :
                'bg-red-400/20 text-red-300'
              }`}>
                {importStatus === 'importing' && (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                )}
                {importStatus === 'success' && <Check className="w-4 h-4" />}
                {importStatus === 'error' && <AlertCircle className="w-4 h-4" />}
                <span className="text-sm">
                  {importStatus === 'importing' && 'Importing data...'}
                  {importStatus === 'success' && 'Data imported successfully!'}
                  {importStatus === 'error' && 'Import failed. Please check file format.'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2 mb-4">
          <Share2 className="w-5 h-5 text-collective-400" />
          <span>Share & Collaborate</span>
        </h3>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            onClick={handleShareData}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-collective-500/20 border border-collective-500/30 rounded-lg text-collective-300 hover:bg-collective-500/30 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Data</span>
          </button>
          
          <button
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              alert('Link copied to clipboard!');
            }}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-quantum-500/20 border border-quantum-500/30 rounded-lg text-quantum-300 hover:bg-quantum-500/30 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>Copy Link</span>
          </button>
        </div>
      </div>

      {/* Data Info */}
      <div className="mt-6 p-4 bg-white/5 rounded-lg">
        <h4 className="text-sm font-medium text-white mb-2">Data Information</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Decisions</p>
            <p className="text-white font-medium">{UserStorage.getDecisions().length}</p>
          </div>
          <div>
            <p className="text-gray-400">Insights</p>
            <p className="text-white font-medium">{UserStorage.getInsights().length}</p>
          </div>
          <div>
            <p className="text-gray-400">User Type</p>
            <p className="text-white font-medium">{UserStorage.getUser()?.isGuest ? 'Guest' : 'Registered'}</p>
          </div>
          <div>
            <p className="text-gray-400">Last Updated</p>
            <p className="text-white font-medium">Just now</p>
          </div>
        </div>
      </div>
    </div>
  );
};