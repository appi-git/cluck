//test comment


const hour = document.querySelector(".hour-block");
const minute = document.querySelector(".minute-block");
const second = document.querySelector(".second-block");
let sixteens = 0;
let fours = 0;
let ones = 0;

const savedColors = JSON.parse(localStorage.getItem("savedColors")) || {
    pclr: "#00BFFF",
    sclr: "#DC143C",
    bgclr: "#FFF8DC",
    bdclr: "#000000"
}

const clr1 = savedColors.pclr;
const clr2 = savedColors.sclr
document.querySelector("body").style.backgroundColor = savedColors.bgclr;
document.querySelectorAll(".grids").forEach(grid=>{
    grid.style.borderColor = savedColors.bdclr;
})

const interval = 1000;

const sixteensH = hour.querySelector(".sixteens");    //sixteens hour
const hsUn = sixteensH.querySelector(".grid-one");
const hsDo = sixteensH.querySelector(".grid-two");
const hsTre = sixteensH.querySelector(".grid-three");

const foursH = hour.querySelector(".fours");    //fours hour
const hfUn = foursH.querySelector(".grid-one");
const hfDo = foursH.querySelector(".grid-two");
const hfTre = foursH.querySelector(".grid-three");

const onesH = hour.querySelector(".ones");    //ones hour
const hoUn = onesH.querySelector(".grid-one");
const hoDo = onesH.querySelector(".grid-two");
const hoTre = onesH.querySelector(".grid-three");

const sixteensM = minute.querySelector(".sixteens");    //sixteens minute
const msUn = sixteensM.querySelector(".grid-one");
const msDo = sixteensM.querySelector(".grid-two");
const msTre = sixteensM.querySelector(".grid-three");

const foursM = minute.querySelector(".fours");     //fours minute
const mfUn = foursM.querySelector(".grid-one");
const mfDo = foursM.querySelector(".grid-two");
const mfTre = foursM.querySelector(".grid-three");

const onesM = minute.querySelector(".ones");    //ones minute
const moUn = onesM.querySelector(".grid-one");
const moDo = onesM.querySelector(".grid-two");
const moTre = onesM.querySelector(".grid-three");

const sixteensS = second.querySelector(".sixteens");    //sixteens second
const ssUn = sixteensS.querySelector(".grid-one");
const ssDo = sixteensS.querySelector(".grid-two");
const ssTre = sixteensS.querySelector(".grid-three");

const foursS = second.querySelector(".fours");    //fours second
const sfUn = foursS.querySelector(".grid-one");
const sfDo = foursS.querySelector(".grid-two");
const sfTre = foursS.querySelector(".grid-three");

const onesS = second.querySelector(".ones");    //ones second
const soUn = onesS.querySelector(".grid-one");
const soDo = onesS.querySelector(".grid-two");
const soTre = onesS.querySelector(".grid-three");


function quatern(n) {
    sixteens = 0;
    fours = 0;
    ones = 0;
    
    for (; n>=16; n-=16){
        sixteens++;
    }
    for (fours; n>=4 && n<16; n-=4){
        fours++;
    }
    for (ones; n>=1 && n<4; n-=1){
        ones++;
    }
}
function setColor(grid, color){
  grid.style.backgroundColor = color;
}

function rowUpdate(row, g1, g2, g3){
  if(row === 0){
    setColor(g1, clr1);
    setColor(g2, clr1);
    setColor(g3, clr1);
  }else if(row === 1){
    setColor(g1, clr2);
    setColor(g2, clr1);
    setColor(g3, clr1);
  } else if(row === 2){
    setColor(g1, clr2);
    setColor(g2, clr2);
    setColor(g3, clr1);
  } else if(row === 3){
    setColor(g1, clr2);
    setColor(g2, clr2);
    setColor(g3, clr2);
  }
}

function hourUpdate(){
  let hourValue = time.getHours();
  quatern(hourValue);
  rowUpdate(sixteens, hsUn, hsDo, hsTre);
  rowUpdate(fours, hfUn, hfDo, hfTre);
  rowUpdate(ones, hoUn, hoDo, hoTre);
}

function minuteUpdate(){
  let minuteValue = time.getMinutes();
  quatern(minuteValue);
  rowUpdate(sixteens, msUn, msDo, msTre);
  rowUpdate(fours, mfUn, mfDo, mfTre);
  rowUpdate(ones, moUn, moDo, moTre);
}

function secondUpdate(){
  let secondValue = time.getSeconds();
  quatern(secondValue);
  rowUpdate(sixteens, ssUn, ssDo, ssTre);
  rowUpdate(fours, sfUn, sfDo, sfTre);
  rowUpdate(ones, soUn, soDo, soTre);
}

function updateTime() {
    time = new Date();
    secondUpdate();
    minuteUpdate();
    hourUpdate();
}


updateTime();
setInterval(updateTime,interval);

hfDo.addEventListener("click", ()=>{
    history.pushState({},'',"/info")
    location.reload()
    //window.open("info/index.html", "_blank");
});

mfDo.addEventListener("click", ()=>{
    console.log(screen.orientation.type)
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.querySelectorAll(".grids").forEach(grid=>{
            grid.style.padding="35px";
        })
    } else if (document.fullscreenElement) {
        document.exitFullscreen();
        if(screen.orientation.type=="portrait-primary"||screen.orientation.type=="portrait-secondary"){
            document.querySelectorAll(".grids").forEach(grid=>{
                grid.style.padding="65px";
            })
        }
    }
});
screen.orientation.addEventListener("change",()=>{
    if(screen.orientation.type=="portrait-primary"||screen.orientation.type=="portrait-secondary"){
        document.querySelectorAll(".grids").forEach(grid=>{
            grid.style.padding="65px";
        })

    }else if(screen.orientation.type=="landscape-primary"||screen.orientation.type=="landscape-secondary"){
        document.querySelectorAll(".grids").forEach(grid=>{
            grid.style.padding="35px";
        })
    }
})
