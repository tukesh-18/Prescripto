import { createContext, useState } from "react"
import axios from "axios"
import {toast} from "react-toastify"


export const AdminContext = createContext();

/**
 * AdminContextProvider component provides context for managing admin-related data and actions.
 * It includes state and functions for handling authentication tokens, doctors, appointments, 
 * dashboard data, and various admin operations.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components that will have access to the context.
 *
 * @context
 * @property {string} aToken - The admin authentication token retrieved from localStorage.
 * @property {Function} SetAToken - Function to update the admin authentication token.
 * @property {string} backendUrl - The base URL for backend API requests.
 * @property {Array} doctors - List of doctors fetched from the backend.
 * @property {Function} getAllDoctors - Function to fetch all doctors from the backend.
 * @property {Function} ChangeAvailability - Function to toggle the availability of a doctor.
 * @property {Array} appointments - List of appointments fetched from the backend.
 * @property {Function} SetAppointments - Function to update the list of appointments.
 * @property {Function} getAllAppointments - Function to fetch all appointments from the backend.
 * @property {Function} cancelAppointment - Function to cancel an appointment by its ID.
 * @property {boolean|Object} dashData - Data for the admin dashboard.
 * @property {Function} getDashData - Function to fetch dashboard data from the backend.
 */
const AdminContextProvider = (props) => {

    const [aToken, SetAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken'): "")
    const [doctors, SetDoctors] = useState([])
    const [appointments, SetAppointments] = useState([]);
    const [dashData, SetdashData]= useState(false)

    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () =>{
        try {
            const {data} = await axios.post(backendUrl + `/api/admin/all-doctors`, {} , {headers: {aToken}})
 
             if(data.success){
                SetDoctors(data.doctors)
                console.log(data.doctors)
             } else{
                toast.error(data.message)
             }          

        } catch (error) {
            toast.error(error.message)
            console.error(error)
        }
    }

    const ChangeAvailability = async (docId) =>{
        try {

            const {data} = await axios.post(backendUrl + `/api/admin/change-availability`, {docId}, {headers: {aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors();
            } else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{aToken}})
             console.log(data)
            if(data.success){
                SetAppointments(data.appointments)
                console.log(data.appointments)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const cancelAppointment = async(appointmentId) =>{
        try {
            
       const {data} = await axios.post(backendUrl+ '/api/admin/cancel-appointment', {appointmentId}, {headers:{aToken}})

       if(data.success){
        toast.success(data.message)
        getAllAppointments();
       }else{
        toast.error(data.message)
       }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const getDashData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+ "/api/admin/dashboard", {headers:{aToken}})

            if(data.success){
                SetdashData(data.dashData)
                console.log(data.dashData);

            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }
 
    const value = {
        // your context values will go here
        aToken,
        SetAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        ChangeAvailability,
        appointments,
        SetAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider