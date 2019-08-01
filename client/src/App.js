import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const apiCall = async () => {
    try {
      const res = await axios.get("http://localhost:3001/lol");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // apiCall();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
