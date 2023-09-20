const {ipcMain, ipcRenderer } = require( 'electron' );		
// настройка соединения с сервером 
console.log('i_want_ip');	
ipcRenderer.send( 'i_want_ip');
	
let adress;
let nickname;

let my_num = null;
let playerElem = null;

let motionID = null;
ipcRenderer.on('resendnick',(event,data)=>{
	nickname=data;
});
ipcRenderer.on('resenddata',(event,data)=>{//вот тут начинается штука, где мы поймали айпи
	

 adress = data;
console.log(adress);

//const socket_config = { transports: ['websocket'], upgrade: false, autoConnect: false };




// создания сокета ( объекта подключения к серверу и обмена с ним сообщениями )
const socket = io( `http://${ adress }` /*, socket_config */);

// происходит автоматически по подключению к серверу 
socket.on('connect', ()=>{
	console.log( 'socket connected' );
	
	
	/*------тут ставим прослушку на сообщения от сервера -------*/
	
	
	// получили команду заспавнится ( получая свой номер )
	socket.on('spawn', ( num )=>{
		createPlayer();
		// запоминаем свой номер
		
		my_num = num;
		 sendCoords();
		// запоминаем свой элемент для движения

	});
	 
	// получение игроков, которые были уже в игре до нас 
	socket.on('send_players', ( players )=>{
		// создаем элементы под них 
		createPlayers( players );
		
	});
	
	// новый игрок ( кто-то зашел в игру )
	socket.on('new_player', ( name )=>{
		console.log('new_player');
		// создаем его элемент
		createPlayer();

	});
	  
	// кто-то вышел
	socket.on('some_player_disconnect', ( num, name )=>{
		// удаляем его элемент по номеру 
		players_box.children[ num ].remove();
		 
		console.log('remove name : ' + name );
		
		// удаление имени игрока из панели имен по имени 
		
	});
	
	// кто-то из игроков двигается 
	socket.on('some_player_moved', (x,y,num,facing)=>{
		// ставим его элементу ( по номеру ) его координаты 
		players_box.children[ num ].style.top = y + 'px';
		players_box.children[ num ].style.left = x + 'px';
		
		if(facing==0){
			players_box.children[ num ].style.transform = 'scale(1, 1)';
			}
		else if(facing==1){
		players_box.children[ num ].style.transform = 'scale(-1, 1)';
		}
	});
	

	
// подключаемся к серверу 
socket.connect(); 

});


/*

// заполнение имен игроков
function fillNames( players ){ console.log(players)
	for( let i =0; i < players.length; i++){
		createNameLine( players[ i ].name );
	}
}

function createNameLine( name ){
	const nameLine = document.createElement( 'div' );
	nameLine.classList.add( 'nameLine' );
	nameLine.textContent = name;
	players_names_panel.append( nameLine );
}
*/
// создание игрока ( его элемент ) и добавляем на страницу 
function createPlayer( x=550, y=900, name='виталя' ){
	const div = document.createElement( 'div' );
	console.log('createPlayer');
	
	div.classList.add( 'player' );
	div.style.top = y + 'px';
	div.style.left = x + 'px';
	players_box.append( div );
	div.innerHTML = "<div class='character_box' ><div class='other_character'><div class='Main_craracter_blue'></div></div></div>";
	return div;
}

// создание игроков ( нескольких )
function createPlayers( players ){
	for( let i = 0; i < players.length; i++){
		console.log('createPlayers', players[i].x, players[i].y );
		createPlayer( players[i].x, players[i].y, players[i].name );
	}
}

function sendCoords(){
	motionID = requestAnimationFrame( sendCoords );
	socket.emit( 'player_move', player_x,player_y,my_num,facing );
	socket.emit( 'flag_coords' );
	
}
socket.on( 'flag_coords', (flag_x, flag_y)=>{
	flag.style.left = flag_x + 'px';
	flag.style.top = flag_y + 'px';
	console.log(flag_x, flag_y);
		});





// движение
document.addEventListener('keydown', onKeydown);
	// e.key - клавиша нажатая человеком 
	
function onKeydown( e ){
	// e.key

	if( e.code === 'KeyE' ){
		socket.emit('wanttocatchflag',my_num);
		console.log(my_num);
	}
	else if( e.code === 'KeyR'){
			socket.emit('wanttodropflag',my_num);
			console.log(my_num);
	}

}




//document.addEventListener( 'keyup', newPlayerName);
newPlayerName();
function newPlayerName(){

	socket.emit('send_name',nickname);

}

});	//а вот тут заканчивается

