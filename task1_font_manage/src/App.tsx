import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/font_management/Home';
import FontLayout from './layout/FontLayout';
import FontUploader from './pages/font_management/FontUploader';
import FontUploaderWithGroup from './pages/font_management/FontGroupUpload';


function App() {
  return (
   <>
   <BrowserRouter>
   <main>
      <FontLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/fontuploader' element={<FontUploader/>}/>
          <Route path='/fontlist' element={<FontUploaderWithGroup/>}/>
        </Routes>
      </FontLayout>
   </main>
   </BrowserRouter>
   </>
  );  
}

export default App;