import { useState } from 'react';
import { FaFileExport, FaFileImport, FaFileCsv, FaFileCode, FaTimes } from 'react-icons/fa';
import api from '../utils/api';
import { toast } from 'react-toastify';
import './ExportImport.css';

const ExportImport = ({ onImportSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [importing, setImporting] = useState(false);

  const handleExportCSV = async () => {
    try {
      const response = await api.get('/export/csv', {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `taskflow-export-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Tasks exported to CSV');
    } catch (error) {
      console.error('Export CSV error:', error);
      toast.error('Failed to export tasks');
    }
  };

  const handleExportJSON = async () => {
    try {
      const response = await api.get('/export/json');

      const dataStr = JSON.stringify(response.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `taskflow-export-${Date.now()}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success('Tasks exported to JSON');
    } catch (error) {
      console.error('Export JSON error:', error);
      toast.error('Failed to export tasks');
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      toast.error('Please select a JSON file');
      return;
    }

    try {
      setImporting(true);
      const fileContent = await file.text();
      const data = JSON.parse(fileContent);

      // Handle both formats: with or without wrapper object
      const tasks = data.tasks || data;

      if (!Array.isArray(tasks)) {
        throw new Error('Invalid file format');
      }

      const response = await api.post('/export/import', { tasks });

      toast.success(`Successfully imported ${response.data.count} tasks`);
      setIsOpen(false);
      
      if (onImportSuccess) {
        onImportSuccess();
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import tasks. Please check the file format.');
    } finally {
      setImporting(false);
      e.target.value = ''; // Reset file input
    }
  };

  return (
    <div className="export-import">
      <button 
        className="export-import-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaFileExport />
        <span>Export/Import</span>
      </button>

      {isOpen && (
        <div className="export-import-modal">
          <div className="export-import-content">
            <div className="modal-header">
              <h3>Export/Import Tasks</h3>
              <button className="close-modal" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="action-section">
                <h4><FaFileExport /> Export Tasks</h4>
                <p>Download all your tasks in CSV or JSON format</p>
                <div className="action-buttons">
                  <button onClick={handleExportCSV} className="btn-export">
                    <FaFileCsv /> Export as CSV
                  </button>
                  <button onClick={handleExportJSON} className="btn-export">
                    <FaFileCode /> Export as JSON
                  </button>
                </div>
              </div>

              <div className="divider"></div>

              <div className="action-section">
                <h4><FaFileImport /> Import Tasks</h4>
                <p>Upload a JSON file to import tasks (only JSON format supported)</p>
                <div className="action-buttons">
                  <label className="btn-import">
                    <FaFileImport /> {importing ? 'Importing...' : 'Import from JSON'}
                    <input 
                      type="file" 
                      accept=".json" 
                      onChange={handleImport}
                      disabled={importing}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
                <div className="import-note">
                  <strong>Note:</strong> Imported tasks will be added to your existing tasks. The file must contain a valid JSON array of task objects.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportImport;
