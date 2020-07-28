import axios from 'axios';

// 登录
let login = (data) => axios.post('/admin/login',data);

//注册
let register = (data) => axios.post('/admin/register',data);

//个人资料get方法
let info = (data) => axios.get('/admin/info',{ params: data });

//管理员列表get方法
let list = (data) => axios.get('/admin/list',{ params: data });

//管理员编辑
let edit = (data) => axios.post('/admin/info',data);

//删除用户
let del = (data) => axios.post('/admin/delete',data);

export default  {
	login,
	register,
	info,
	list,
	edit,
	del,
	
	
}