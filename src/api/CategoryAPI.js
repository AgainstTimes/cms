import Axios from '@/utils/Axios.js'

//获取单条记录
const getById = (id) => {
    return Axios.get(`/api/category/getById?id=${id}`)
}

//获取列表
const getListByParentId = (parent_id) => {
    return Axios.get(`/api/category/getListByParentId?parent_id=${parent_id}`)
}

//添加
const add = (data) => {
    return Axios.post('/api/category/add',data)
}

//编辑
const edit = (data) => {
    return Axios.post('/api/category/edit',data)
}

//删除
const del = (id) => {
    return Axios.post("/api/category/del",{id: id})
}

export default { getById,getListByParentId,add,edit,del }