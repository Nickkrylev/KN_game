//moving
//перевести движение карты на transform
//позиционирование не убирать
document.addEventListener('keydown', onKeydown);
document.addEventListener('keyup', onKeyup);

let player_x = 550;
let player_y = 900;


let platforms1 = [
{
	x:2000,
	width:1000,
}, 
{
	x:6000,
	width:1000,
}, 
];
let platforms2 = [
{
	x:3400,
	width:500,
}, 
{
	x:5100,
	width:500,
}, 
];
let platforms3 = [
{
	x: 500,
	width: 1000,
}, 
{
	x: 2000,
	width: 500,
}, 
{
	x: 3000,
	width: 500,
}, 
{
	x: 4000,
	width: 1000,
}, 
{
	x: 5500,
	width: 500,
}, 
{
	x: 6500,
	width: 500,
}, 
{
	x: 7500,
	width: 1000,
}, 

];
let platforms4 = [
{
	x:3100,
	width:500,
}, 
{
	x:5400,
	width:500,
}, 
];
let platforms5 = [
{
	x:2100,
	width:500,
}, 
{
	x:6400,
	width:500,
}, 
];


let platform_x = 500;
let platform_y = 1000;


let fallingEnergy = 0;
let step = 10;

let movingID = null;
let fallingID = null;


let movingRight = false;
let movingLeft = false;
let fallState = false;

//Ivanna
function castleChange(){	
	if ( player_x >= 1200 ){
		TeamBlueCastleBack1.style.backgroundImage = "url('Castle Back Blue 1.png')";
		TeamBlueCastleFront.style.opacity = 1;
	}
	else if ( player_x <= 1200 ){
		TeamBlueCastleBack1.style.backgroundImage = "url('Castle Back Blue 2.png')";
		TeamBlueCastleFront.style.opacity = 0;
	}
}

function onKeydown( e ){	
	castleChange();
	if( e.code === 'KeyD' && movingRight === false ){
		cancelAnimationFrame( movingID );
		movingRight = true;
		moveRight();
		Main_character.style.backgroundImage = "url('Character Blue Right.png')";
	}
	else if( e.code === 'KeyA' && movingLeft === false ){
		cancelAnimationFrame( movingID );
		movingLeft = true;
		moveLeft();
		Main_character.style.backgroundImage = "url('Character Blue Left.png')";	
	}

	else if( e.code === 'KeyW' && fallState === false ){
		fallState = true;
		jump();
	}

}
function onKeyup( e ){
	if( e.code === 'KeyD' && movingRight === true ){
		movingRight = false;
		cancelAnimationFrame( movingID );
		if( movingLeft === true ){
			moveLeft();
			Main_character.style.backgroundImage = "url(Character Blue Left.png)";
		}
		
	}
	else if( e.code === 'KeyA' && movingLeft === true ){
		movingLeft = false;
		cancelAnimationFrame( movingID );
		if( movingRight === true ){
			moveRight();
			Main_character.style.backgroundImage = "url(Character Blue Right.png)";
		}
	}
}

function moveRight(){
	castleChange();
	movingID = requestAnimationFrame( moveRight );
	player_x+= step;
	let player_x1 = 'calc(50% + '+ (-player_x-50) + 'px)';
	game_space.style.left = player_x1;
	
	
	// не пашет нормально
	//game_space.style.transform = 'translatex(' + player_x1 + ')';
}
function moveLeft(){
	castleChange();
	movingID = requestAnimationFrame( moveLeft );
	let player_x1 = 'calc(50% + '+ (-player_x-50) + 'px)';
	player_x-= step;
	game_space.style.left = player_x1;
	
	// не пашет нормально
	//game_space.style.transform = 'translatex(' + player_x1 + ')';
}
function jump(){
	fallingEnergy = -27;
	falling();
}


function falling(){
	
	if (player_y>=5000){
     player_y = 0;
	 

	}
	
	heightCheck_1()
	heightCheck_2()
	heightCheck_3()
	heightCheck_4()
	heightCheck_5()
	
	if(fallState === true){
		fallStep();
	}
	
}
function fallStep(){
			if(fallingEnergy < 30 ){
			fallingEnergy +=0.75;
			}
			fallingID = requestAnimationFrame( falling );
			player_y += fallingEnergy;
			let player_y1 = 'calc(50% + '+ (-player_y-50) + 'px)';
			game_space.style.top = player_y1;
	
}
function heightCheck_1(){
	if((player_y + 100 + fallingEnergy)>= 400 && player_y+75<= 400){
		for( let i=0; i < platforms1.length; i++){
			if(player_x+50>= platforms1[i].x && player_x+50 <= (platforms1[i].x + platforms1[i].width )&& fallingEnergy>=0 ){
				fallingEnergy =0;
				cancelAnimationFrame( fallingID );
				player_y =  400 - 75;
				fallState = false;
				let player_y1 = 'calc(50% + '+ (-player_y-50) + 'px)';
				game_space.style.top = player_y1;
			}
		}
	}
}
function heightCheck_2(){
	if((player_y + 100 + fallingEnergy)>= 600 && player_y+75<= 600){
		for( let i=0; i < platforms2.length; i++){
			if(player_x+50>= platforms2[i].x && player_x+50 <= (platforms2[i].x + platforms2[i].width )&& fallingEnergy>=0 ){
				fallingEnergy =0;
				cancelAnimationFrame( fallingID );
				player_y =  600 - 75;
				fallState = false;
				let player_y1 = 'calc(50% + '+ (-player_y-50) + 'px)';
				game_space.style.top = player_y1;
			}
		}
	}
	
}
function heightCheck_3(){
	if((player_y + 100 + fallingEnergy)>= 1000 && player_y+75<= 1000){
		for( let i=0; i < platforms3.length; i++){
			if(player_x+50>= platforms3[i].x && player_x+50 <= (platforms3[i].x + platforms3[i].width )&& fallingEnergy>=0 ){
				fallingEnergy =0;
				cancelAnimationFrame( fallingID );
				player_y =  1000 - 75;
				fallState = false;
				let player_y1 = 'calc(50% + '+ (-player_y-50) + 'px)';
				game_space.style.top = player_y1;
			}
		}
	}
	
}
function heightCheck_4(){
	if((player_y + 100 + fallingEnergy)>= 1600 && player_y+75<= 1600){
		for( let i=0; i < platforms4.length; i++){
			if(player_x+50>= platforms4[i].x && player_x+50 <= (platforms4[i].x + platforms4[i].width )&& fallingEnergy>=0 ){
				fallingEnergy =0;
				cancelAnimationFrame( fallingID );
				player_y =  1600 - 75;
				fallState = false;
				let player_y1 = 'calc(50% + '+ (-player_y-50) + 'px)';
				game_space.style.top = player_y1;
			}
		}
	}
	
}
function heightCheck_5(){
	if((player_y + 100 + fallingEnergy)>= 1700 && player_y+75<= 1700){
		for( let i=0; i < platforms5.length; i++){
			if(player_x+50>= platforms5[i].x && player_x+50<= (platforms5[i].x + platforms5[i].width )&& fallingEnergy>=0 ){
				fallingEnergy =0;
				cancelAnimationFrame( fallingID );
				player_y =  1700 - 75;
				fallState = false;
				let player_y1 = 'calc(50% + '+ (-player_y-50) + 'px)';
				game_space.style.top = player_y1;
			}
		}
	}
	
}


setInterval(()=>{
	if(fallState === false){
		fallState = true;
		falling();
	}
}, 100 );












