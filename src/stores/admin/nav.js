import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import NavAPI from '@/api/NavAPI'

const useNavStore = defineStore('nav', () => {
    const data = reactive({
        id: 0, //默认值
        level: 1, //默认层级
        parentId: 0,
        pageAdd: false, //默认不显示 - 添加页
        pageEdit: false
    })

    const listData = reactive({
        path: [],
        list: []
    })

    const update = (path,parentId) => { //更新
        if(path === null){
            data.level = 1
        }else{
            data.level = path.length + 1
        }
        data.parentId = parentId
    }

    const getList = (parentId) => {
        NavAPI.getListByParentId(parentId).then(result => {
            if(!result.status){
                ElMessage.error(result.msg)
                return
            }
            listData.path = result.data.path //重置
            listData.list = result.data.list
        }).catch(err => {
            console.log("err:", err)
        })
    }

    return {
        data,
        listData,
        update,
        getList
    }
})

export { useNavStore }