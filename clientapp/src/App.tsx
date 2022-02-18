import React, { useState } from "react";
import { Container } from "@mui/material";
import "./App.css";
import Header from "./components/navigation/Header";
import { Route, Routes } from "react-router-dom";
import CakeCatalog from "./components/catalog/cakes/CakeCatalog";
import CakeDetails from "./components/catalog/cakes/CakeDetails";
import NotFound from "./components/system/NotFound";
import Admin from "./components/admin/Admin";
import AdminCakeEdit from "./components/admin/AdminCakeEdit";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? "dark" : "light";

  const themeSelected = createTheme({
    palette: {
      mode: palleteType,
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={themeSelected}>
      <ToastContainer position="bottom-right" theme="colored" hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Container>
        <Routes>
          <Route path="/" element={<CakeCatalog />} />
          <Route path="/catalog/cakes" element={<CakeCatalog />} />
          <Route path="/catalog/cakes/:id" element={<CakeDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/cakes/" element={<AdminCakeEdit />} />
          <Route path="/admin/cakes/:id" element={<AdminCakeEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
