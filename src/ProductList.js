import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ProductCard from "./components/ProductCard";

const dateConvert = 1000 * 60;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var pageIndex = 1;

function App() {
  const [currentData, setCurrentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () =>  window.removeEventListener('scroll', handleScroll);
  });

  function handleScroll() {
    if (document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) < 10) {
      setFetching(true);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (fetching) {
      pageIndex += 1;
      setLoading(true);
      fetchData();
    }
  }, [fetching]);

  function fetchData() {
    fetch(`http://localhost:8000/products?_page=${pageIndex}&_limit=20`)
    .then((response) => {
      if(!response.ok) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`);
      }
      return response.json();
    })
    .then((newData) => {
      setCurrentData(currentState => ([...currentState, ...newData]));
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
      setCurrentData(null);
    })
    .finally(() => {
      setLoading(false);
    });
    setFetching(false);
  }

  function formatPrice(price) {
    return price.toFixed(2)
  }
  
  function formatDate(dateString) {
    const postDate = new Date(dateString);
    const currentDate = new Date(Date.now());
    const diffMin = (currentDate - postDate.getTime()) / dateConvert;

    // seconds
    if (diffMin < 1) {
      return "A few seconds ago"
    }
    // minutes
    else if (diffMin < 60) {
      return diffMin.toFixed() + " minute" + (diffMin > 1 && diffMin < 2 ? "" : "s") + " ago"
    }
    // hours
    else if (diffMin < 1440) {
      return (diffMin / 60).toFixed() + " hour" + (diffMin >= 60 && diffMin < 120 ? "" : "s") + " ago"
    }
    // days
    else if (diffMin < 10080) {
      return (diffMin / 60 / 24).toFixed() + " day" + (diffMin >= 1440 && diffMin < 2880 ? "" : "s") + " ago"
    }
    else {
      return monthNames[postDate.getMonth()] + " " + postDate.getDate() + ", " + postDate.getFullYear();
    }
  }

  return (
    <>
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
      {loading && <div>Loading...</div>}
      {error && <div>An error was encountered</div>}
    </>
  );
}

export default App;