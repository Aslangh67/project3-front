import axios from "axios";
// const URL = "http://localhost:8080";
const URL = "https://food-savers-api.herokuapp.com"

const API = {
    // User Routes __________________________________________________
    // Get all users
    getAllUsers: (query) => {
        return axios.get(`${URL}/api/user`)
    },
    // Create new user
    createUser: (userToMake) => {
        return axios.post(`${URL}/api/user/new`, userToMake);
    },
    // Get User by id
    getUserById: (id) => {
        return axios.get(`${URL}/api/user/${id}`)
    },
    // Get User by email
    checkUserEmail: (email) => {
        return axios.get(`${URL}/api/user/email/${email}`)
    },
    // Update user by id
    updateUserById: (id) => {
        return axios.put(`${URL}/api/user/${id}`)
    },
    // Delete user by id
    deleteUserById: (id) => {
        return axios.delete(`${URL}/api/user/${id}`)
    },
    // Inventory Routes___________________________________________
    // Get all Inventory
    getAllInventory: (locationId) => {
        return axios.get(`${URL}/api/inventory/all/${locationId}`)
    },
    // Create new inventory
    createInventory: (inventoryToMake) => {
        return axios.post(`${URL}/api/inventory/new`, inventoryToMake);
    },
    // Get Inventory by id
    getInventoryById: (id) => {
        return axios.get(`${URL}/api/inventory/${id}`)
    },
    // Update inventory by id
    updateInventoryById: (itemInfo) => {
        return axios.put(`${URL}/api/inventory/update`, itemInfo)
    },
    // Update inventory bulk
    updateInventoryBulk: (itemInfo) => {
        return axios.put(`${URL}/api/inventory/update/bulk`, itemInfo)
    },
    // Delete inventory by id
    deleteInventoryById: (id) => {
        return axios.delete(`${URL}/api/inventory/${id}`)
    },

    //  Location Routes___________________________________________
    // Get all Locations
    getAllLocation: (cityToSearch) => {
        return axios.get(`${URL}/api/location/all/${cityToSearch}`)
    },
    // Create new location
    createLocation: (locationToMake) => {
        return axios.post(`${URL}/api/location/new`, locationToMake);
    },
    // Get location by id
    getLocationById: (id) => {
        return axios.get(`${URL}/api/location/${id}`)
    },
    // Update location by id
    updateLocationById: (id) => {
        return axios.put(`${URL}/api/location/${id}`)
    },
    // Delete location by id
    deleteLocationById: (id) => {
        return axios.delete(`${URL}/api/location/${id}`)
    },

    //  Schedule Routes___________________________________________
    // Get all Schedules
    getAllSchedule: () => {
        return axios.get(`${URL}/api/schedule`)
    },
    // Create new schedule
    createSchedule: (scheduleToMake) => {
        return axios.post(`${URL}/api/schedule/new`, scheduleToMake);
    },
    // Get schedule by id
    getScheduleById: (id) => {
        return axios.get(`${URL}/api/schedule/${id}`)
    },
    // Update schedule by id
    updateScheduleById: (id) => {
        return axios.put(`${URL}/api/schedule/${id}`)
    },
    // Delete schedule by id
    deleteScheduleById: (id) => {
        return axios.delete(`${URL}/api/schedule/${id}`)
    },
    //  Donation Routes___________________________________________
    // Get all Donations
    getAllDonation: () => {
        return axios.get(`${URL}/api/donation`)
    },
    // Create new donation
    createDonation: (donationToMake) => {
        return axios.post(`${URL}/api/donation/new`, donationToMake);
    },
    // Get donation by id
    getDonationById: (id) => {
        return axios.get(`${URL}/api/donation/${id}`)
    },
    // Update donation by id
    updateDonationById: (id) => {
        return axios.put(`${URL}/api/donation/${id}`)
    },
    // Delete donation by id
    deleteDonationById: (id) => {
        return axios.delete(`${URL}/api/donation/${id}`)
    },

//  Company Routes___________________________________________
    // Get all Companies
    getAllCompany: () => {
        return axios.get(`${URL}/api/company`)
    },
    // Create new company
    createCompany: (companyToMake) => {
        return axios.post(`${URL}/api/company/new`, companyToMake);
    },
    // Get company by id
    getCompanyById: (id) => {
        return axios.get(`${URL}/api/company/${id}`)
    },
    // Update company by id
    updateCompanyById: (id) => {
        return axios.put(`${URL}/api/company/${id}`)
    },
    // Delete company by id
    deleteCompanyById: (id) => {
        return axios.delete(`${URL}/api/company/${id}`)
    },

// User Authentication __________________________________________________
    logIn: (user) => {
        return axios.post(`${URL}/api/auth/login`, user, { withCredentials: true })
    },
    // isAuthenticated: () => {
    //     return axios.get(`${URL}/api/auth/loggedinuser`, { withCredentials: true });
    // }
    logOut: () => {
        return axios.get(`${URL}/api/auth/logout`, { withCredentials: true })
    },
    verifyLogin:()=>{
        return axios.get(`${URL}/api/auth/verifylogin`,{withCredentials:true});
    },
    
    // External API Calls ________________________________________________________
    // checking the EIN number
    einChecker:(einToCheck) => {
        return axios.get(`${URL}/api/company/ein/${einToCheck}`);
    }
}
export default API