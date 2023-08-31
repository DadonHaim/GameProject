export default function Debug(string){ 
    if(process.env.HAIM.trim() === 'build'){
        let file = __filename.split('\\')
        let index = file.length-1
            console.log( `Debug:\t ${file[index-2]}\\${file[index-1]}\\${file[index]}:\t ${string}` )
    }

}