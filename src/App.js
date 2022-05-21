import ProductList from './components/ProductList';
import { Container } from '@mui/system';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className='App'>
      <header>
        <Container>
          <Typography variant="h5" color="secondary">
            <h1>Products Grid</h1>
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
