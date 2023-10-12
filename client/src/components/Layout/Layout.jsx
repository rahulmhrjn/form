import React from 'react'
import { Toaster } from "react-hot-toast";

const Layout = ({children}) => {
  return (
    <div>
        <main style={{minHeight: "60vh"}}>{children}</main>
        <Toaster/>
    </div>
  )
}

export default Layout