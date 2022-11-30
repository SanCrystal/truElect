import React from 'react'
import Navbar from './sections/navbar/Navbar';
import Header from './sections/header/Header';
import Footer from './sections/footer/Footer';
import Theme from './theme/Theme';
import { useThemeContext } from './context/theme-context';
import Howitworks from './sections/howitworks/Howitworks';
import Support from './sections/support/Support';
import { useStorageContext } from './context/storageContext';
const App = () => {
  const {themeState} = useThemeContext()
  const {userProfile,GetUserProfile,UploadUserProfile} = useStorageContext()
  
  return (
    <main className={`${themeState.primary} ${themeState.background}`} >
     <Navbar/>
     <Header/>
     <Howitworks/>
     <Support/>
     <Footer/>  
     <Theme/>
    </main>
  )
}

export default App