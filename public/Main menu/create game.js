const {ipcMain, ipcRenderer } = require( 'electron' );
	 let value;
			todos = [];
			

let port = document.getElementById('connectInput1').value;
				  
			   
               document.getElementById('connectInput1').oninput = function () {
                 if (this.value.length > 4) this.value = this.value.substr(0, 4); // в поле можно ввести только 4 символов
               }
			   
			   ConnectToserver.addEventListener("click", Portcheck);
			   
			   function Portcheck(){
			   if(connectInput1.value<1000){
			   
			      value = connectInput1.value;
					connectInput1.value <1000;
				   
					console.log(value);
					todos.push(value);
             
					connectInput1.style.border = "7px solid #893b3b";
					connectInput1.style.color = "#b06161";
					connectInput1.classList.add("error");
			   }
			   
			   else{
				  
				 port = document.getElementById('connectInput1').value;
				 ipcRenderer.send('createServ',port);
				ConnectToserver.removeEventListener('click', Portcheck);
				 
			     // document.location.href = "../game/game space.html";
			   }
			   }
ipcRenderer.on('createServ',(event,data)=>{
ConnectToserver.textContent=data;
console.log(data);
ConnectToserver.style.fontSize='30px';
});