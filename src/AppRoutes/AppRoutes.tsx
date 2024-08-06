import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Layout from "../components/Layout/Layout";
import AuthCallbackPage from "../pages/AuthCallback";
import VisualizePage from "../pages/VisualizePage/VisualizePage";
import DataIngestion from "../pages/DataIngestion/DataIngestion";
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "*", element: <Root /> },
      { path: "/", element: <Home /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/ingest-data", element: <DataIngestion /> },
      {path:"/auth-callback" , element: <AuthCallbackPage />},
      {path:"/visualize/:id/:chartType" , element: <VisualizePage />},
    ],
  },
]);

export const AppRoutes = () => {
  return (
    <RouterProvider router={router} fallbackElement={<Root />} /> // Provide a fallback element for unmatched paths
  );
};
function Root() {
  return (
    <Routes>
      <Route element={<Layout />} />
    </Routes>
  );
}
