let todoList=[];


function refreshTodoList(todoItem){
    const ul=document.querySelector("#todo-list");
    const li=document.createElement("li");
    const oldItem=document.querySelector(`
        [data-id="${todoItem.id}"]`
    );
    if(todoItem.delete){
        oldItem.remove();
        return //to stop the next function implement
    }


    const isDone=todoItem.done?"done":"";
    li.setAttribute("data-id",todoItem.id);
    li.setAttribute("class",`todo-item ${isDone}`);
    li.innerHTML=`<label class="tick"></label for="${todoItem.id}><input type="checkbox" id="${todoItem.id}"><span>${todoItem.task}</span><button class="delete"><img src="images/remove.png"></button>`
   // ul.append(li);// this add li on the list bottom
   if(oldItem){
    ul.replaceChild(li,oldItem);
   }else{
    ul.insertBefore(li,ul.firstElementChild);//add li on the list top
   }
   
}


function addTodoItem(task){
    const todoItem={
        task:task,
        done:false,
        id:Date.now()//use date as id

    };
    todoList.push(todoItem);
    refreshTodoList(todoItem);
    saveLocalStorage();
}


function toggleDone(id){
const index=todoList.findIndex(
    todoItem=>{
      return  todoItem.id===Number(id); //return is necessary
    }
)
todoList[index].done=!todoList[index].done;
refreshTodoList(todoList[index]);
saveLocalStorage();
}

function deleteTodoItem(id){
    const index=todoList.findIndex(
        todoItem=>{
           return  todoItem.id===Number(id);
        }
    )
todoList[index].delete=true;
refreshTodoList(todoList[index]);
todoList=todoList.filter( todoItem=>todoItem.id!==Number(id))//update the array
saveLocalStorage();
}

function saveLocalStorage(){  //store data on local 
    localStorage.setItem(
        "todo-list",JSON.stringify(todoList)//JSON should be capital
    );
    
    console.log("save")
}

const form=document.querySelector("#todo-form");//# means searching for id

form.addEventListener("submit",event=>{
    event.preventDefault();
    const input=document.querySelector("#todo-input");
    const task=input.value.trim();
    console.log(task);
    console.log("submit event caught!");

    if(task!==""){
        addTodoItem(task);
    input.value="";
    console.log(todoList);

    }else{
        alert("please enter item")
    };
    
 });
const ul=document.querySelector("#todo-list");

ul.addEventListener("click",event=>{
    const id=event.target.parentElement.dataset.id;
    if(event.target.classList.contains("tick")){
        console.log(id);
        toggleDone(id);
    }else if(event.target.classList.contains("delete")){
        deleteTodoItem(id);
        console.log(todoList);
    }
}

);
document.addEventListener("DOMContentLoaded",
()=>{
    const todoListString=localStorage.getItem("todo-list");
    if(todoListString){
        todoList=JSON.parse(todoListString);
        for(let i=0;i<todoList.length;i++){
            refreshTodoList(todoList[i]);

        }
    }
})