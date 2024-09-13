import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function AddDoc() {
  return <>    
  <h2>Nytt dokument</h2>
      <form method="POST" action="/" class="new-doc">
        <label for="title">Titel</label>
        <input type="text" name="title"/>

        <input type="submit" value="Skapa" />
      </form>
</>
}


function MuminComponent() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3001/json');
        // const response = await fetch('https://trafik.emilfolino.se/stations');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Mumin Data</h1>
      <ul>
        {data.data.map((item, index) => (
          // <li key={index}>{item.AdvertisedLocationName}</li>
          <li key={index}>{item.namn}</li> 
        ))}
      </ul>
    </div>
  );
}

function showData() {
  <></>
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <MuminComponent />
      </header>
    </div>
  );
}

export default App;
