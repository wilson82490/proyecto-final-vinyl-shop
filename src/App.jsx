import { RouterProvider } from "react-router-dom";
import { ProductsProvider } from "./context/ProductsProvider";
import { CartProvider } from "./context/CartProvider";
import { AuthProvider } from "./context/AuthProvider";
import { router } from "./routes/router";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;