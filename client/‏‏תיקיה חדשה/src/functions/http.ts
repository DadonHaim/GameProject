import Global from "../Global" 

function Get(api: string ,options = {}){
    return new Promise((resolve , reject)=>{
        fetch(Global.Global.Url+api ,options)
        .then(response=>response.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

function Post(api: string ,options = {}){
    return new Promise((resolve , reject)=>{
        fetch(Global.Global.Url+api ,{
            method:"post",
            ...options
        })
        .then(response=>response.json())
        .then(data => resolve(data))
        .catch(err => reject(err)) 
   })
}

export default {Get,Post}