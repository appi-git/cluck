const Reg_Hex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i;


function tooDark(color) {
    let strike=0;
    const rgb = (
            (color.slice(4,-1))
            .split(","))
            .map(n=>parseInt(n)
        );
    rgb.forEach(value=>{
        if(value<=40){
            strike++;
        }
    })
    return (strike==3) ? true : false;
}

const sampleColors = ["#fff8dc","#000000","#00BFFF","#DC143C",
    "#FF69B4","#8A2BE2","#7FFF00","#FF4500",
    "#2E8B57","#FFD700","#00CED1","#FFFFFF"];

const colorSampleSelector = function(){
  const colorSamplesDiv = document.createElement("div");
  colorSamplesDiv.id = "color-samples-div";

  sampleColors.forEach(clr => {
    const colorSample = document.createElement("div");
    colorSample.classList.add("color-sample");
    colorSample.style.backgroundColor = clr;
    colorSamplesDiv.appendChild(colorSample);
    colorSample.setAttribute("data-color", clr);
  })

   return colorSamplesDiv;
}

const colorInput = function(){
  const colorInputDiv = document.createElement("div");
  colorInputDiv.id = "color-input-div";
  
  const colorInput = document.createElement("input");
  colorInput.placeholder = "Enter hexcode";
  colorInput.type = "text";
  colorInput.classList.add("color-input-box");
  colorInput.id = "color-input"

  const colorSelectButton = document.createElement("button");
  colorSelectButton.classList.add("color-select-button");
  colorSelectButton.innerHTML = "&#x2714";
  colorSelectButton.id = "color-submit";

  colorInputDiv.appendChild(colorInput);
  colorInputDiv.appendChild(colorSelectButton);

  return colorInputDiv;
}


const colorSelectorAssembly = function(div){
  const colorSelectorDiv = document.createElement("div");
  colorSelectorDiv.id = "color-selector-div";

  colorSelectorDiv.appendChild(colorInput());
  colorSelectorDiv.appendChild(colorSampleSelector());

  div.appendChild(colorSelectorDiv);
}

const buttIdToColor = {
    "bg-color": "bgclr",
    "bd-color": "bdclr",
    "p-color": "pclr",
    "s-color": "sclr",
    "reset": "bgclr"
};

function resetColors(savedColors,element){
  localStorage.removeItem("savedColors");
  savedColors.pclr = "#00BFFF";
  savedColors.sclr = "#DC143C";
  savedColors.bgclr = "#FFF8DC";
  savedColors.bdclr = "#000000";
  localStorage.setItem("savedColors", JSON.stringify(savedColors));
  element.innerText = 'Reset';
}

function toggleResetButton(button,colorObject){
  if(button.innerText == 'Reset?'){
    resetColors(colorObject,button);
  } else{
    button.innerText = 'Reset?';
  }
}

function resetButtDivs(divList, resetAll=false){
  for(const div of divList){
    if(div.id!="reset" && div!=event.target){
      div.replaceChildren();
    }
    if(resetAll && div.id=="reset"){
      div.innerText = 'Reset';
    }
  }
}

export {Reg_Hex,tooDark, colorSelectorAssembly, buttIdToColor,toggleResetButton, resetButtDivs};