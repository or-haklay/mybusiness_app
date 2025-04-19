import "./App.css";
import { Route, Routes } from "react-router";

import NavBar from "./components/navbar";
import Footer from "./components/footer";

import { Toaster } from "react-hot-toast"; // 1. הוספת הספריה

import Home from "./pages/home";
import About from "./pages/about";
import SignIn from "./pages/sign-in";
import Register from "./pages/register";
import SignOut from "./pages/sign-out";
import MyCards from "./pages/my-cards";
import CreateCardPage from "./pages/makeCardPage";
import FavCards from "./pages/favCards";
import EditUser from "./pages/editUser";

import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-cards" element={<MyCards />} />
        <Route path="/create-card" element={<CreateCardPage />} />
        <Route path="/favorites" element={<FavCards />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sign-out" element={<SignOut />} />
        <Route path="/edit-user" element={<EditUser />} />
      </Routes>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
