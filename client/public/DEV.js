function createGrid(id ,name , classFor, top){
    let grid = document.createElement("div")

    setTimeout(()=>{
        let For = document.getElementsByClassName(classFor)[0];
    
        grid.id = id
        grid.style.display              = "none"
        grid.style.gridTemplateRows     = For.style.gridTemplateRows;
        grid.style.gridTemplateColumns  = For.style.gridTemplateColumns;
        grid.style.position             = "absolute";
        grid.style.border               = "1px solid red";
        grid.style.opacity              = "20%";
        grid.style.fontSize             = "9px";
       
        let stringHtml = ``;
        for(let i = 0; i<ToNum(For.style.gridTemplateRows);i++)
            for(let j = 0; j<ToNum(For.style.gridTemplateColumns);j++)
                stringHtml += `<div style="border:1px solid red;">${i+1},${j+1}</div>`;

        grid.innerHTML = stringHtml;
        For.appendChild(grid)

        CreateBtn(name , grid, For , top)
    },1000)
}

function CreateBtn(name , elemGrid , ForElem,top){
    let btn = document.createElement("button");
    btn.setAttribute("class","btnDisplayGrid")
    btn.setAttribute("data-count","0")
    btn.style.position = "absolute";
    btn.style.top = top+"px";
    btn.style.width = 30+"px";
    btn.style.height = 30+"px";
    btn.style.zIndex=999;
    btn.innerHTML = name;

    btn.onclick = ()=>{
        elemGrid.style.width =  ForElem.offsetWidth +"px"
        elemGrid.style.height = ForElem.offsetHeight+ "px"
        // elemGrid.style.top =    ForElem.offsetTop +"px"
        // elemGrid.style.left =   ForElem.offsetLeft +"px"

        if(btn.dataset.count %2 == 0)
            elemGrid.style.display = "grid"
        else
            elemGrid.style.display = "none"
            btn.setAttribute("data-count",parseInt(btn.getAttribute("data-count"))+1)
    }

    document.body.appendChild(btn)
}


function ToNum(str=""){
    let res = str.replace("repeat(","");
    res = res.replace(", 1fr)","")
    return parseInt(res);
}