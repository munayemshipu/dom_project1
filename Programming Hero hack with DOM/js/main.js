const milestoneData = data.data;

// Load Milestone Data 
function loadMilestone(){
    const milestones = document.querySelector(".milestones");

    milestones.innerHTML = `${milestoneData.map(function(milestone){
        return `<div class="milestone border-b" id="${milestone._id}">
        <div class="flex">
          <div class="checkbox" "><input onclick="markMilestone(this, ${milestone._id})"  type="checkbox" /></div>
          <div onclick="openMilestone(this, ${milestone._id})">
            <p>
              ${milestone.name}
              <span><i class="fas fa-chevron-down"></i></span>
            </p>
          </div>
        </div>
        <div class="hidden_panel">

          ${milestone.modules.map(function(module){
            return `<div class="module border-b">
            <p>${module.name}</p>
          </div>`;
          }).join('')};

        </div>
      </div>`;
    }).join('')}`;
}

// Open Milestone Data 
function openMilestone(milestoneElement, id){
    const currentPanel = milestoneElement.parentNode.nextElementSibling;
    const shownPanel = document.querySelector(".show");
    const active = document.querySelector(".active");

    // First remove the active class if any [other than the click one]
    if(active && !milestoneElement.classList.contains('active')){
        active.classList.remove('active');
    }

    // toggle current clicked one
    milestoneElement.classList.toggle('active');

    // First hide previous panel if open any [other than the clicked element]
    if(!currentPanel.classList.contains("show") && shownPanel){
        shownPanel.classList.remove('show');
    }

    // toggle current element
    currentPanel.classList.toggle('show');

    showMilestone(id);
}

// Show Milestone Image,Title,Desc 
function showMilestone(id){
    const milestoneImage = document.querySelector(".milestoneImage");
    const name = document.querySelector(".title");
    const details = document.querySelector(".details");

    milestoneImage.style.opacity = "0";
    milestoneImage.src = milestoneData[id].image;
    name.innerText = milestoneData[id].name;
    details.innerText = milestoneData[id].description;
}

// Listen for hero image load
const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function(){
    this.style.opacity = "1";
}

// Mark Milestone (Remove and Add)
function markMilestone(checkbox, id){
    const doneList = document.querySelector(".doneList");
    const milestoneList = document.querySelector(".milestones");
    const item = document.getElementById(id);

    if(checkbox.checked){
        // Mark as done
        milestoneList.removeChild(item);
        doneList.appendChild(item);
    }else{
        milestoneList.appendChild(item);
        doneList.removeChild(item);
        loadAfterCheck();
    }
    
}


//load after sorting
const loadAfterCheck = ()=>{
  //get all milestone
  const reload = milestoneList.querySelectorAll('.milestone');
  //create a new array to use sort method
  const newArry = [...reload];
  //now sort the new arry using id
  const another = newArry.sort((a,b)=>{
  return a.id-b.id;
  });
  //now reload the milestones
  another.forEach((item)=>{
    milestoneList.appendChild(item);
  });
}


loadMilestone();