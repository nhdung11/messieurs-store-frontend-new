import axios from "../utils/axios-customize";

export const callRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', { fullName, email, password, phone })
}

export const callLogin = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password })
}

export const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account')
}

export const callLogout = () => {
    return axios.post('/api/v1/auth/logout')
}

export const callFetchUser = (query) => {
    return axios.get(`/api/v1/user?${query}`)
}

export const callBulkCreateUser = (data) => {
    return axios.post('/api/v1/user/bulk-create', data)
}

export const callUpdateUser = (_id, fullName, phone, avatar) => {
    return axios.put('/api/v1/user', { _id, fullName, phone, avatar })
}
export const callDeleteUser = (id) => {
    return axios.delete(`/api/v1/user/${id}`)
}
// End API User



// API Books

export const callFetchBooks = (query) => {
    return axios.get(`/api/v1/book?${query}`)
}

export const callFetchCategory = () => {
    return axios.get('/api/v1/database/category')
}

export const callUploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book"
        },
    });
}

export const callCreateBook = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.post('/api/v1/book', {thumbnail, slider, mainText, author, price, sold, quantity, category} )
} 

export const callUpdateBook = (id, thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.put(`/api/v1/book/${id}`, {
        thumbnail, slider, mainText, author, price, sold, quantity, category
    })
}

export const callDeleteBook = (id) => {
    return axios.delete(`/api/v1/book/${id}`)
}

export const callFetchBookById = (id) => {
    return axios.get(`/api/v1/book/${id}`)
}

export const callCreateOrder = (data) => {
    return axios.post('/api/v1/order', {...data})
}


export const callUploadAvatar = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "avatar"
        },
    });
}

export const callUpdateUserInfo = (_id, phone, fullName, avatar) => {
    return axios.put('/api/v1/user', {_id, phone, fullName, avatar})
}

export const callOrderHistory = () => {
    return axios.get('/api/v1/history')
}

export const callFetchOrder = (query) => {
    return axios.get(`/api/v1/order?${query}`)
}

export const callDashboard = () => {
    return axios.get('/api/v1/database/dashboard')
}