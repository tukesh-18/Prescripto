import React, { useContext } from 'react'
import {assets} from "../assets/assets/assets"
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

/**
 * Navbar component that displays a navigation bar with a logo, user role indicator, 
 * and a logout button. It handles user logout functionality for both Admin and Doctor roles.
 *
 * @component
 * @returns {JSX.Element} The rendered Navbar component.
 *
 * @description
 * - Uses `AdminContext` and `DoctorContext` to manage authentication tokens.
 * - Provides a logout button that clears tokens from both state and localStorage.
 * - Redirects the user to the home page upon logout.
 *
 * @dependencies
 * - `useContext` from React for accessing context values.
 * - `useNavigate` from React Router for navigation.
 *
 * @example
 * <Navbar />
 */
const Navbar = () => {
 
    const {aToken, SetAToken} = useContext(AdminContext)
    const {dToken,SetDToken} = useContext(DoctorContext)

     const navigate = useNavigate()

    const Logout = () => {
        navigate('/')
        aToken && SetAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && SetDToken('')
        dToken && localStorage.removeItem('dToken')
    }

return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs' >
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="Admin Logo" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={Logout} className='bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
)
}

export default Navbar
