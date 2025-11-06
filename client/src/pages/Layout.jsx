import React from 'react'
import { Outlet } from 'react-router-dom'

const Layouts = () => {
  return (
    <div>
      <h1>Layouts pages</h1>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layouts