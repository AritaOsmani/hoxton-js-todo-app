// How to work with state:
// 1. create some state
// 2. render the app based on the state
// 3. update the state
// 4. rerender the app based on the new state

const state ={
    showCompleted: true,
    todos: [
        {
            text:'Go shopping',
            completed:true
        },
        {
            text:'Buy fruits',
            completed:false
        },
        
    ],

}
const todoList = document.querySelector('.todo-list');
const compeltedList = document.querySelector('.completed-list');
const showCompletedCheckbox = document.querySelector('.show-completed-checkbox');
const completedSection = document.querySelector('.completed-section');
const completedSectionTitle = document.querySelector('.completed-title');

//Renders items in the todo section
function renderTodos(){
        
        todoList.innerHTML = '';
        const completedTodos = getIncompletedTodos();

         for(const todo of completedTodos){

             const listItem = createTodoListItem(todo);
             todoList.append(listItem);

          }
}

//Renders items in the completed section
function renderCompletedTodos(){

    compeltedList.innerHTML = '';
    const completedTodoList = getCompletedTodos();
    for(const item of completedTodoList){
        
            const listItem = createTodoListItem(item);
            compeltedList.append(listItem);
            
    }
    
}
//Renders all the elements 
function render(){
    
    renderTodos();
    renderCompletedTodos();
}
//Creates a todo item
function createTodoListItem(item){
    //Create list item
     const listItem = document.createElement('li');
    listItem.setAttribute('class','todo');
   
    //Create the checkbox container with the checkbox input
    const checkboxContainer = document.createElement('div');
    checkboxContainer.setAttribute('class','completed-section');
    const todoCheckbox = document.createElement('input');
    todoCheckbox.setAttribute('type','checkbox');
    todoCheckbox.setAttribute('class','completed-checkbox');

    chekcboxEvent(todoCheckbox,item);

    checkboxContainer.append(todoCheckbox);

    //Text container
    const textContainer = document.createElement('div');
    textContainer.setAttribute('class','text-section');
    const todoText = document.createElement('p');
    todoText.setAttribute('class','text');
    todoText.textContent = item.text;
    textContainer.append(todoText);

    //Button container
    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class','button-section');
    const editButton = document.createElement('button');
    editButton.setAttribute('class','edit');
    editButton.textContent = 'Edit';
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class','delete');
    deleteButton.textContent = 'Delete';
    buttonContainer.append(editButton,deleteButton);

    listItem.append(checkboxContainer,textContainer,buttonContainer);
    
    return listItem;
}

//Adds an element in the todo section when the form is submitted
function addTodosWithForm(){
    const formEl = document.querySelector('.add-item');
    const inputTextEl = document.querySelector('.text-input');
    formEl.addEventListener('submit',function(event){
        
        event.preventDefault();
        const inputEl = inputTextEl.value;
        // state.todoInput = inputTextEl.value;
        const obj = {
            text:inputEl,
            completed:false
        }
        inputTextEl.value = '';
        addTodo(obj);
        render();
    })
}
//Add a todo object in todos array
function addTodo(todo){
    state.todos.push(todo);
}

//Changes the state of a todo element
function toggleTodoState(todo){
    todo.completed = !todo.completed;

}
//Changes the state of the show completed element
function toggleState(){
    state.showCompleted = !state.showCompleted;
}

//Retruns an array with completed todos
function getCompletedTodos(){
    return state.todos.filter(function(todo){
        return todo.completed;
    })
}
//Retruns an array with incompleted todos
function getIncompletedTodos(){
    return state.todos.filter(function(todo){
        return !todo.completed;
    })
}

//Creates an event when the checkbox is clicked
function chekcboxEvent(checkbox,todo){
    checkbox.addEventListener('click',function(){
        toggleTodoState(todo);
        render();
    })
}
//Creates an event when the show completed checkbox is clicked
function showCompletedCheckboxEvent(){
    showCompletedCheckbox.addEventListener('click',function(){
        toggleState();
        changeDisplay();
    })
}

//Changes the content of  completed section 
function changeDisplay(){
    if(state.showCompleted === false){
        completedSection.innerHTML='';
    }else{
        completedSection.append(completedSectionTitle,compeltedList);
    }
}
showCompletedCheckboxEvent();
render();
addTodosWithForm();
