const {ipcMain, ipcRenderer } = require( 'electron' );
			let value;
			todos = [];
			let Nick;
			findGame.addEventListener('click', funcia);
			createGame.addEventListener('click',funcia1);
			   
			function funcia(){
			
				if(nicknameInput.value!=''){
					value = nicknameInput.value;
					todos.push(value);
					Nick=nicknameInput.value;
					ipcRenderer.send('Nickname',Nick);
			        document.location.href = "find game.html";
				}
				else{
					nicknameInput.style.border = "7px solid #893b3b";
					nicknameInput.classList.add("error");	
				}
			}
			function funcia1(){
			
			if(nicknameInput.value!=''){
					value = nicknameInput.value;
					nicknameInput.style.border = "7px solid #282c42";
					nicknameInput.classList.remove("error");
					todos.push(value)
			        document.location.href = "create game.html";
				}
				else{
					nicknameInput.style.border = "7px solid #893b3b";
					nicknameInput.classList.add("error");
					
				}
			}
			/*
			function checkEmptyInput(){
				
				if(nicknameInput.value!=''){		
					nicknameInput.style.border = "7px solid #282c42";
					nicknameInput.style.color = "#5c6282";
					nicknameInput.classList.remove("error");					
				}
				else{
					nicknameInput.style.border = "7px solid #893b3b";
					nicknameInput.style.color = "#b06161";
					nicknameInput.classList.add("error");
				}
				
			}
			*/
				ipcRenderer.send( 'iWantNick');

			ipcRenderer.on('resendnick',(event,data)=>{
			nicknameInput.value=data;
			});
			
			   
