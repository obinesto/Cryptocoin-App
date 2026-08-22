import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import HomePage from "./components/HomePage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import CoinInfoPage from "./components/CoinInfoPage.jsx";
import NotFound from "./components/NotFound.jsx";
import AppErrorBoundary from "./components/AppErrorBoundary.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppErrorBoundary>
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/coin/:id" element={<CoinInfoPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
