import { useState, useEffect } from "react";
// import Grid from '@mui/material/Grid';

function App() {
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:8000/products?_page=${pageIndex}&_limit=15`)
    .then((response) => {
      if(!response.ok) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setCurrentData(data);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setCurrentData(null);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div className='App'>
      <header>
          <h1>Products Grid</h1>

          <p>But first, a word from our sponsors:</p>
          <img
            className='ad'
            src={`http://localhost:8000/ads/?r=${Math.floor(Math.random()*1000)}`}
            alt='ad'/>
      </header>

      products goes here..
      {loading && <div>Loading...</div>}
      {error && <div>An error was encountered</div>}
      <ul>
        {currentData &&
          currentData.map(({ id, face, prize, size, date }) => (
            <li key={id}>
              <p>{face} {prize} {size} {date}</p>
            </li>
          ))}
      </ul>

    </div>
  );
}

export default App;
