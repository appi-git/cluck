import {savedColors, quatern} from "../assets/utils.js";

import {Reg_Hex, tooDark, colorSelectorAssembly, buttIdToColor, toggleResetButton, resetButtDivs} from "../assets/options/misc.js";


const buttsDiv = document.getElementById("butts-div");
const buttDivs = document.querySelectorAll(".butt-div");
const contentsDiv = document.getElementById('contents-div')

function applySavedColors(){
  document.body.style.backgroundColor = savedColors.bgclr;
  buttDivs.forEach(buttDiv => {
    buttDiv.style.backgroundColor = savedColors[buttIdToColor[buttDiv.id]];
    if(tooDark(document.body.style.backgroundColor)){
      buttDiv.style.borderColor = "#FFFFFF";
      if(buttDiv.id=="reset"){
        buttDiv.style.color = "#FFFFFF";
      }
      contentsDiv.style.color = "#FFFFFF";
    }else{
      buttDiv.style.borderColor = "#000000";
      if(buttDiv.id=="reset"){
          buttDiv.style.color = "#000000";
      }
      contentsDiv.style.color = "#000000";
    }
  })
  document.querySelectorAll(".active-color").forEach(elem => {
    elem.style.color = savedColors.sclr;
  });
  document.querySelectorAll(".inactive-color").forEach(elem => {
    elem.style.color = savedColors.pclr;
  });
  document.querySelectorAll(".colored-text").forEach(elem => {
    if(tooDark(document.body.style.backgroundColor)){
      elem.style.webkitTextStrokeColor = "#FFFFFF";
    }else{
      elem.style.webkitTextStrokeColor = "#000000";
    }
  })
  document.querySelectorAll(".grid").forEach(elem => {
    if(elem.classList.contains("active-color")){
      elem.style.backgroundColor = savedColors.sclr;
    } else if(elem.classList.contains("inactive-color")){
      elem.style.backgroundColor = savedColors.pclr;
    }
    elem.style.borderColor = savedColors.bdclr;
  });
  document.getElementById('seconds-toggle-div').style.backgroundColor = (localStorage.getItem('seconds-div-display')=='flex') ? 'rgb(0,255,0)' : 'rgb(255,0,0)'
  
}
 
applySavedColors();

function sendRequest(){
    fetch('http://localhost:3000/')
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

document.addEventListener("click",()=>{
  //If clicked element is a buttdiv
  if(event.target.classList.contains("butt-div")){
    let resetAll;
    if(event.target.id=="reset"){
      resetAll = false;
      toggleResetButton(event.target, savedColors);
    }else{
      resetAll = true;
      switch(event.target.hasChildNodes()){
        case false:
          colorSelectorAssembly(event.target);
          break;
        case true:
          event.target.replaceChildren();
          break;
      }
    }
    resetButtDivs(buttDivs, resetAll);
  //If clicked element is not a buttdiv
  } else if(event.target.closest("#color-selector-div")){
    switch(true){
      case event.target.classList.contains("color-select-button"):
        const clrInputBox = document.querySelector(".color-input-box");
        const clr = clrInputBox.value;
        if(Reg_Hex.test(clr)){
            const clrInput = clr.startsWith('#') ? clr : '#' + clr;
            const selectedButt = event.target.closest(".butt-div");
            selectedButt.style.backgroundColor = clrInput;
            savedColors[buttIdToColor[selectedButt.id]] = clrInput;
            localStorage.setItem("savedColors", JSON.stringify(savedColors));
        } else{
            alert("Please enter a valid hex color code.");
        }
        break;
      case event.target.classList.contains("color-sample"):
        const selectedButt = event.target.closest(".butt-div");
        selectedButt.style.backgroundColor = event.target.dataset.color;
        savedColors[buttIdToColor[selectedButt.id]] = event.target.dataset.color;
        localStorage.setItem("savedColors", JSON.stringify(savedColors));
        break;
    }
  } else{
    switch(event.target.id){
      case 'seconds-toggle-div':
        const secondsToggleDiv = event.target;
        switch(window.getComputedStyle(secondsToggleDiv).backgroundColor){
          case 'rgb(255, 0, 0)':
            secondsToggleDiv.style.backgroundColor='rgb(0, 255, 0)';
            localStorage.setItem('seconds-div-display', 'flex')
            break
          case 'rgb(0, 255, 0)':
            secondsToggleDiv.style.backgroundColor = 'rgb(255, 0, 0)';
            localStorage.setItem('seconds-div-display', 'none')
        }
        
    }
  }
  applySavedColors();
})

buttsDiv.addEventListener("keydown",(event)=>{
  if(event.key == "Enter" && event.target.id == "color-input"){
    event.target.nextElementSibling.click();
  }
})


// const secondsToggleDiv = document.getElementById('seconds-toggle-div');
// secondsToggleDiv.addEventListener('click', ()=>{
//   console.log(secondsToggleDiv.style.backgroundColor);
//   switch(secondsToggleDiv.style.backgroundColor){
//     case 'red':
//       secondsToggleDiv.style.backgroundColor='green';
//       console.log('green time')
//       break
//     case 'green':
//       secondsToggleDiv.style.backgroundColor = 'red';
//       console.log('red time')
//       break
//   }
// })




const columns = document.querySelectorAll(".column");


function setColumn(column, nummer){
    for(let i=0; i<3; i++){
        const grid = document.createElement("div");
        grid.classList.add("grid");
        grid.style.border = "2px solid black";
        grid.classList.add("inactive-color");
        if(nummer==0){
            
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
function setBlock(n){
    columns.forEach(column => {
        column.replaceChildren();
    })
    columns.forEach((column, index)=>{
        const quaternResult = quatern(n);
        setColumn(column, quaternResult[index]);
    })
    applySavedColors();
}
const numSlider = document.getElementById("numSlider");
const numInput = document.getElementById("numInput");

numSlider.addEventListener("input",()=>{
    setBlock(numSlider.value);
    numInput.value = numSlider.value;
})
numInput.addEventListener("input",()=>{
    if(numInput.value>63){
        numInput.value = 63;
    } else if(numInput.value<0){
        numInput.value = 0;
    } else if(numInput.value==""){
        numInput.value = 0;
    }
    numSlider.value = numInput.value;
    setBlock(numInput.value);
})
numSlider.dispatchEvent(new Event("input"));