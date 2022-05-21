import { useState, useEffect } from "react";

import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

import ProductCard from "./ProductCard";
import AdCard from "./AdCard";
import CustomProgress from "./CustomProgress";
import CustomMessage from "./CustomMessage";
import { formatPrice, formatDate } from "../helperFunctions";

var pageIndex = 0;

function App() {
  // for storing data
  const [currentData, setCurrentData] = useState([]);
  const [advancedData, setAdvancedData] = useState([]);
  const [adIndexData, setAdIndexData] = useState([]);
  
  const [sortingMethod, setSortingMethod] = useState("");

  // for checking states
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAd();
    fetchInitialData();
    fetchAdvancedData();
  }, [sortingMethod]);

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
      fetchAd();
    });
  }

  // for fetching data on scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () =>  window.removeEventListener('scroll', handleScroll);
  });

  function handleScroll() {
    if(!fetching) {
      if (document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop) < 100) {
        setFetching(true);
      }
    }
  }

  useEffect(() => {
    if (fetching) {
      appendData();
      if (!emptyData) {
        fetchAdvancedData();
      }
    }
  }, [fetching]);

  function appendData() {
    setCurrentData(currentState => ([...currentState, ...advancedData]));
    setLoading(false);
  }

  function fetchAdvancedData() {
    setLoading(true);
    pageIndex += 1;
    
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
      if(newData.length == 0) {
        setEmptyData(true);
      }
      setAdvancedData(newData);
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
    })
    .finally(() => {
      setFetching(false);
      fetchAd();
    });
  }

  function fetchAd() {
    do {
      var tempAdIndex = Math.floor(Math.random()*1000);
    } while(adIndexData.includes(tempAdIndex));

    setAdIndexData(currentData => ([...currentData, ...[tempAdIndex]]));
  }

  function handleChangeSortingMethod(event) {
    pageIndex = 0;
    setCurrentData([]);
    setAdvancedData([]);
    setSortingMethod(event.target.value);
    setEmptyData(false);
    setAdIndexData([]);
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
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
      </Box>

      <Grid container alignItems="stretch" spacing={4} columns={{ xs: 3, sm: 6, md: 9}}>
        {currentData &&
          currentData.map((data, index) => (
            <>
              <Grid item xs={3} key={data.id}>
                <ProductCard
                  face={data.face}
                  price={formatPrice(data.price)}
                  size={data.size}
                  date={formatDate(data.date)}/>
              </Grid>
              {
                ((index + 1) % 20 == 0) &&
                <Grid item xs={3} key={`ad_${data.id}`}>
                  <AdCard imageId={adIndexData[(index + 1)/20]}/>
                </Grid>
              }
            </>
          ))}
      </Grid>
      
      {loading && <CustomProgress />}
      {error && <CustomMessage message="An error was encountered."/>}
      {emptyData && <CustomMessage message="~ end of catalogue ~"/>}
    </>
  );
}

export default App;
