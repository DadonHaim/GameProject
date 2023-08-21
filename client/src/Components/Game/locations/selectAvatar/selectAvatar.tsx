import React from 'react';
import Button from '../../../basic/basicButton';
import Text from '../../../basic/BasicText';

const SelectAvatarLocation = React.forwardRef<Props,any>((props,ref)=>{

    return(
        <>
           {/* <SmallControler /> */}
           <Text id="locationName"  val='בחר אווטאר:' gfPosition={[[2,7],[3,11]]} align='center' fSize={30}/>
           {/* <AvatarLook /> */}
           {/* <AvatarSelector/> */}
        </>
    )
})


interface Props extends GlobalProps{}


export default React.memo(SelectAvatarLocation)