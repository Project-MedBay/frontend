import { useState, useEffect } from 'react'
import LogRegHeader  from './LogRegHeader'
import LoginMain  from './LoginMain'
import RegisterMain from './RegisterMain'
import '../styles/App.css'

export default function App() {

  const [pageName, setPageName] = useState("login")
  
  const pages = {
    login: <>
      <LogRegHeader />
      <LoginMain navigate={setPageName} />
    </>,
    register: <>
      <LogRegHeader />
      <RegisterMain navigate={setPageName} />
    </>
  }
  
  return pages[pageName]
}
