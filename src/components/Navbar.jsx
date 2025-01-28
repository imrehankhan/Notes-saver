import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-center gap-6 text-purple-400'>
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/pastes">
        Pastes
      </NavLink>
    </div>
  )
}

export default Navbar