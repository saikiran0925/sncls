import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Formatter from "./pages/Formatter";
import DiffEditorWrapper from "./pages/DiffEditor";
import BlankSpace from "./pages/BlankSpace";
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
        path: "blankspace",
        element: <BlankSpace />,
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
