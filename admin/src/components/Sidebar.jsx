import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets/assets'
import { DoctorContext } from '../context/DoctorContext'

/**
 * Sidebar component that renders a navigation menu based on the user's role.
 * 
 * - If the user has an admin token (`aToken`), the admin-specific navigation menu is displayed.
 * - If the user has a doctor token (`dToken`), the doctor-specific navigation menu is displayed.
 * 
 * The component uses `useContext` to access the `AdminContext` and `DoctorContext` for determining
 * the user's role and rendering the appropriate menu.
 * 
 * Each menu item is a `NavLink` that navigates to a specific route and highlights the active link.
 * 
 * @component
 * @returns {JSX.Element} The Sidebar component with role-based navigation menus.
 */
const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-whilte border-r'>
      {
        aToken && <ul className='text-[#515151] mt-5'>

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/admin-dashboard'}>
            <img src={assets.home_icon} alt='' />
            <p className='hidden md:block'>Dashboard</p>
         </NavLink>

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/all-appointments'}>
            <img src={assets.appointment_icon} alt='' />
            <p className='hidden md:block'>Appointments</p>
         </NavLink>

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/add-doctor'}>
            <img src={assets.add_icon} alt='' />
            <p className='hidden md:block'>Add Doctor</p>
         </NavLink>

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/doctor-list'}>
            <img src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Doctor List</p>
         </NavLink>

        </ul>
      }
       {
        dToken && <ul className='text-[#515151] mt-5'>

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/doctor-dashboard'}>
            <img src={assets.home_icon} alt='' />
            <p className='hidden md:block'>Dashboard</p>
         </NavLink>

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/doctor-appointment'}>
            <img src={assets.appointment_icon} alt='' />
            <p className='hidden md:block'>Appointments</p>
         </NavLink>

         <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? `bg-[#F3F3FF] border-r-4 border -[#5F6FFF]` : ``} `} to={'/doctor-profile'}>
            <img src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Profile</p>
         </NavLink>

        </ul>
      }
    </div>
  )
}

export default Sidebar
