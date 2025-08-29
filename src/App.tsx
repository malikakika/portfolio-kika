import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './components/About';
import Header from './components/Header';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';


export default function App() {
  return (
    <>
     <CursorGlow /> 
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}