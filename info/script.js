const colorSamples = ["#fff8dc","#000000","#00BFFF","#DC143C",
    "#FF69B4","#8A2BE2","#7FFF00","#FF4500",
    "#2E8B57","#FFD700","#00CED1","#FFFFFF"];
const colorSampleTemplate = function(){
    let template = "";
    colorSamples.forEach(clr => {
        template += `<div class="color-sample" style="background-color:${clr}"></div>`;
    })
    return template;
}
const clrSelectorTemplate = `
    <div id="color-input-div">
        <input type="text" class="color-input-box">
        <button class="color-select-button">&#x2714</button>
    </div>
    <div id="color-samples-div">
        ${colorSampleTemplate()}
    </div>
`;
const savedColors = JSON.parse(localStorage.getItem("savedColors")) || {
    pclr: "#00BFFF",
    sclr: "#DC143C",
    bgclr: "#FFF8DC",
    bdclr: "#000000"
}
const buttIdToColor = {
    "bg-color": "bgclr",
    "bd-color": "bdclr",
    "p-color": "pclr",
    "s-color": "sclr",
    "reset": "bgclr"
};
const buttsDiv = document.getElementById("butts-div");
const buttDivs = document.querySelectorAll(".butt-div");
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
function applySavedColors(){
    document.body.style.backgroundColor = savedColors.bgclr;
    buttDivs.forEach(buttDiv => {
        buttDiv.style.backgroundColor = savedColors[buttIdToColor[buttDiv.id]];
        if(tooDark(document.body.style.backgroundColor)){
            buttDiv.style.borderColor = "#FFFFFF";
            if(buttDiv.id=="reset"){
                buttDiv.style.color = "#FFFFFF";
            }
            document.body.style.color = "#FFFFFF";
        }else{
            buttDiv.style.borderColor = "#000000";
            if(buttDiv.id=="reset"){
                buttDiv.style.color = "#000000";
            }
            document.body.style.color = "#000000";
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
}
applySavedColors();

function sendRequest(){
    fetch('http://localhost:3000/')
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
}

const mutationOptions= {
    childList: true
}
const observer = new MutationObserver(()=>{
    
    if(selectedButt && selectedButt.innerHTML!=""){
        try{
            const clrSelectorDiv = document.getElementById("color-selector-div");
            clrSelectorDiv.innerHTML = clrSelectorTemplate;
            
            const clrInputBox = document.querySelector(".color-input-box");
            const clrSelectButton = document.querySelector(".color-select-button");
            const clrSamples = document.getElementById("color-samples-div");
            
            const Reg_Exp = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i;

            clrSelectButton.addEventListener("click",()=>{
                const clr = clrInputBox.value;
                if(Reg_Exp.test(clr)){
                    clr.startsWith('#') ? clrInput = clr : clrInput = '#' + clr;
                    selectedButt.style.backgroundColor = clrInput;
                    savedColors[buttIdToColor[selectedButt.id]] = clrInput;
                    localStorage.setItem("savedColors", JSON.stringify(savedColors));
                } else{
                    alert("Please enter a valid hex color code.");
                }
            })
            clrInputBox.addEventListener("keypress",(event)=>{
                if(event.key === "Enter"){
                    clrSelectButton.click();
                }
            })
            clrSamples.addEventListener("click",(event)=>{
                if(event.target.classList.contains("color-sample")){
                    const clr = event.target.style.backgroundColor;
                    selectedButt.style.backgroundColor = clr;
                    savedColors[buttIdToColor[selectedButt.id]] = clr;
                    localStorage.setItem("savedColors", JSON.stringify(savedColors));
                }
            })
            clrSelectorDiv.addEventListener("click", ()=>{
                event.stopPropagation();
            })
        }
        catch(error){
            console.error(error);
        }
    }
})

let selectedButt = null;
buttsDiv.addEventListener("click",()=>{
    //sendRequest();
    if(!event.target.classList.contains("butt-div")){
        for (buttDiv of buttDivs){
            buttDiv.innerHTML = buttDiv.id=="reset" ? 'Reset' : '';
        }
    }else if(event.target.id=="reset"){
        if(event.target.innerText == 'Reset?'){
            localStorage.clear();
            savedColors.pclr = "#00BFFF";
            savedColors.sclr = "#DC143C";
            savedColors.bgclr = "#FFF8DC";
            savedColors.bdclr = "#000000";
            event.target.innerText = 'Reset';
        } else{
            event.target.innerText = 'Reset?';
        }
    }else{
        for (child in event.target.parentElement.children){
            const childElement = event.target.parentElement.children[child];
            if(childElement==event.target){
                if(childElement.innerHTML==""){
                    selectedButt = childElement;
                    observer.observe(selectedButt, mutationOptions);
                    childElement.innerHTML = `<div id="color-selector-div">${clrSelectorTemplate}</div>`;
                } else if(childElement.innerHTML!=''){
                    selectedButt = null;
                    childElement.innerHTML = '';
                }
            }else if(childElement.id=="reset"){
                childElement.innerHTML = 'Reset';
            } else{
                childElement.innerHTML = '';
            }
        }
    }
    applySavedColors();
})

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
    return {0:ones, 1:fours, 2:sixteens};
}

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
        quaternResult = quatern(n);
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
    }
    numSlider.value = numInput.value;
    setBlock(numInput.value);
})
numSlider.dispatchEvent(new Event("input"));
