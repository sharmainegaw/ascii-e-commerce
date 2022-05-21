import ProductList from './components/ProductList';
import { Container } from '@mui/system';

function App() {
  return (
    <div className='App'>
      <header>
        <h1>Products Grid</h1>        
      </header>
      <Container>
        <ProductList/>
      </Container>
    </div>
  );
}

export default App;
