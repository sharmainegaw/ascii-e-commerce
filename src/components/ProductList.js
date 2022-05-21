import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { formatPrice, formatDate } from "../helperFunctions";

var pageIndex = 0;

function App() {
  const [currentData, setCurrentData] = useState([]);
  const [advancedData, setAdvancedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [sortingMethod, setSortingMethod] = useState("");
  const [emptyData, setEmptyData] = useState(false);

  useEffect(() => {
    fetchInitialData();
    fetchAdvancedData();
  }, [sortingMethod]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () =>  window.removeEventListener('scroll', handleScroll);
  });

  function handleScroll() {
    if(!fetching) {
      if (document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) < 30) {
        setFetching(true);
      }
    }
  }

  useEffect(() => {
    if (fetching) {
      appendData();
      fetchAdvancedData();
    }
  }, [fetching]);

  function fetchInitialData() {
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
      setCurrentData(newData);
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

  function appendData() {
    setCurrentData(currentState => ([...currentState, ...advancedData]));
  }

  function fetchAdvancedData() {
    pageIndex += 1;
    setLoading(true);
    
    const url = `http://localhost:8000/products?_page=${pageIndex}&_limit=20${sortingMethod ? `&_sort=${sortingMethod}` : ``}`;
    console.log(url);
    fetch(url)
    .then((response) => {
      if(!response.ok) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`);
      }
      return response.json();
    })
    .then((newData) => {
      if(newData.length != 0) {
        setAdvancedData(newData);
        setError(null);
      }
      else {
        setEmptyData(true);
        setError(null);
      }
    })
    .catch((err) => {
      setError(err.message);
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
    setEmptyData(false);
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
      {emptyData && <div>~ end of catalogue ~</div>}
    </>
  );
}

export default App;
