export default function Debug(string){ 
    if(
        // process.env.npm_lifecycle_event === 'Debug' ||
        process.env.npm_lifecycle_event === 'DebugTest' 
    ){
        let file = __filename.split('\\')
        let index = file.length-1
        console.log( `Debug:\t ${file[index-2]}\\${file[index-1]}\\${file[index]}:\t ${string}` )
    }

}