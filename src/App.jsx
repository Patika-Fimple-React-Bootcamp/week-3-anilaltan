import { ProductsProvider } from "./context/productsContext";
import ProductsList from "./components/ProductsList";
import "./App.css";

function App() {
  return (
    <>
      <ProductsProvider>
        <ProductsList />
      </ProductsProvider>
    </>
  );
}

export default App;
