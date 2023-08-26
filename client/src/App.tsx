import {selector,Action,Store} from "./import"

export default function App(){
    let  isLogin = selector((store:IStore)=>store.start.isLogin)
    return (
        <>
            <button onClick={()=>{
                Store.dispatch(
                    Action.Start.set({
                        type:"setIsLogin",
                        newValue:true
                    })
                )
            }}>d</button>
            {isLogin? "true":"false"}

        </>
    )
}


