import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

const dateConvert = 1000 * 60;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var pageIndex = 0;

function App() {
  const [currentData, setCurrentData] = useState([]);
  const [advancedData, setAdvancedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [sortingMethod, setSortingMethod] = useState("");

  useEffect(() => {
    fetchData();
  }, [sortingMethod]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () =>  window.removeEventListener('scroll', handleScroll);
  });

  function handleScroll() {
    if(!fetching) {
      if (document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) < 10) {
        setFetching(true);
      }
    }
  }

  useEffect(() => {
    if (fetching) {
      fetchData();
    }
  }, [fetching]);

  function fetchData() {
    pageIndex += 1;
    setLoading(true);
    
    const url = `http://localhost:8000/products?_page=${pageIndex}&_limit=20${sortingMethod ? `&_sort=${sortingMethod}` : ``}`;
    fetch(url)
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
      setFetching(false);
    });
  }

  function handleChangeSortingMethod(event) {
    pageIndex = 0;
    setSortingMethod(event.target.value);
    setCurrentData([]);
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
      return diffMin.toString().split(".")[0] + " minute" + (diffMin > 1 && diffMin < 2 ? "" : "s") + " ago"
    }
    // hours
    else if (diffMin < 1440) {
      return (diffMin / 60).toString().split(".")[0] + " hour" + (diffMin >= 60 && diffMin < 120 ? "" : "s") + " ago"
    }
    // days
    else if (diffMin < 10080) {
      return (diffMin / 60 / 24).toString().split(".")[0] + " day" + (diffMin >= 1440 && diffMin < 2880 ? "" : "s") + " ago"
    }
    else {
      return monthNames[postDate.getMonth()] + " " + postDate.getDate() + ", " + postDate.getFullYear();
    }
  }

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="sort-select-label">Sort</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortingMethod}
          label="Sorting"
          onChange={handleChangeSortingMethod}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="size">Size</MenuItem>
          <MenuItem value="id">Id</MenuItem>
        </Select>
      </FormControl>

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
      {loading && <CircularProgress />}
      {error && <div>An error was encountered</div>}
    </>
  );
}

export default App;
