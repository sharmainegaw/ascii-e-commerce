import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ProductCard from "./components/ProductCard";

const dateConvert = 1000 * 3600 * 24;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
  

  function formatPrice(price) {
    return price.toFixed(2)
  }
  
  function formatDate(dateString) {
    const postDate = new Date(new Date(dateString).toDateString());
    const currentDate = new Date(new Date(Date.now()).toDateString());
    const deltaDays = ((currentDate - postDate.getTime()) / dateConvert).toFixed();

    return deltaDays == 1 ? deltaDays + " day ago" : deltaDays <= 7 ?
      deltaDays + " days ago" :
      monthNames[postDate.getMonth()] + " " + postDate.getDate() + ", " + postDate.getFullYear();
  }

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

      {loading && <div>Loading...</div>}
      {error && <div>An error was encountered</div>}

      <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 8, lg: 10 }}>
        {currentData &&
          currentData.map(({ id, face, price, size, date }) => (
            <Grid item xs={2} key={id}>
              <ProductCard
                face={face}
                price={formatPrice(price)}
                size={size}
                date={formatDate(date)}/>
            </Grid>
          ))}
      </Grid>

    </div>
  );
}

export default App;
