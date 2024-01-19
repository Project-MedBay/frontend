import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { useTranslation, Trans } from 'react-i18next';
import LogRegHeader  from './LogRegHeader'
import LoginMain  from './LoginMain'
import RegisterMain from './RegisterMain'
import Patient from './Patient'
import Therapist from './Therapist'
import Admin from './Admin'
import ForgotPassword from './ForgotPassword'
import NoMatchRoute from './NoMatchRoute'
import { ThemeProvider } from './ThemeContext';
import '../styles/App.css'

export default function App() {           // glavna komponenta, u njoj se renderaju sve ostale
   const { t, i18n } = useTranslation();

   const [language, setLanguage] = useState(() => {
      if (sessionStorage.getItem("medbay-lang") !== null) return JSON.parse(sessionStorage.getItem("medbay-lang"))
      else return {id: t("app.language"), name: t("app.languageLabel")}
   })
   const [userToken, setUserToken] = useState(() => {
      if (sessionStorage.getItem("medbay-token") !== null) {
         let token = JSON.parse(sessionStorage.getItem("medbay-token"))
         try {
            let roleFromToken = jwtDecode(token).role.toLowerCase() == "staff" ? "therapist" : jwtDecode(token).role.toLowerCase()
            if (["admin", "therapist", "patient"].includes(roleFromToken) === true) {
               return token
            }
         } catch (exc) {}        // ovaj try catch i uvjeti sluze da se ne moze rucnim namjestanjem local storagea uc u aplikaciju
      }
      return ""            // basically, u svakoj situaciji u kojoj local storage medbay-token nije validni jwt token s ulogom admin, therapist ili patient, usertoken i local storage se stavlja na ""
   })
   console.log(userToken)
   console.log(sessionStorage)
   const globalNavigate = useNavigate()
   const location = useLocation()
   const { hash, pathname, search } = location
   console.log(pathname)

   function handleLogin(token) {
      setUserToken(token)
      let navigateTo = jwtDecode(token).role.toLowerCase() == "staff" ? "therapist" : jwtDecode(token).role.toLowerCase()
      globalNavigate("/" + navigateTo)
   }

   function handleLogout() {
      setUserToken("")
      sessionStorage.removeItem("medbay-ai-chat")
   }
   
   useEffect(() => {
      if (pathname == "/" || pathname == "/login") setUserToken("")
   }, [location])
   
   useEffect(() => {
      sessionStorage.setItem("medbay-token", JSON.stringify(userToken))
      
      if (userToken == "" && !["/register", "/reset-password"].includes(pathname)) globalNavigate("/login")
   }, [userToken])

   useEffect(() => {
      sessionStorage.setItem("medbay-lang", JSON.stringify(language))
   }, [language])


  return (
      <ThemeProvider>
         <Routes>
            <Route index element={<>
               <LogRegHeader globalNavigate={globalNavigate} language={language} setLanguage={setLanguage} />
               <LoginMain handleLogin={handleLogin} globalNavigate={globalNavigate} />
            </>} />
            <Route path="/login" element={<>
               <LogRegHeader globalNavigate={globalNavigate} language={language} setLanguage={setLanguage} />
               <LoginMain handleLogin={handleLogin} globalNavigate={globalNavigate} />
            </>} />

            <Route path="/register" element={<>
               <LogRegHeader globalNavigate={globalNavigate} language={language} setLanguage={setLanguage} />
               <RegisterMain globalNavigate={globalNavigate} language={language.id} />
            </>} />

            <Route path="/patient/*" element={<Patient
               globalNavigate={globalNavigate}
               userToken={userToken}
               handleLogout={handleLogout}
               language={language}
               setLanguage={setLanguage}
            />} />

            <Route path="/therapist/*" element={<Therapist
                  globalNavigate={globalNavigate}
                  userToken={userToken}
                  handleLogout={handleLogout}
                  language={language}
                  setLanguage={setLanguage}
            />} />

            <Route path="/admin/*" element={<Admin
               globalNavigate={globalNavigate}
               userToken={userToken}
               handleLogout={handleLogout}
               language={language}
               setLanguage={setLanguage}
            />} />

            <Route path="/reset-password" element={<ForgotPassword globalNavigate={globalNavigate} />} />
            
            <Route path="/notFound" element={<NoMatchRoute back={-2} handleLogout={handleLogout} />} />
            <Route path="*" element={<NoMatchRoute back={-1} handleLogout={handleLogout} />} />
         </Routes>
      </ThemeProvider>
   )
}
