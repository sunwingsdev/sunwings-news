import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>
      <Provider store={Store}>
        <HelmetProvider>
          <Toaster />
          <RouterProvider router={router} />
        </HelmetProvider>
      </Provider>
    </>
  );
}

export default App;
