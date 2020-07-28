import axios from 'axios';

//获取所有用户
let list = (data) => axios.get('/user/list', { params: data });

let info = (id) => axios.get('/user/', { params: id })

let edit = (id, data) => axios.put(`/user/${id}`, data)

let del = (id) => axios.delete(`/user/${id}`)

export default {
	list,
	info,
	edit,
	del,
}