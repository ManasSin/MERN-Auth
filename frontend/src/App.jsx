import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="bg-white">
      <Header />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
