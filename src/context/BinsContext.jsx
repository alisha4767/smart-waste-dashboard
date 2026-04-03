import React, { createContext, useState, useEffect, useContext } from 'react';

const BinsContext = createContext();

const API_BASE = "https://smart-waste-dashboard-1-t2qb.onrender.com";

export const BinsProvider = ({ children }) => {
  const [binsData, setBinsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/bins`)
      .then(res => res.json())
      .then(data => {
        setBinsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching bins:", err);
        setLoading(false);
      });
  }, []);

  return (
    <BinsContext.Provider value={{ binsData, loading }}>
      {children}
    </BinsContext.Provider>
  );
};

export const useBins = () => useContext(BinsContext);
