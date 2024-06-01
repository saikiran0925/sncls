import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Formatter from "./pages/Formatter";
import Decoder from "./pages/Decoder";
import DiffEditorWrapper from "./pages/DiffEditor";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Formatter />,
      },
      {
        path: "diffeditor",
        element: <DiffEditorWrapper />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
