import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

async function addTicket(data) {
    return await axios.post(API_URL + '/tickets/add', data, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
}

async function updateTicket(data, id) {
    return await axios.put(API_URL + '/tickets/' + id, data, {
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem("token")
        }
    })
}

async function  getTickets(pageIndex, pageSize, sortType, sortDirection, searchKeyword) {
    return await axios.get(API_URL + '/tickets', {
        params: {
            pageSize: pageSize,
            pageIndex: pageIndex,
            sortType: sortType,
            sortDirection: sortDirection,
            searchKeyword: searchKeyword
        },
        headers: {'authorization': 'Bearer ' + localStorage.getItem("token")}
    })
}

async function resolveTicket(_id) {
    return await axios.get(API_URL + `/tickets/resolve/${_id}`, {
        params: {
            _id:_id
        },
        headers: {'authorization': 'Bearer ' + localStorage.getItem("token")}
    })
}

export {
    addTicket, getTickets, resolveTicket, updateTicket
}