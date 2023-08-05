const circle = document.createElement('div');
circle.id = 'comon-tech-circle';
document.body.appendChild(circle);

circle.addEventListener('click', () => {
    const width = 800;
    const height = window.innerHeight;
  
    const popup = createPopup();
    

    document.body.appendChild(popup);
  });


function createPopup(){
  var mainBody = document.createElement('div');
  mainBody.classList.add("basement");

  var contentBlockList = new List();

  for(i = 0; i < 9; i++){
    contentBlockList.add(document.createElement('div'));
    contentBlockList[i].classList.add("content-block");
  }

  return mainBody;
}