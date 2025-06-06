import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import HomePage from "./routes/HomePage.jsx";
import AboutPage from "./routes/AboutPage.jsx";
import CoinInfoPage from "./routes/CoinInfoPage.jsx";
import NotFound from "./routes/NotFound.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/coin/:id" element={<CoinInfoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
