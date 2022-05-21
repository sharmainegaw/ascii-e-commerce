import ProductList from './components/ProductList';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className='App'>
      <header>
        <Container sx={{ padding: 8 }}>
          <Typography align='center' variant="h4" color="secondary">
            Products Grid
          </Typography>
        </Container>
      </header>
      <Container>
        <ProductList/>
      </Container>
    </div>
  );
}

export default App;
