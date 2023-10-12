import React from 'react'

import { useAuth } from "../context/auth"


const HomePage = () => {
    const [auth, setAuth] = useAuth()
  return (
   <>
        
        <pre>{JSON.stringify(auth, null, 4)}</pre>
        </>
  )
}

export default HomePage