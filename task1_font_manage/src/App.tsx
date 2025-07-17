import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/dashboard/Home';
import DashboardLayout from './layout/DashboardLayout';
import FontUploader from './pages/dashboard/FontUploader';
import FontUploaderWithGroup from './pages/dashboard/FontGroupUpload';


function App() {
  return (
   <>
   <BrowserRouter>
   <main>
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path='/dashboard/fontuploader' element={<FontUploader/>}/>
          <Route path='/dashboard/fontlist' element={<FontUploaderWithGroup/>}/>
        </Routes>
      </DashboardLayout>
   </main>
   </BrowserRouter>
   </>
  );  
}

export default App;