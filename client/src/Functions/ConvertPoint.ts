export default function ConvertPoint(str?:string):number[]{
    if(!str) return [0,0]
    let arr = str.split(',')

    return [
        Number.parseInt(arr[0]) ,
        Number.parseInt(arr[1]) 
    ]
}