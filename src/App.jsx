import { RouterProvider } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsProvider";
import { router } from "./routes/router";

function App() {
  return (
    <ProductsProvider>
      <RouterProvider router={router} />
    </ProductsProvider>
  );
}

export default App;