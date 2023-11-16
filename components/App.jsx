import { useState, useEffect } from 'react'
import LogRegHeader  from './LogRegHeader'
import LoginMain  from './LoginMain'
import RegisterMain from './RegisterMain'
import '../styles/App.css'

export default function App() {
  return (
    <>
      <LogRegHeader />
      <RegisterMain />
    </>
  )
}
