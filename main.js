var uneListe = {
	liste: [],
	afficher: function () {
		console.log("Contenu de la liste");
		if (this.liste.length === 0) {
			console.log("Vide");
		} else {
			this.liste.forEach(function(entree){
				if(entree.check === false){
					console.log("( ) " + entree.text);
				} else {
					console.log("(X) " + entree.text);
				}
			});	
		}
	},
	ajouter: function (entree) {
		this.liste.push({
			text: entree,
			check: false,
		});
		console.log("Ajout " + entree);
	},
	modifier: function (ordre, entree) {
		var index = ordre - 1;
		this.liste[index].text = entree;
		if (this.liste[index].check === true) {
			this.checking(ordre);
		}
		console.log("Modif numero " + ordre + " : " + entree);
	},
	supprimer: function (ordre) {
		var index = ordre - 1;
		console.log("Suppression " + ordre + " : " + this.liste[index]);
		this.liste.splice(index, 1);
	},

	checking: function (ordre) {
		var index = ordre - 1;
		this.liste[index].check = !this.liste[index].check;
	},
	toggleAll: function () {
		var nbrCheck = 0;
		this.liste.forEach(function(entree){
			if (entree.check === true) {
				nbrCheck++;
			}
		});
		this.liste.forEach(function(entree){
			if (nbrCheck === this.liste.length) {
				entree.check = false; 
			} else {
				entree.check = true;
			}
		}, this);	
	},
}


var handlers = {
	toggleAll: function(){
		uneListe.toggleAll();
		view.afficher();
	},
	ajouter: function(){
		var ajout = document.getElementById("wrtInput");
		uneListe.ajouter(ajout.value);
		ajout.value = "";
		view.afficher();
		// view.toggleDisplay();

	},
	modifier: function(){
		var modif = document.getElementById("wrtModif");
		var position = document.getElementById("choosePosition");
		uneListe.modifier(position.valueAsNumber, modif.value);
		modif.value = "";
		position.value = "";
		view.afficher();
	},
	supprimer: function(ordre){
		uneListe.supprimer(ordre);
		view.afficher();
	},
	checking: function(ordre){
		uneListe.checking(ordre);
		view.afficher();
	},
	setEventListen: function(){
		var listeOl = document.querySelector("ol");
		listeOl.addEventListener("click", function(event){
			var clickedBtn = event.target;
			var ordre = parseInt(clickedBtn.parentNode.id);
			if (clickedBtn.className === "check") {
				handlers.checking(ordre);
			} else if (clickedBtn.className === "delete") {
				handlers.supprimer(ordre);
			}
		});
	}
}
handlers.setEventListen();


var view = {
	afficher: function(){
		var listeOl = document.querySelector("ol");
		listeOl.innerHTML = "";

		if(uneListe.liste.length === 0) {
			$("#modifier").css("display", "none");
		} else {
			$("#modifier").css("display", "block");
		}

		uneListe.liste.forEach(function(entree, index){
			var listeIl = document.createElement("li");
			listeIl.className="cf";
			var textp = document.createElement("p");
			var textComposition = "";

			if (entree.check === false) {
				textComposition = "( ) " + entree.text;
			} else {
				textComposition = "(X) " + entree.text;
			}
			listeIl.id = index + 1;
			textp.textContent = textComposition;
			listeIl.appendChild(this.createBtnCheck());
			listeIl.appendChild(textp);
			listeIl.appendChild(this.createBtnDel());
			listeOl.appendChild(listeIl);
			// if (entree.check === false) {
			// 	debugger;
			// 	$(".check").css("background", "rgba(250, 175, 0, 0.95)");
			// } else {
			// 	$(".check").css("background", "rgba(47, 175, 47, 0.95)");
			// }
		}, this);
	},
	createBtnCheck: function(){
		var btnCheck = document.createElement("button");
		btnCheck.textContent = "Check";
		btnCheck.className = "check";
		return btnCheck;
	},
	createBtnDel: function(){
		var btnDel = document.createElement("button");
		btnDel.textContent = "Del";
		btnDel.className = "delete";
		return btnDel;
	},
}

// Si .check = false => bg jaune
// el bg vert

// Si vide hide modifier

//keypress & blur event

