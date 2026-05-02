const colorSamples = ["#fff8dc","#000000","#00BFFF","#DC143C","#FF69B4","#8A2BE2","#7FFF00","#FF4500","#2E8B57","#FFD700","#00CED1","#FF1493"];
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

function applySavedColors(){
    buttDivs.forEach(buttDiv => {
        buttDiv.style.backgroundColor = savedColors[buttIdToColor[buttDiv.id]];
        if(savedColors.bgclr=="#000000"||savedColors.bgclr=="#000"){
            buttDiv.style.borderColor = "#FFFFFF";
            if(buttDiv.id=="reset"){
                buttDiv.style.color = "#FFFFFF";
            }
        }else{
            buttDiv.style.borderColor = "#000000";
            if(buttDiv.id=="reset"){
                buttDiv.style.color = "#000000";
            }
        }
    })
    document.body.style.backgroundColor = savedColors.bgclr;
    document.body.style.color = savedColors.bdclr;
    document.querySelectorAll(".active-grid").forEach(elem => {
        elem.style.color = savedColors.sclr;
    });
    document.querySelectorAll(".inactive-grid").forEach(elem => {
        elem.style.color = savedColors.pclr;
    });
}
applySavedColors();

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
    if(!event.target.classList.contains("butt-div")){
        for (buttDiv of buttDivs){
            buttDiv.innerHTML = '';
        }
    }else if(event.target.id=="reset"){
        if(event.target.innerText == 'Reset?'){
            localStorage.clear();
            savedColors.pclr = "#00BFFF";
            savedColors.sclr = "#DC143C";
            savedColors.bgclr = "#FFF8DC";
            savedColors.bdclr = "#000000";
            event.target.innerText = '';
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
            } else{
                childElement.innerHTML = '';
            }
        }
    }
    applySavedColors();
})