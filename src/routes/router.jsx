import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ViniloPage from '../pages/ViniloPage';
import ViniloDetailPage from '../pages/ViniloDetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import AdminLayout from '../layouts/AdminLayout';
import AdminVinilosPage from '../pages/admin/AdminVinilosPage';
/* import ProductsPage from '../components/ProductsPage'; */
import DashboardPage from '../pages/admin/DashboardPage';





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
                element: <ViniloPage />
            }
            ,
            {
                path: "vinilos/:id",
                element: <ViniloDetailPage />
            }
            ,
            {
                path: "*",
                element: <NotFoundPage />
            }
        ],


    },

    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
               index: true,
                element: <DashboardPage />
            }
            ,
            {
                path: "vinilos",
                element: <AdminVinilosPage />
            }
          
        ]

    }
]);