
//~~~~~~~~~~~~~~~~~~~~~~~import~~~~~~~~~~~~~~~~~~~~~~~~
//const { player_x, player_y, fallingEnergy  } = require('./moving.js');
//const {moving} = require('./moving.js');

document.addEventListener('keydown', onKeydown);
 

let flag_x = 4500;
let flag_y = 900;
let radius = 100;
let flag_state = 'calm';
let flagID = null;
let flag_energy = 0;

function onKeydown( e ){
	// e.key

	if( e.code === 'KeyE' &&( flag_state === 'droped' || flag_state === 'calm' )&& (player_x + radius )>= flag_x &&  (player_x - radius )<= flag_x && (player_y + radius )>= flag_y && (player_y - radius )<= flag_y ){
		flag_state = 'catched';
		moveFlag();
	}
	else if( e.code === 'KeyR' &&  flag_state === 'catched'){
		flag_state = 'droped';
		cancelAnimationFrame( flagID );
		falling_flag();
		flag_energy = -10;
	}

}

	function moveFlag(){

	
	flagID = requestAnimationFrame( moveFlag );
	flag_x = player_x;
	flag_y = player_y;
	
	
	flag.style.left = flag_x + 'px';
	flag.style.top = flag_y + 'px';

}


/*

function falling_flag(){
if (flag_x+100 >= platform_x && flag_x <= (platform_x + 500) &&( platform_y - (flag_y+100)) <= flag_energy && (flag_y+100) <= platform_y){
		flag_energy =0;
		cancelAnimationFrame( flagID );
		flag_y =  platform_y - 100;
		flag.style.top = (flag_y+5)+ 'px';
		flag_state = 'droped';


}	
	else{
		if(flag_energy < 30 ){
		flag_energy +=0.75;
		}
		flagID = requestAnimationFrame( falling_flag );
		flag_y += flag_energy;
		
		flag.style.top = (flag_y)+ 'px';
		
	}


}
setInterval(()=>{
	if((flag_x+100 <= platform_x || flag_x >= (platform_x + 500) || flag_y <(platform_y - 100) ||  flag_y >= platform_y ) && flag_state === 'droped'){
		flag_state = 'catched';
		falling_flag();
	}

}, 100 );


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
	if((flag_y + 100 + fallingEnergy)>= 1700 && flag_y+85<= 1700){
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

	if((flag_x+100 <= 4000 || flag_x >= 5000 || flag_y <900 ||  flag_y >= 1000 ) && flag_state === 'calm'){
		flag_state = 'droped';
		falling_flag();
			console.log('shesh');
	}
}, 100 );

