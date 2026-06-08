import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ProductsPage from '../components/ProductsPage';
import ViniloDetailPage from '../pages/ViniloDetailPage';

export const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout />,
        children:[
            {
                index: true,
                element: <Home />
            }
            ,
            {
                path: "discos",
                element: <ProductsPage />
            }
            ,
            {
                path: "vinilos/:id",
                element: <ViniloDetailPage />
            }
        ]
    }
])