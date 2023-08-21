import Global from "../Globals/Global"

export function Get(api: string ,options = {}){
    return new Promise((resolve , reject)=>{
        fetch(Global.Url+api ,options)
        .then(response=>response.json())
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

export function Post(api: string ,options = {}){
    return new Promise((resolve , reject)=>{
        fetch(Global.Url+api ,{
            method:"post",
            ...options
        })
        .then(response=>response.json())
        .then(data => resolve(data))
        .catch(err => reject(err)) 
   })
}

