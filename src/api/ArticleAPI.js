import Axios from '@/utils/Axios.js'

//获取单条记录
const getById = (id) => {
    return Axios.get(`/api/article/getById?id=${id}`)
}

//获取列表 - 分页
const pageList = (page, pageSize) => {
    return Axios.get(`/api/article/pageList?page=${page}&pageSize=${pageSize}`)
}

//添加
const add = (data) => {
    return Axios.post('/api/article/add', data)
}

//编辑
const edit = (data) => {
    return Axios.post('/api/article/edit', data)
}

//删除
const del = (id) => {
    return Axios.post("/api/article/del", {id: id})
}

//上传图片
const uploadImg = (data) => {
    return Axios.postFile('/api/article/uploadImg', data)
}

//wangEditor - 上传图片
const editorUploadImg = (data) => {
    return Axios.postFile('/api/article/wangEditor/uploadImg', data)
}

export default {getById, pageList, add, edit, del, uploadImg, editorUploadImg}