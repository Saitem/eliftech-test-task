import axios from 'axios'

const baseUrl = 'https://eliftech-test-task.herokuapp.com/api'

const API = {
    getAll: () => {
        return axios.get(baseUrl)
            .then(res => res)
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
                return err.response.data
            })
    },
    signup: (user) => {
        return axios.post(baseUrl + '/signup', user)
            .then(res => {
                return res.data
            }).catch(err => {
                return err.response.data 
            })
    },
    createMortgage: (user_id, mortgage, token) => {
        return axios.post(baseUrl + '/mortgage' + user_id, mortgage, { headers: { 'access_token': token } })
            .then(res => {
                return res.data
            }).catch(err => {
                return err
            })
    },
    getMortgageHistory: (user_id, token) => {
        return axios.get(baseUrl + '/mortgage' + user_id, { headers: { 'access_token': token } })
            .then(res => {
                return res.data
            }).catch(err => { 
                return err
            })
    },
    removeMortgageHistory: (user_id, id, token) => {
        return axios.delete(`${baseUrl}/mortgage/${user_id}/${id}`, { headers: { 'access_token': token } })
        .then(res => {
            return res
        }).catch(err => { 
            return err
        })
    }
}

export default API