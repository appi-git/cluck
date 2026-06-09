import {toggleFullScreen} from "./assets/screen-toggle.js";
import {savedColors, quatern} from "./assets/utils.js";

const interval = 1000;

function applySavedColors(){
    document.body.style.backgroundColor = savedColors.bgclr;
    document.documentElement.style.setProperty("--pclr", savedColors.pclr);
    document.documentElement.style.setProperty("--sclr", savedColors.sclr);
    document.documentElement.style.setProperty("--bdclr", savedColors.bdclr);
}

function setColumn(column, nummer){
  const allColumns = column.parentElement.querySelectorAll('.column');
  for(let i=0; i<3; i++){

    const grid = document.createElement("div");
    grid.classList.add("grid");
    grid.classList.add("inactive-color");

    if(i==1 && column==allColumns[1]){
      grid.classList.add("special");
    }
    if(nummer==0){
        //nothing
    } else if(nummer==1 && i==2){
      grid.classList.remove("inactive-color");
      grid.classList.add("active-color");
    } else if(nummer==2 && i>=1){
      grid.classList.remove("inactive-color");
      grid.classList.add("active-color");
    } else if(nummer==3 && i>=0){
      grid.classList.remove("inactive-color");
      grid.classList.add("active-color");
    }
    column.appendChild(grid);
  }
}
function setBlock(blockId, number){
  const blockElement = document.getElementById(blockId);
  const columns = blockElement.querySelectorAll(".column");
  columns.forEach(column => {
    column.replaceChildren();
  })
  columns.forEach((column, index)=>{
    const quaternResult = quatern(number);
    setColumn(column, quaternResult[index]);
  })
}

function updateTime() {
  const time = new Date();
  setBlock('hour', time.getHours());
  setBlock('minute', time.getMinutes());
  setBlock('second', time.getSeconds());
  applySavedColors();
}

document.addEventListener("click", (e)=>{
  if(!e.target.classList.contains("special")) return;
  switch(e.target.parentElement.parentElement.id){
    case "hour":
      window.location.href = "./options/";
      break;
    case "minute":
      toggleFullScreen();
      break;
    case "second":
      console.log("second hehe");
      break;
  }
});

updateTime();
document.getElementById('second').style.display = localStorage.getItem('seconds-div-display') ?? 'none'
setInterval(updateTime,interval);