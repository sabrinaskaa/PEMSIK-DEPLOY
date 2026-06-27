import { useState } from "react";
import Login from "@/Pages/Auth/Login/Login";
import Mahasiswa from "@/Pages/Admin/Mahasiswa/Mahasiswa";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <Mahasiswa onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <Login onLoginSuccess={() => setIsLoggedIn(true)} />
  );
};

export default App;
