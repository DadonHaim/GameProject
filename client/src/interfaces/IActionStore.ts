interface IActionStore{
    payload :{
        type: "thePage" | "subPage";
        newValue:any;
    }
}