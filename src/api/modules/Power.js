import axios from 'axios';

//获取所有管理员
let list = (data) => axios.get('/role/list', { params: data });

//添加角色
let insert = (data) => axios.post('/role', data);
//删除角色
let remove = (id) => axios.delete(`/role/${id}`);

//编辑角色
let edit = (id,data) => axios.delete(`/role/${id}`,data);

export default {
	list,
	insert,
	remove,
	edit,
	
}