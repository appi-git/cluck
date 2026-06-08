const navbarElements = ['Guide','Edit','Chat','filler','Back']

const navbar = document.getElementById('navbar')

function navbarInit(){
  const divs = {}
  navbarElements.map(elementName=>{
    const div = document.createElement('div')
    div.id = elementName.toLowerCase()
    div.classList.add('nav')
    if(elementName!='filler'){
      div.innerText = elementName
    }
    return navbar.appendChild(div)
  }).forEach(lmnt=>{
    divs[lmnt.id] = lmnt;
  })
  return divs
}

const navbarDivs = navbarInit()


navbar.addEventListener('click',()=>{
  if(event.target.id=='filler'){return}

  const chatDiv = document.getElementById('chat-div');
  const editDiv = document.getElementById('edit-div');
  const guideDiv = document.getElementById('guide-div');

  switch(event.target.id){
    case 'back':
      window.location.href='../'
      break
    case 'guide':
      console.log('guide page')
      chatDiv.style.display = 'none';
      editDiv.style.display = 'none';
      guideDiv.style.display = 'flex';
      break
    case 'edit':
      console.log('edits page')
      chatDiv.style.display = 'none';
      editDiv.style.display = 'block';
      guideDiv.style.display = 'none';
      break
    case 'chat':
      console.log('chat page')
      chatDiv.style.display = 'flex';
      editDiv.style.display = 'none';
      guideDiv.style.display = 'none';
      
      break
  }

  for(const lmnt of navbarElements){
    navbarDivs[lmnt.toLowerCase()].style.backgroundColor = 'tan'
  }
  event.target.style.backgroundColor = 'rgb(170, 150, 110)'
})