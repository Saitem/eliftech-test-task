import axios from 'axios'

const baseUrl = 'http://localhost:5000'

const API = {
    getAll: () => {
        return axios.get(baseUrl)
            .then(res => res.data)
            .catch(err => err)
    },
    create: (bank) => {
        return axios.post(baseUrl + '/create', bank)
            .then(res => res.data)
            .catch(err => err)
    },
    remove: (id) => {
        return axios.delete(baseUrl + '/remove/' + id)
            .then(res => res)
            .catch(err => err)
    }, 
    edit: (id, bank) => {
        return axios.put(baseUrl + '/edit/' + id, bank)
            .then(res => res)
            .catch(err => err)
    },
    signin: (user) => {
        return axios.post(baseUrl + '/signin', user)
            .then(res => {
                if(res.status === 200) {
                    return res.data
                }
            }).catch(err => {
                console.log(err)
            })
    },
    signup: (user) => {
        return axios.post(baseUrl + '/signup', user)
            .then(res => {
                return res
            }).catch(() => {
                return 400
            })
    }
}

export default API