var toDoList = {
  todos: [],
  // - displayToDos devrait montrer le text
  // - toDoList.addToDo ajoute aussi des objets
  addToDo: function(newValue) {
    this.todos.push({
      text: newValue,
      completee: false,
    });
  },
  // - toDoList.editToDo change la propriété texte de l'objet todo
  editToDo: function(index, newValue){
    var i = index - 1;
    this.todos[i].text = newValue;
  },
  // - une méthode pour supprimer un "à faire"
  rmToDo: function (index) {
    var i = index - 1;
    this.todos.splice(i, 1);
  },
  // - toDoList.toggleCompletee change la propriété completee
  toogleCompletee: function(index) {
    var i = index - 1;
    var todo = this.todos[i];
    todo.completee = !todo.completee;
  },
  toogleAll: function () {
    var numbrCompletee = 0;
    for (var i = 0 ; i < this.todos.length ; i++) {
      if (this.todos[i].completee === true) {
        numbrCompletee++;
      }
    }     
//V6
    if (numbrCompletee === this.todos.length) {
      // - si tout est checkée, tout déchecké
      for( i = 0 ; i < this.todos.length; i++) {
        this.todos[i].completee = false;
      }
    // - si tout est déchecké, tout checkée
    } else {
      for ( i = 0 ; i < this.todos.length ; i++) {
        this.todos[i].completee = true;
      }
    }
  },
}

//V7

//- idya un boutton displayToDos() et un boutton toogleAll()

var handlers = {
// //- Cliquer sur le boutton "liste à faire" devrait lancer toDoList.displayToDos();
// //- Cliquer sur le boutton "toogle" devrait lancer toDoList.toogleAll();
  toogleAll: function(){
    toDoList.toogleAll();
    view.displayToDos();
  },  
// V8
// ida des controles pour .addToDo
  addToDo: function(){
    var addTxtInP = document.getElementById("addTxtInP");
    toDoList.addToDo(addTxtInP.value);
    addTxtInP.value = "";
    view.displayToDos();
  },
// ida des controles pour .editToDo
  editToDo: function(){
    var position = document.getElementById("positionToEdit");
    var newValue = document.getElementById("newValue").value;
    toDoList.editToDo(position.valueAsNumber, newValue);
    position.value = "";
    newValue = "";
    view.displayToDos();
  },
// ida des controles pour .rmToDo
  rmToDo: function(){
    var position = document.getElementById("positionToDelete");
    toDoList.rmToDo(position.valueAsNumber);
    position.value = "";
    view.displayToDos();
  },
// ida des controles pour .toogleCompletee
  toogleToDo: function() {
    var position = document.getElementById("positionToToogle");
    toDoList.toogleCompletee(position.valueAsNumber);
    position.value = "";
    view.displayToDos();
  },
}

var view = {
  displayToDos: function(){
    var todosOl = document.querySelector("ol");
    todosOl.innerHTML = "";
    for (var i = 0; i < toDoList.todos.length ; i++) {
        var todoLi = document.createElement("li");
        var todo = toDoList.todos[i];
        var todoTextComp = "";

        if (todo.completee === true) {
          todoTextComp = "(X) " + todo.text;
        } else {
          todoTextComp = "( ) " + todo.text;
        }
        todoLi.textContent = todoTextComp;
        todosOl.appendChild(todoLi);
    }
  },
};

  