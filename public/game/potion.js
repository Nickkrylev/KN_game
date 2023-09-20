document.addEventListener('keydown', onKeydown);

let potion1_x = 2343;
let potion1_y = 357;
let potion_radius = 70;
let potion1_state = 'placed';
let panel_potion1_state = 'taken';
let potion_hp = 49;
let hp = HP.offsetHeight;

function onKeydown( e ){

	if( e.code === 'KeyQ' && ( potion1_state === 'placed') && ( panel_potion1_state === 'taken') && (player_x + potion_radius )>= potion1_x &&  (player_x - potion_radius )<= potion1_x && (player_y + potion_radius )>= potion1_y && (player_y - potion_radius )<= potion1_y ){
		potion1_state = 'taken';
		setTimeout(CreatePotion, 10000);
		panel_potion1_state = 'placed';
		Potion();
	}
	else if( e.code === 'KeyQ' && ( panel_potion1_state === 'placed')){
		PanelIcon4.style.display = 'none';
		panel_potion1_state = 'taken';	
		if(HP.offsetHeight >= 49){
			HP.style.height = '98px';
		}
		else{	
			HP.style.height = hp + potion_hp + 'px';
		}
	}
	else{
		
	}

}

function Potion(){
	potion1.style.display = 'none';
	PanelIcon4.style.display = 'block';
}

function CreatePotion(){
	potion1.style.display = 'block';
	potion1_state = 'placed';
}