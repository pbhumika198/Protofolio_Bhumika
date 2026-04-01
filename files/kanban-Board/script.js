let draggedTask=null;

function addTask(column){

let input=document.getElementById(column+"Input");

if(input.value==="") return;

let task=createTask(input.value);

document.getElementById(column).appendChild(task);

input.value="";

saveBoard();
updateCounts();

}

function createTask(text){

let task=document.createElement("div");

task.className="task";
task.draggable=true;

task.innerHTML=`
<span>${text}</span>
<button class="delete-btn">✖</button>
`;

task.addEventListener("dragstart",drag);

task.querySelector(".delete-btn").addEventListener("click",function(){
task.remove();
saveBoard();
updateCounts();
});

return task;

}

function drag(e){
draggedTask=e.target;
}

function allowDrop(e){
e.preventDefault();
}

function drop(e){

e.preventDefault();

if(draggedTask){
e.target.appendChild(draggedTask);
saveBoard();
updateCounts();
}

}

function saveBoard(){

let columns=["todo","progress","done"];

let data={};

columns.forEach(col=>{

let tasks=[...document.getElementById(col).children]
.map(task=>task.querySelector("span").innerText);

data[col]=tasks;

});

localStorage.setItem("kanbanData",JSON.stringify(data));

}

function loadBoard(){

let data=JSON.parse(localStorage.getItem("kanbanData"));

if(!data) return;

for(let col in data){

data[col].forEach(text=>{

let task=createTask(text);

document.getElementById(col).appendChild(task);

});

}

updateCounts();

}

function updateCounts(){

document.getElementById("todo-count").innerText=
document.getElementById("todo").children.length;

document.getElementById("progress-count").innerText=
document.getElementById("progress").children.length;

document.getElementById("done-count").innerText=
document.getElementById("done").children.length;

}

loadBoard();