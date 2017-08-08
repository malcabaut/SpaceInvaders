// Variable estado usada para cargar el menú inicial de juego
var menuState = {	
	/**
	 * Método usado para crear los diferentes elementos del menú principal
	 * @method create
	 */
	create: function() {
		// Cargamos fondo y mostramos título y demás mensajes agregando instrucciones para iniciar el juego
		game.skin = game.add.sprite(0, 0, 'skin' + game.skinSeleccionada);
		game.mapaTitulo = game.add.bitmapText(100, 80, 'gem', '', 54);
		game.global.mostrarLetraPorLetra(game.mapaTitulo, 'Space Invaders');
		// Agregamos botones para controlar las opciones de juego
		game.btnJugar = game.add.button(game.world.width - 300, 375, 'botonJugar', this.manejadorClickBotonJugar, this, 0, 1, 0);
		game.btnOpciones = game.add.button(game.world.width - 300, 475, 'botonOpciones', this.manejadorClickBotonOpciones, this, 0, 1, 0);
		game.btnPuntuaciones = game.add.button(game.world.width - 300, 575, 'botonPuntuaciones', this.manejadorClickBotonPuntuaciones, this, 0, 1, 0);
		// Controlamos los eventos over de los botones
		game.btnJugar.onInputOver.add(this.manejadorOverBoton, this);
		game.btnOpciones.onInputOver.add(this.manejadorOverBoton, this);
		game.btnPuntuaciones.onInputOver.add(this.manejadorOverBoton, this);
		// Inicializamos valores e iniciamos la carga de las estrellas en pantalla
		this.inicializarParametros();
		this.cargarLogo();
		game.global.cargarEstrellas();
	},	
	
	/**
	 * Método ejecutado cada frame para actualizar la lógica del juego
	 * @method update
	 */
    update: function() {
		// Actualizamos estrellas mostradas, logo y posicionamos por encima botones y texto mostrados
		this.actualizarLogo();
		game.global.actualizarEstrellas();
		game.world.bringToTop(game.mapaTitulo);
		game.world.bringToTop(game.btnJugar);
		game.world.bringToTop(game.btnOpciones);
		game.world.bringToTop(game.btnPuntuaciones);
	},
	
	/**
	 * Función usada para controlar el evento hover en todos los botones a nivel general
	 * @method manejadorOverBoton
	 */
	manejadorOverBoton: function() {
		game.sfxHover.play();
	},

	/**
	 * Función usada para controlar el evento click en el botón jugar
	 * @method manejadorClickBotonJugar
	 */
	manejadorClickBotonJugar: function() {
		// Reproducimos audio y llamamos al estado nivel 1 y arrancamos juego
		game.sfxStart.play();
		game.state.start('level1');
	},
	
	/**
	 * Función usada para controlar el evento click en el botón opciones
	 * @method manejadorClickBotonOpciones
	 */
	manejadorClickBotonOpciones: function() {
		// Reproducimos audio y llamamos al estado options para mostrar la pantalla de opciones
		game.sfxStart.play();
		game.state.start('options');
	},
	
	/**
	 * Función usada para controlar el evento click en el botón puntuaciones
	 * @method manejadorClickBotonPuntuaciones
	 */
	manejadorClickBotonPuntuaciones: function() {
		// Reproducimos audio y llamamos al estado score para mostrar la pantalla de puntuaciones
		game.sfxStart.play();
		game.state.start('score');
	},
		
	/**
	 * Función usada para controlar el evento click en el botón puntuaciones
	 * @method inicializarParametros
	 */
	inicializarParametros: function() {
		// Cargamos parámetros iniciales de juego
		game.puntos = 0;
		game.nivelNaveEscudo = 1;
		game.nivelNaveDisparo = 1;
		game.nivelNaveVelocidad = 1;
		game.naveBalasRatio = 1000;
		game.naveVelocidad = 200;
		game.velocidadLogo = 0.1;
		game.siguienteNivel = 'level1';
		// Cargamos audios iniciales
		game.sfxHover = game.add.audio('botonHover');
		game.sfxStart = game.add.audio('botonStart');
		game.sfxCancel = game.add.audio('botonCancel');
	},
	
	/**
	 * Función usada para cargar el logo en el menú inicial
	 * @method cargarLogo
	 */
	cargarLogo: function() {
		// Si no hemos cargado previamente el logo
		if (!game.logoIntro) {
			// Lo cargamos en el menú inicial
			game.logo = game.add.sprite(game.world.width / 2, 425, 'logo');
			game.logo.anchor.set(0.5);
			game.logo.scale.x = 0.1;
			game.logo.scale.y = 0.1;
		}
	},
	
	/**
	 * Función usada para actualizar el logo en el menú inicial
	 * @method actualizarLogo
	 */
	actualizarLogo: function() {
		// Si el ancho del logo no ha ocupado la pantalla
		if (game.logo.width < game.world.centerX * 2) { 
			// Ampliamos logo y obtenemos la hora para crear una animación de ampliación
			game.velocidadLogo += 0.005;
			game.logo.scale.x += game.velocidadLogo;
			game.logo.scale.y += game.velocidadLogo;
			game.logo.y -= 4;
			tiempo = game.time.totalElapsedSeconds();
		}
		// Si ha pasado 1 segundo y se cumple la segunda condición
		if (game.time.totalElapsedSeconds() > tiempo + 1 && game.logo.width < game.world.centerX * 300) {
			// Subimos logo para colocarlo encima de los botones
			game.velocidadLogo += 1;
			game.logo.scale.x += game.velocidadLogo;
			game.logo.scale.y += game.velocidadLogo;
			game.logo.y += 10;
		}
	}
};
