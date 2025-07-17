import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Navbar from './components/Navbar';
import Wishlist from './pages/Wishlist';
function App() {
  return (
    <>
    <BrowserRouter>
    <main>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/book/:id' element={<BookDetail/>}/>
         <Route path='/wishlist' element={<Wishlist/>}/>
      </Routes>
    </main>
    </BrowserRouter>
    </>

  );  
}

export default App;