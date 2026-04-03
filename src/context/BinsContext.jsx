import React, { createContext, useState, useEffect, useContext } from 'react';

const BinsContext = createContext();

export const BinsProvider = ({ children }) => {
  const [binsData, setBinsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/bins")
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
