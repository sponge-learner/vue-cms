import axios from 'axios';

//获取所有文章
let list = (data) => axios.get('/article/list', { params: data });

let detail = (data) => axios.get('/article/detail', { params: data });

let edit = (data) => axios.post('/article/edit', data);

let release = (data) => axios.post('/article/add', data);

let remove = (data) => axios.post('/article/delete', data);




export default {
	list,
	detail,
	edit,
	release,
	remove,

}
