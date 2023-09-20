const {ipcMain, ipcRenderer } = require( 'electron' );			
			 let value;
			 let ID;
			todos = [];
			   
             //  document.getElementById('connectInput2').oninput = function () {
              //   if (this.value.length > 4) this.value = this.value.substr(0, 4); // в поле можно ввести только 4 символов
             // }
			   
			   ConnectToserver.addEventListener("click", Portcheck);
			   
			   function Portcheck(){
			  /* if(connectInput2.value<1000){
			   
			      value = connectInput2.value;
					connectInput2.value <1000;
				   
					console.log(value);
					todos.push(value);
             
			 
			 connectInput2.style.border = "7px solid red";
			 connectInput2.style.color = "red";
			   }
			   
			   else{*/
				   ID = connectInput2.value;
				    ipcRenderer.send('connectServ',ID);
			      document.location.href = "../game/game space.html";
			  // }
			   }
			  
	