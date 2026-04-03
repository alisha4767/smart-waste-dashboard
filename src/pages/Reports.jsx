import React, { useState, useEffect } from 'react';
import { MapPin, CheckCircle2, CircleDashed, Image as ImageIcon, MessageSquare, Send } from 'lucide-react';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchReports = () => {
    fetch("http://localhost:5000/reports")
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load reports:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !location.trim()) return;

    const payload = { description, location };

    fetch("http://localhost:5000/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(newReport => {
      setReports([newReport, ...reports]); // Depends on backend insertion logic, assuming we push locally to avoid immediate re-fetch
      setDescription("");
      setLocation("");
      setFileName("");
    })
    .catch(err => console.error("Error submitting report:", err));
  };

  const markResolved = (id) => {
    fetch(`http://localhost:5000/reports/${id}`, {
      method: "PATCH",
    })
    .then(res => {
      if(res.ok) {
        setReports(reports.map(report => 
          report.id === id ? { ...report, status: "Resolved" } : report
        ));
      }
    })
    .catch(err => console.error("Error resolving report:", err));
  };

  return (
    <div className="w-full flex-col flex max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900">Citizen Reports</h2>
        <p className="text-slate-500 text-sm mt-1">Submit waste-related issues mapping city hazards</p>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 mb-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <MessageSquare size={20} className="text-blue-500" />
          File a New Report
        </h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Issue Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the waste issue in detail..."
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none h-24"
              required
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="E.g., Central Park West Gate"
                  className="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Photo Evidence (Optional)</label>
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  accept="image/*"
                  onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                  className="hidden"
                />
                <label 
                  htmlFor="file-upload" 
                  className="w-full cursor-pointer flex items-center justify-between rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 hover:bg-slate-100 transition-colors"
                >
                  <span className="text-slate-500 truncate text-sm">
                    {fileName ? fileName : "Upload an image..."}
                  </span>
                  <ImageIcon size={18} className="text-slate-400 shrink-0" />
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-2">
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
            >
              <Send size={18} />
              Submit Report
            </button>
          </div>
        </form>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-slate-900">Recent Reports ({reports.length})</h3>
      </div>

      <div className="flex flex-col gap-4">
        {reports.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-slate-100 shadow-sm text-slate-500">
            No reports filed yet.
          </div>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 transition-shadow hover:shadow-md flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center group">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md flex items-center gap-1.5 w-fit
                    ${report.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {report.status === "Pending" ? <CircleDashed size={14} /> : <CheckCircle2 size={14} />}
                    {report.status}
                  </span>
                </div>
                <p className="text-slate-800 font-medium leading-relaxed">{report.description}</p>
                <div className="flex items-center text-slate-500 text-sm gap-1.5">
                  <MapPin size={16} className="text-slate-400" />
                  {report.location}
                </div>
              </div>

              {report.status === "Pending" && (
                <button
                  onClick={() => markResolved(report.id)}
                  className="mt-2 sm:mt-0 px-4 py-2 h-fit bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-600 hover:text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={16} />
                  Mark Resolved
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;
