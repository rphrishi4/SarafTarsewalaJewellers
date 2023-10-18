import React, { useState, useEffect } from 'react';

const BarScanner = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      // Fetch data from the API 
      const response = await fetch('https://api.metalpriceapi.com/v1/latest?api_key=e6bee55a152e9b7a0532e8ad5&base=USD&currencies=INR,XAU,XAG');
      const newData = await response.json();
      
      // Update the state with the fetched data
      setData(newData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Initial data fetch when the component mounts
  useEffect(() => {
    fetchData();

    // Set up an interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Auto-Refreshing Data</h1>
      {data ? (
        // Render the fetched data
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        // Show loading or error message
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default BarScanner;