import './App.css';
import './assets/fonts/HanaleiFill-Regular.ttf';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Episodes from './Pages/Episodes';
import Profile from './Pages/Profile';
import AboutUs from './Pages/AboutUs';
import Location from './Pages/Location';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='bg-appBG h-full'>
          <Navbar />
          <main>
            <Routes>
              <Route
                path='/'
                element={
                  <Home api='https://rickandmortyapi.com/api/character/?' />
                }
              />
              <Route path='/episodes' element={<Episodes />} />
              <Route path='/location' element={<Location />} />
              {/* <Route path='/profile' element={<Profile />} /> */}
            </Routes>
          </main>
          <footer>
            <AboutUs />
          </footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
