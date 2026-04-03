import { reports } from '../data/db.js';

export const getReports = (req, res) => {
  try {
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching local reports", error: error.message });
  }
};

export const addReport = (req, res) => {
  try {
    const { description, location } = req.body;
    
    if (!description || !location) {
      return res.status(400).json({ message: "Description and location are required." });
    }
    
    const newReport = {
      id: "R-" + Date.now(),
      description,
      location,
      status: "Pending",
      createdAt: new Date().toISOString()
    };
    
    reports.unshift(newReport); // Force natively onto the front mimicking descending sorting
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: "Error caching report payload natively", error: error.message });
  }
};

export const resolveReport = (req, res) => {
  try {
    const { id } = req.params;
    const reportIndex = reports.findIndex(r => r.id === id);
    
    if (reportIndex === -1) {
      return res.status(404).json({ message: "Report object not tracked internally" });
    }
    
    reports[reportIndex].status = "Resolved";
    res.status(200).json(reports[reportIndex]);
  } catch (error) {
    res.status(500).json({ message: "Error patching index status", error: error.message });
  }
};
