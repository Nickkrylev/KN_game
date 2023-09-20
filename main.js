const { app, BrowserWindow, ipcMain,ipcRenderer } = require( 'electron' );

//const { username } = require('./public/Main menu/Main menu.js');

let IP = null;
let Nick = null;





//const { networkInterfaces } = require('os');
/*
const { port } = require('./public/Main menu/create game.js');
console.log(port.port);
*/

app.on( 'ready', onAppReady );

function onAppReady(){
	const win = new BrowserWindow({
			webPreferences : {
				nodeIntegration  :true,
			},
			resizable: false,
			fullscreen:true,
			autoHideMenuBar:true,
	
	});
	//win.loadFile( 'public/Main menu/Main menu.html' );
	win.loadFile( 'public/Main menu/Main Menu.html' );
	
	let connect_ip = null;
	
	ipcMain.on('connectServ',(event,data)=>{
		//win.webContents.send('resenddata',data);
		connect_ip = data;
		console.log( 'got ip : ' + connect_ip );
	});

	ipcMain.on('i_want_ip',()=>{
		console.log( 'send ip: ',connect_ip);
		win.webContents.send('resenddata',connect_ip);
		win.webContents.send('resendnick',Nick);
	});


	ipcMain.on('createServ',(event,data)=>{
	createServer(data);
	win.webContents.send('createServ',`${IP}:${data}`);
});
ipcMain.on('iWantNick',()=>{
		win.webContents.send('resendnick',Nick);
	});

}
function _getSelfIps(){
	const { networkInterfaces } = require('os');

	const nets = networkInterfaces();
	const results = {}; 

	for (const name of Object.keys(nets)) {
		for (const net of nets[name]) {
			// skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
			if (net.family === 'IPv4' && net.internal === false ) {
				if ( results[name] !== '' ) {
					results[name] = [];
				}
				results[name].push(net.address);
			}
		}
	}

	return results;
}

function _printSelfIps(){
	const IPs = Object.entries( _getSelfIps() );
	for( const [adapter, ip ] of IPs ){
		IP = `${ip}`;
		console.log(IP );
		//console.log( `${adapter} : ${ip}` );
	}
}

function VLADIMIR(){
	const IPs = Object.entries( _getSelfIps() );
	const IPs_array = [];
	for( const [adapter, ip ] of IPs ){
		IPs_array.push( ip );
	}
	return IPs_array.flat();
}

module.exports = VLADIMIR;
_printSelfIps();



ipcMain.on('Nickname',(event,data)=>{
	Nick = data;
	
});



/*
ipcMain.on('connectServ',(event,data)=>{
win.webContents.send('resenddata',data);
	
});

*/


function createServer(m){
	const fs = require( 'fs' );
	const http = require( 'http' );
	const server = http.createServer( onConnectionHttp );
	const port = m;
	console.log(port);
	
	// 2 шаг - поднять io сервер для обмена данными между игроками 
	// socket.io - модуль для быстрого обмена сообщениями через сервер 
	
	// подключение и настройка сервера на основе http сервера 
	const io = require('socket.io');
	const ioServer = io( server );
			
	//ioServer.set('transports', ['websocket']);
	ioServer.on('connection', onConnectSocket ); 
	
	// массив игроков ( храним игроков и их координаты )
	const players = [];
	// массив сокетов игроков 
	const players_sockets = [];

	
	// обработка http запросов ( http сервер выдает файлы )
	function onConnectionHttp( req, res ){
		
		console.log( 'connection' );
		
		if( req.url === '/' ){
			fs.readFile('public/game/game space.html',(err,data)=>{
				if( err ) console.log( err );
				res.end( data );
			});
		}
		else if( req.url === '/index.js' ){
			fs.readFile('public/index.js',(err,data)=>{
				if( err ) console.log( err );
				res.end( data );
			});
		}
	}
	

	// Обработка socket.io запросов ( обмен данными между игроками )
	function onConnectSocket( socket ){
		console.log('ioServer : new socket connected');
				
		/*
			схема обработки сообщений пользователя 
			socket - подключенный пользователь
			
			socket.on('название канала связи',( полученные данные )=>{
				// что-то делаем 
			});
			
			// отправка юзеру данных 
			socket.emit( 'название канала связи', параметры );
			
			// отправка данных всем юзерам, кроме текущего 
			socket.broadcast.emit( 'название канала связи', параметры );
			
			// отправка данных всем юзерам
			ioServer.emit( 'название канала связи', параметры );
		*/
				
				
		/*---- тут установка прослушивания на действия игрока  ( обработка его собщений сервером -------*/
		
		
		
		
		
		
		
				
		// если кто-то вышел
		socket.on('disconnect', ()=>{
			console.log( 'socket disconnected' );
			
			// сообщаем всем удалить его элемент по номеру 
			socket.broadcast.emit( 'some_player_disconnect', socket.num, players[socket.num].name );
			
			// удаляем его из массива игроков 
			players.splice( socket.num, 1 );
			
			// удаляем его сокет из массива сокетов 
			players_sockets.splice( socket.num, 1 );
			
			// кореекстирвока номеров игроков 
			for( let i = socket.num;i<players_sockets.length; i++){
				players_sockets[ i ].num--;
			}
		});
		
		
		// если игрок двинулся
		socket.on( 'player_move', (x,y,num,facing)=>{
			// обновляем его координаты в его обекте ( в массиве игроков )

			players[ num ].x = x;
			players[ num ].y = y;
			players[ num ].facing = facing;
			//console.log(`${players[ num ].x},${players[ num ].y},${num}`);
			// отсылаем всем его координаты и номер, чтобы его сдвинули 
			ioServer.emit( 'some_player_moved', x,y,num,facing);
		});
	let flag_x = 4500;
	let flag_y = 900;
	let radius = 100;
	let flag_state = 'calm';
	let flagID = null;
	let flag_energy = 0;
	let who_catched=null;
	let n= null;
		
		
			socket.on( 'flag_coords', ()=>{
			socket.emit(  'flag_coords',flag_x, flag_y);
		});
		
		socket.on('wanttocatchflag',(num)=>{
			let x = players[num].x;
			let y = players[num].y;
			console.log(x,y);
			console.log(( ( flag_state === 'droped' || flag_state === 'calm' )&& (x + radius )>= flag_x &&  (x - radius )<= flag_x && (y + radius )>= flag_y &&( y - radius )<= flag_y ));
			if( ( flag_state === 'droped' || flag_state === 'calm' )&& (x + radius )>= flag_x &&  (x - radius )<= flag_x && (y + radius )>= flag_y &&( y - radius )<= flag_y ){
			flag_state = 'catched';
			who_catched = num;
		
		 n = setInterval(()=>{
		flag_x = x;
		flag_y = y;	
		
			},10);
		}
		});
		socket.on('wanttodropflag',(num)=>{
		if(  flag_state === 'catched'&& who_catched=== num){
		flag_state = 'droped';
		who_catched=null;
		clearInterval(n);
		falling_flag();
		flag_energy = -10;
		}	
		
		});

function falling_flag(){

	if (flag_y>=5000){
	 cancelAnimationFrame( flagID );
     flag_x = 4500;
	 flag_y = 900;
	 flag_state = 'calm';
	 flag.style.left = flag_x + 'px';
	flag.style.top = flag_y + 'px';
	}
	
	flagCheck_1()
	flagCheck_2()
	flagCheck_3()
	flagCheck_4()
	flagCheck_5()
	
	if(flag_state === 'droped'){
		flag_fallStep();
	}
	
}
function flag_fallStep(){
			if(flag_energy < 30 ){
			flag_energy +=0.75;
			}

			flagID = requestAnimationFrame( falling_flag );
			flag_y += flag_energy;
			flag.style.top = flag_y + 'px';
			
			 
			
			
}

function flagCheck_1(){
	if((flag_y + 100 + flag_energy)>= 400 && flag_y+85<= 400){
		for( let i=0; i < platforms1.length; i++){
			if(flag_x>= platforms1[i].x && flag_x+100 <= (platforms1[i].x + platforms1[i].width ) ){
				flag_energy =0;
				cancelAnimationFrame( flagID );
				flag_y =  400 - 85;
				flag_state = 'calm';
				flag.style.top = flag_y + 'px';
			}
		}
	}
}
function flagCheck_2(){
	if((flag_y + 100 + flag_energy)>= 600 && flag_y+85<= 600){
		for( let i=0; i < platforms2.length; i++){
			if(flag_x>= platforms2[i].x && flag_x+100 <= (platforms2[i].x + platforms2[i].width ) ){
				flag_energy =0;
				cancelAnimationFrame( flagID );
				flag_y =  600 - 85;
				flag_state = 'calm';
				flag.style.top = flag_y +'px';
			}
		}
	}
	
}
function flagCheck_3(){
	if((flag_y + 100 + flag_energy)>= 1000 && flag_y+85<= 1000){
		for( let i=0; i < platforms3.length; i++){
			if(flag_x>= platforms3[i].x && flag_x+100 <= (platforms3[i].x + platforms3[i].width ) ){
				flag_energy =0;
				cancelAnimationFrame( flagID );
				flag_y =  1000 - 85;
				flag_state = 'calm';
				flag.style.top = flag_y + 'px';
			}
		}
	}
	
}
function flagCheck_4(){
	if((flag_y + 100 + flag_energy)>= 1600 && flag_y+85<= 1600){
		for( let i=0; i < platforms4.length; i++){
			if(flag_x>= platforms4[i].x && flag_x+100 <= (platforms4[i].x + platforms4[i].width ) ){
				flag_energy =0;
				cancelAnimationFrame( flagID );
				flag_y =  1600 - 85;
				flag_state = 'calm';
				flag.style.top = flag_y+ 'px';
			}
		}
	}
	
}
function flagCheck_5(){
	if((flag_y + 100 + flag_energy)>= 1700 && flag_y+85<= 1700){
		for( let i=0; i < platforms5.length; i++){
			if(flag_x>= platforms5[i].x && flag_x+100 <= (platforms5[i].x + platforms5[i].width ) ){
				flag_energy =0;
				cancelAnimationFrame( flagID );
				flag_y =  1700 - 85;
				flag_state = 'calm';
				flag.style.top = flag_y+ 'px';
			}
		}
	}
	
}






setInterval(()=>{

	if((flag_x+100 <= 4000 || flag_x >= 5000 || flag_y <900 ||  flag_y >= 1000 ) && flag_state !== 'catched'){
		flag_state = 'droped';
		falling_flag();
		console.log('d ', ((flag_x+100 <= 4000 || flag_x >= 5000 || flag_y <900 ||  flag_y >= 1000 ) && flag_state !== 'catched'))
	}
}, 10 );
		

		socket.on('send_name',( name )=>{
			console.log('kjhgfds');
			// добавляем его сокет в массив
			players_sockets.push( socket );
			
			// отправляем подключившемуся игроку массив игроков ( чтобы он у себя их отрисовал )
			socket.emit('send_players', players);
			
			// добавляем подключившегося игрока в массив игроков 
			players.push({ 
				x : 550,
				y : 900,
				name : name,
				facing : 0,
			});
			
			// устанавливаем ( запоминаем ) номер подключившегося игрока 
			socket.num = players.length - 1;
			 
			// сказали новому игроку заспавниться
			socket.emit('spawn', socket.num,  );
			
			// говорим всем в игре о новом игроке 
			socket.broadcast.emit('new_player', players[socket.num].name );
		
		});
		
		
		
	}

	server.listen( port,()=>{
		console.log( 'server online' );
	});
}
	