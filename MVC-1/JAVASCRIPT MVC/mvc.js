var clients = [
	{
		id: 1,
		fecha:'2018-01-01',
		nombre: 'nombre1',
		observaciones: 'observaciones1'
	},
	{
		id: 2,
		fecha:'2018-01-02',
		nombre: 'nombre2',
		observaciones: 'observaciones2'
	},
	{
		id: 3,
		fecha:'2018-01-03',
		nombre: 'nombre3',
		observaciones: 'observaciones3'
	},
	{
		id: 4,
		fecha:'2018-01-04',
		nombre: 'nombre4',
		observaciones: 'observaciones4'
	}
];

// Para simular un evento que modifique los datos de un modelo
var newModelData = {
	id: Math.floor(Math.random()*4) + 1,
	date: '1999-09-09',
	name: 'nombreMOD',
	observations: 'observacionesMOD'
}

//Modelo Cliente
Client = function(id, fecha, nombre, observaciones){
	this.id = id;
	var date = fecha;
	var name = nombre;
	var observations = observaciones;

	//Observers
	this.observers = [];
	this.registerObserver = function(observer){
		this.observers.push(observer);
	}
	this.unregisterObserver = function(observer){
		var observerIndex = this.observers.indexOf(observer);
		this.observers.slice(observerIndex, 1);
	}
	this.notifyAll = function(){
		for (var i = this.observers.length - 1; i >= 0; i--) {
			this.observers[i].update(this.copy());
		}
	}

	//Definir atributos como propiedades con getters y setters
	// Al realizar un "set" se auto notifica del cambio a los observadores
	Object.defineProperty(this,"date",{
		get: function() { return date; },
		set: function(newDate) { 
			//Filtrar los datos
			var dateAux = new Date(newDate);
			if(dateAux.toString()==='Invalid Date'){
				return false;
			}
			date = newDate;
			this.notifyAll();
			return true;
		}
	});

	Object.defineProperty(this,"name",{
		get: function() { return name; },
		set: function(newname) { 
			name = newname;
			this.notifyAll();
			return true;
		}
	});

	Object.defineProperty(this,"observations",{
		get: function() { return observations; },
		set: function(newobservations) { 
			observations = newobservations;
			this.notifyAll();
			return true;
		}
	});
}

// Para poder pasar el objeto como copia y no como referencia
Client.prototype.copy = function(){
	return {
		id: this.id,
		date: this.date,
		name: this.name,
		observations: this.observations
	}
}

// Vista Cliente
// Indica dónde se van a mostrar los datos del cliente que le irá dando el controlador
ClientView = function(){
	this.tr = document.createElement('tr');
	document.getElementById('myTable').querySelector('tbody').appendChild(this.tr);
}

// Variables globales para la vista
// ClientView showingDetails: Determina qué ClientView está mostrando el div de detalles
ClientView.showingDetails = null;
// El div de detalles de los clientes
ClientView.divDetails = null;
// Inicializar las variables globales de la vista que sólo puedan leerse en el window.onload()
ClientView.init = function(){
	ClientView.divDetails = document.getElementById('myDetails');
}
ClientView.getInputDate = function(){
	return ClientView.divDetails.querySelector('input[name="date"]');
}
ClientView.setDateWrong = function(){
	ClientView.getInputDate().classList.add('wrong');
}
ClientView.setDateOk = function(){
	ClientView.getInputDate().classList.remove('wrong');
}

ClientView.prototype.populate = function(model) {
	var cell_checkbox = document.createElement('td');
	cell_checkbox.setAttribute('name', 'multiple_actions');
	var cell_date = document.createElement('td');
	cell_date.setAttribute('name', 'date');
	var cell_name = document.createElement('td');
	cell_name.setAttribute('name', 'name');
	var cell_observations = document.createElement('td');
	cell_observations.setAttribute('name', 'observations');

	var input_checkbox = document.createElement('input');
	input_checkbox.type = 'checkbox';
	cell_checkbox.appendChild(input_checkbox);
	cell_date.innerHTML = model.date;
	cell_name.innerHTML = model.name;
	cell_observations.innerHTML = model.observations;

	this.tr.appendChild(cell_checkbox);
	this.tr.appendChild(cell_date);
	this.tr.appendChild(cell_name);
	this.tr.appendChild(cell_observations);
}

ClientView.prototype.update = function(model) {
	//this.tr.innerHTML = ''; //NO! Porque estarías borrando los eventListeners (y esos sólo los pone el controller)
	var cell_date = this.tr.querySelector('td[name="date"]');
	cell_date.innerHTML = model.date;
	var cell_name = this.tr.querySelector('td[name="name"]');
	cell_name.innerHTML = model.name;
	var cell_observations = this.tr.querySelector('td[name="observations"]');
	cell_observations.innerHTML = model.observations;
	
	//Si el div de detalles lo está usando esta vista 
	// => actualizar el div de detalles también	
	if(ClientView.showingDetails == this){
		ClientView.getInputDate().value = model.date;
		ClientView.divDetails.querySelector('input[name="name"]').value = model.name;
		ClientView.divDetails.querySelector('textarea[name="obs"]').value = model.observations;
	}
};

ClientView.prototype.showDetails = function(modelData){
	ClientView.divDetails.style.display = 'block';
	ClientView.showingDetails = this;
	ClientView.setDateOk();
	this.update(modelData);
}

ClientView.prototype.hideDetails = function(){
	ClientView.divDetails.style.display = 'none';
	ClientView.showingDetails = null;
}

ClientView.prototype.selectRow = function(){
	var rowCheckbox = this.tr.querySelector('td[name="multiple_actions"] > input[type="checkbox"]');
	rowCheckbox.checked = true;
	this.tr.classList.add('selected');
}

ClientView.prototype.deselectRow = function(){
	var rowCheckbox = this.tr.querySelector('td[name="multiple_actions"] > input[type="checkbox"]');
	rowCheckbox.checked = false;
	this.tr.classList.remove('selected');
}

ClientView.prototype.getRowCheckbox = function(){
	return this.tr.querySelector('td[name="multiple_actions"] > input[type="checkbox"]');
}

// Controlador de la vista y el modelo del cliente
ClientController = function(model, view){
	var model = model;
	var view = view;
	model.registerObserver(view);
	view.populate(model);

	//EVENT LISTENERS
	// click en la fila del cliente
	view.tr.addEventListener('click', view.showDetails.bind(view/*acceso a this*/, model));

	// se modifica el input "date" del div de detalles del cliente
	this.onClientDateInputChange = this.onClientDateInputChange_single.bind(this, model);
	ClientView.getInputDate().addEventListener('change', 
		this.onClientDateInputChange);

	// click en el checkbox de la fila del cliente
	view.getRowCheckbox().addEventListener('change', this.rowClientCheckboxChanged.bind(this, view, model));

	// click en el checkbox de la cabecera de la tabla de clientes
	// La filosofía ante un evento global o compartido como este, 
	// es reaccionar individualmente: yo, como controlador individual, 
	// tengo que hacer algo ante este evento en lugar de, al ocurrir este evento, 
	// recorrer todos los controladores para mandarles la orden
	document.getElementById('myTableCheckbox').addEventListener('change', this.rowClientCheckboxChanged.bind(this, view, model));

	// En un evento global como este en el que sólo un controlador debería
	// añadir el event listener, se puede redefinir el método "onevent"
	// (en lugar de añadirle EventListeners) ó añadirle un EventListener en
	// un método estático de la clase (ClientController.escCloseDetails())
	document.onkeypress =  function(e){
		if(e.keyCode == 27 /*ESC*/){
			if(ClientView.showingDetails!=null)
			ClientView.showingDetails.hideDetails();
		}
	};
	// Si añadiésemos un EventListener, se ejecutaría uno por modelo creado
	/*document.addEventListener('keypress', function(e){
		if(e.keyCode == 27){
			ClientView.showingDetails.hideDetails();
		}
	});*/

	// Simular un evento random en el script que provoca 
	// la actualización del modelo
	document.getElementById('update_model').addEventListener('click', this.randomEventChangeModel.bind(this, model));
	//END EVENT LISTENERS

	// Esto me impide que desde fuera de esta clase haga cosas como:
	// Controller.model=null;
	// ó
	// Controller.model.name='blabla';
	// Pero sí que me permite cambiar los atributos del modelo desde aquí
	// model.name="blabla";
	// Es decir, convierto el atributo en privado (y no requiere de getter ni setter ya que
	// esto mismo se realiza al acceder al atributo (Controller.model es el propio getter) )
	Object.defineProperty(this,"model",{
		get: function() { return model.copy(); },
		set: function() { }
	});

	Object.defineProperty(this,"view",{
		get: function() { return view },
		set: function() { }
	});
}

ClientController.prototype.rowClientCheckboxChanged = function(view, model, e){
	if(e.target.checked){
		view.selectRow();
		
		//Cambiar el evento del input de la fecha de creación
		ClientView.getInputDate().removeEventListener('change', 
			this.onClientDateInputChange);
		this.onClientDateInputChange = this.onClientDateInputChange_multiple.bind(this, model);
		ClientView.getInputDate().addEventListener('change', 
			this.onClientDateInputChange);
	}
	else{
		view.deselectRow();

		//Cambiar el evento del input de la fecha de creación
		ClientView.getInputDate().removeEventListener('change', 
			this.onClientDateInputChange);
		this.onClientDateInputChange = this.onClientDateInputChange_single.bind(this, model);
		ClientView.getInputDate().addEventListener('change', 
			this.onClientDateInputChange);
	}
}

ClientController.prototype.randomEventChangeModel = function(model, e){
	//newModelData es una variable global que genera un id aleatorio
	//Si NO es mi modelo => break
	if(newModelData.id != model.id) return;
	console.log(newModelData.id);
	model.date = newModelData.date;
	model.name = newModelData.name;
	model.observations = newModelData.observations;
}

// Si cambia el input date y la fila NO está seleccionada con un checkbox
ClientController.prototype.onClientDateInputChange_single = function(model, e){

	//Si yo soy el controlador que se está mostrando en los detalles, modifico mi modelo
	if(ClientView.showingDetails === this.view){
		model.date = ClientView.getInputDate().value;
		//Si no son iguales es que el modelo no ha querido el dato (no ha pasado los filtros)
		if(model.date != ClientView.getInputDate().value){
			ClientView.setDateWrong();
		}else{
			ClientView.setDateOk();
		}
	}
}

// Si cambia el input date y la fila está seleccionada con un checkbox
ClientController.prototype.onClientDateInputChange_multiple = function(model, e){
	model.date = ClientView.getInputDate().value;
	//Si no son iguales es que el modelo no ha querido el dato (no ha pasado los filtros)
	if(model.date != ClientView.getInputDate().value){
		ClientView.setDateWrong();
	}else{
		ClientView.setDateOk();
	}
}

// sólo para el debugging
var allMVC = [];
window.addEventListener('load', function(e){
	//Inicializar las variables estáticas de la vista
	ClientView.init();
	for (var i = clients.length - 1; i >= 0; i--) {
		var client = new Client(clients[i].id, clients[i].fecha, clients[i].nombre, clients[i].observaciones);
		var view = new ClientView();
		var controller = new ClientController(client, view);
		allMVC.push({
			client: client,
			view: view,
			controller: controller
		});
	}
});