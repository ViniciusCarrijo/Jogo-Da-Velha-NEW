let velha = 0; // contador para velha
let winner = false; // se tem um vencedor
let vez = "x"; // vez de quem vai jogar
let vicX = 0; // quantidades de vezes que X ganhou
let vicO = 0; // quantidades de vezes que O ganhou
let level = 0; // nivel selecionado pelo usuario
let jogadas = 0; // contagem para jogar contra bot
let pares = [0,2,4,6,8];
let impares = [1,3,5,7];
let play1 = '<i class="material-icons blue">clear</i>';
let play2 = '<i class="material-icons-outlined red">brightness_1</i>';
let rec = true;

function nivel(){
	level = document.getElementById("dificuldade").value;
	if(level != 0){
		var placar = document.getElementById("placar");
		placar.setAttribute("style","display:none");
	}else{
		var placar = document.getElementById("placar");
		placar.setAttribute("style", "display:flex");
	}

	var botao = document.getElementById("start");
	var corpo = document.getElementById("corpo");
	corpo.setAttribute("style", "display:block");
	
	if(rec){
		botao.innerHTML = '<i class="material-icons">games</i>Recomeçar';
		rec = false;
	}

	restart();
}

function clear(){
	velha = 0;
	winner = false;
	vez = "x";
	jogadas = 0;

	var x = document.querySelectorAll("div.coluna");
	for(var i=0; i<9; i++){
		x[i].innerHTML = "";
	}

	var aux = document.getElementById("velha");
	aux.setAttribute("style", "display:none");

	var div = document.getElementById('vencedor');
	div.innerHTML = "";

	var change = document.getElementById("placar");
	change.innerHTML = 'Jogador: '+play1;
}

function start(){
	level = document.getElementById("dificuldade").value;
	if(level != 0){
		var placar = document.getElementById("placar");
		placar.setAttribute("style","display:none");
	}else{
		var placar = document.getElementById("placar");
		placar.setAttribute("style", "display:flex");
	}

	var botao = document.getElementById("start");
	var corpo = document.getElementById("corpo");
	corpo.setAttribute("style", "display:block");
	
	if(rec){
		botao.innerHTML = '<i class="material-icons">games</i>Recomeçar';
		rec = false;
	}

	clear();
}

function restart(){
	clear();
	var campoA = document.getElementById("x");
	var campoB = document.getElementById("o");
	campoA.innerHTML = play1;
	campoB.innerHTML = play2;
	vicX = 0;
	vicO = 0;
}

function mark(element){
	if(level == 0){
		jogarAmigo(element);
	}
	else if(level == 1){
		if(preencher(element))
			if(jogadas < 8){
				setTimeout(function(){ botFacil(); }, 250);
			}
	}

	else if(level == 2){
		if(preencher(element))
			if(jogadas < 8){
				setTimeout(function(){ botMedio(); }, 250);
			}
	}

	else if(level == 3)
		if(preencher(element))
			if(jogadas < 8)
				setTimeout(function() { botDificil(); }, 250 );
}

function preencher(element){
	if (winner == false)
		if(vez == "x")
			if(element.innerHTML == ""){
				element.innerHTML = play1;
				vez = "o";
				velha++;
				isWinner();
				if(velha == 9 && winner == 0)
					isVelha();
				return true;
			}

	return false;
}

function jogarAmigo(element){
	var change = document.getElementById("placar");
	if(winner == false){
		if(element.innerHTML == ""){
			if(vez == "x"){
				element.innerHTML = play1;
				change.innerHTML = 'Jogador: '+play2;
				vez = "o";
				velha++;
			}else if(element.innerHTML = "o"){
				element.innerHTML = play2;
				change.innerHTML = 'Jogador: '+play1;
				vez = "x";
				velha++;
			}

			isWinner();
			if(velha == 9 && winner == 0)
				isVelha();
		}
	}
}

function botFacil(){
	jogadas++;
	var aux = document.querySelectorAll('div.coluna');
	var vetJogadas = [];
	var pos = 0;
	if(winner == false){
		if(jogadas == 2){
			var marcou = false;
			var calc;

			for(var i=0;i<9; i++){
				if(aux[i].innerHTML == play1){
					vetJogadas[pos] = i;
					pos++;
				}
			}

			if( (vetJogadas[0] == 0 && vetJogadas[1] == 1 || vetJogadas[0] == 3 && vetJogadas[1] == 4 || vetJogadas[0] == 6 && vetJogadas[1] == 7)
			||  (vetJogadas[0] == 0 && vetJogadas[1] == 3 || vetJogadas[0] == 1 && vetJogadas[1] == 4 || vetJogadas[0] == 2 && vetJogadas[1] == 5) 
			||  (vetJogadas[0] == 0 && vetJogadas[1] == 4 || vetJogadas[0] == 2 && vetJogadas[1] == 4) )
				calc = vetJogadas[1]*2 - vetJogadas[0];
			else
			if( (vetJogadas[0] == 3 && vetJogadas[1] == 6 || vetJogadas[0] == 4 && vetJogadas[1] == 7 || vetJogadas[0] == 5 && vetJogadas[1] == 8) 
			||  (vetJogadas[0] == 1 && vetJogadas[1] == 2 || vetJogadas[0] == 4 && vetJogadas[1] == 5 || vetJogadas[0] == 7 && vetJogadas[1] == 8)
			||  (vetJogadas[0] == 4 && vetJogadas[1] == 8 || vetJogadas[0] == 4 && vetJogadas[1] == 6) )
				calc = vetJogadas[0]*2 - vetJogadas[1];
			else
			if( (vetJogadas[0] == 0 && vetJogadas[1] == 8 || vetJogadas[0] == 2 && vetJogadas[1] == 6 || vetJogadas[0] == 3 && vetJogadas[1] == 5 || vetJogadas[0] == 1 && vetJogadas[1] == 7)
			|| 	(vetJogadas[0] == 0 && vetJogadas[1] == 6 || vetJogadas[0] == 1 && vetJogadas[1] == 7 || vetJogadas[0] == 2 && vetJogadas[1] == 8)
			||  (vetJogadas[0] == 0 && vetJogadas[1] == 2 || vetJogadas[0] == 3 && vetJogadas[1] == 5 || vetJogadas[0] == 6 && vetJogadas[1]== 8) )
				calc = (vetJogadas[0] + vetJogadas[1]) / 2;

			if(calc != null){
				calc = parseInt(calc);
				if(aux[calc].innerHTML == ""){
					bolinha(calc);
					marcou = true;
				}
			}else{
				for(var i=0; i<9; i++){
					if(aux[i].innerHTML == ""){
						bolinha(i);
						marcou = true;
						i=9;
					}
				}
			}
		}else{
			for(var i=0; i<9; i++){
				var x = parseInt(Math.random() * 9);
				if(aux[x].innerHTML == ""){
					bolinha(x);
					marcou = true;
					i=9;
				}
			}
		}

		if(marcou == false){
			for(var i=0; i<9; i++){
				if(aux[i].innerHTML == ""){
					bolinha(i);
					i=9;
				}
			}
		}

		isWinner();
		if(velha == 9 && winner == 0)
			isVelha();
	}
}

function botMedio(){
	jogadas++;
	var table = [];
	var slot = [];
	var table = document.querySelectorAll('div.coluna');
	for(var i=0; i<9; i++){
		slot[i] = table[i].innerHTML;
	}

	if(winner == false){
		if(jogadas == 1){
			if(slot[4] == ""){
				bolinha(4);
			}else{
				var aleatorio = [1,3,5,7];
				var a = Math.floor(Math.random() * 4);
				bolinha(aleatorio[a]);
			}
		}
		else if(slot[0] == play2 && slot[1] == play2 && slot[2] == ""){bolinha(2);}
		else if(slot[3] == play2 && slot[4] == play2 && slot[5] == ""){bolinha(5);}
		else if(slot[6] == play2 && slot[7] == play2 && slot[8] == ""){bolinha(8);}
		else if(slot[0] == play2 && slot[3] == play2 && slot[6] == ""){bolinha(6);}
		else if(slot[1] == play2 && slot[4] == play2 && slot[7] == ""){bolinha(7);}
		else if(slot[2] == play2 && slot[5] == play2 && slot[8] == ""){bolinha(8);}
		else if(slot[0] == play2 && slot[4] == play2 && slot[8] == ""){bolinha(8);}
		else if(slot[2] == play2 && slot[4] == play2 && slot[6] == ""){bolinha(6);}
		else if(slot[1] == play2 && slot[2] == play2 && slot[0] == ""){bolinha(0);}
		else if(slot[4] == play2 && slot[5] == play2 && slot[3] == ""){bolinha(3);}
		else if(slot[7] == play2 && slot[8] == play2 && slot[6] == ""){bolinha(6);}
		else if(slot[3] == play2 && slot[6] == play2 && slot[0] == ""){bolinha(0);}
		else if(slot[4] == play2 && slot[7] == play2 && slot[1] == ""){bolinha(1);}
		else if(slot[5] == play2 && slot[8] == play2 && slot[2] == ""){bolinha(2);}
		else if(slot[4] == play2 && slot[8] == play2 && slot[0] == ""){bolinha(0);}
		else if(slot[4] == play2 && slot[6] == play2 && slot[2] == ""){bolinha(2);}
		else if(slot[0] == play2 && slot[2] == play2 && slot[1] == ""){bolinha(1);}
		else if(slot[3] == play2 && slot[5] == play2 && slot[4] == ""){bolinha(4);}
		else if(slot[6] == play2 && slot[8] == play2 && slot[7] == ""){bolinha(7);}
		else if(slot[0] == play2 && slot[6] == play2 && slot[3] == ""){bolinha(3);}
		else if(slot[1] == play2 && slot[7] == play2 && slot[4] == ""){bolinha(4);}
		else if(slot[2] == play2 && slot[8] == play2 && slot[5] == ""){bolinha(5);}
		else if(slot[0] == play2 && slot[8] == play2 && slot[4] == ""){bolinha(4);}
		else if(slot[2] == play2 && slot[6] == play2 && slot[4] == ""){bolinha(4);}
		else if(slot[0] == play1 && slot[1] == play1 && slot[2] == ""){bolinha(2);}
		else if(slot[3] == play1 && slot[4] == play1 && slot[5] == ""){bolinha(5);}
		else if(slot[6] == play1 && slot[7] == play1 && slot[8] == ""){bolinha(8);}
		else if(slot[0] == play1 && slot[3] == play1 && slot[6] == ""){bolinha(6);}
		else if(slot[1] == play1 && slot[4] == play1 && slot[7] == ""){bolinha(7);}
		else if(slot[2] == play1 && slot[5] == play1 && slot[8] == ""){bolinha(8);}
		else if(slot[0] == play1 && slot[4] == play1 && slot[8] == ""){bolinha(8);}
		else if(slot[2] == play1 && slot[4] == play1 && slot[6] == ""){bolinha(6);}
		else if(slot[1] == play1 && slot[2] == play1 && slot[0] == ""){bolinha(0);}
		else if(slot[4] == play1 && slot[5] == play1 && slot[3] == ""){bolinha(3);}
		else if(slot[7] == play1 && slot[8] == play1 && slot[6] == ""){bolinha(6);}
		else if(slot[3] == play1 && slot[6] == play1 && slot[0] == ""){bolinha(0);}
		else if(slot[4] == play1 && slot[7] == play1 && slot[1] == ""){bolinha(1);}
		else if(slot[5] == play1 && slot[8] == play1 && slot[2] == ""){bolinha(2);}
		else if(slot[4] == play1 && slot[8] == play1 && slot[0] == ""){bolinha(0);}
		else if(slot[4] == play1 && slot[6] == play1 && slot[2] == ""){bolinha(2);}
		else if(slot[0] == play1 && slot[2] == play1 && slot[1] == ""){bolinha(1);}
		else if(slot[3] == play1 && slot[5] == play1 && slot[4] == ""){bolinha(4);}
		else if(slot[6] == play1 && slot[8] == play1 && slot[7] == ""){bolinha(7);}
		else if(slot[0] == play1 && slot[6] == play1 && slot[3] == ""){bolinha(3);}
		else if(slot[1] == play1 && slot[7] == play1 && slot[4] == ""){bolinha(4);}
		else if(slot[2] == play1 && slot[8] == play1 && slot[5] == ""){bolinha(5);}
		else if(slot[0] == play1 && slot[8] == play1 && slot[4] == ""){bolinha(4);}
		else if(slot[2] == play1 && slot[6] == play1 && slot[4] == ""){bolinha(4);}
		else{
			for(var i=0; i<9; i++){
				var x = Math.floor(Math.random() * 9);
				if(slot[x] == ""){
					bolinha(x);
					marcou = true;
					i=9;
				}
			}
			if(marcou == false){
				for(var i=0; i<9; i++){
					if(table[i].innerHTML == ""){
						bolinha(i);
						i=9;
					}
				}
			}
		}

		isWinner();

		if(velha == 9 && winner == 0)
			isVelha();
	}
}

function botDificil(){
 	jogadas++;
	var table = [];
	var slot = [];
	var table = document.querySelectorAll('div.coluna');
	for(var i=0; i<9; i++){
		slot[i] = table[i].innerHTML;
	}

	if(winner == false){
		if(jogadas == 1){
			if(slot[4] == ""){
				bolinha(4);
			}else{
				var aleatorio = [0,2,6,8];
				var a = Math.floor(Math.random() * 4);
				bolinha(aleatorio[a]);
			}
		}
		else if(slot[0] == play2 && slot[1] == play2 && slot[2] == ""){bolinha(2);}
		else if(slot[3] == play2 && slot[4] == play2 && slot[5] == ""){bolinha(5);}
		else if(slot[6] == play2 && slot[7] == play2 && slot[8] == ""){bolinha(8);}
		else if(slot[0] == play2 && slot[3] == play2 && slot[6] == ""){bolinha(6);}
		else if(slot[1] == play2 && slot[4] == play2 && slot[7] == ""){bolinha(7);}
		else if(slot[2] == play2 && slot[5] == play2 && slot[8] == ""){bolinha(8);}
		else if(slot[0] == play2 && slot[4] == play2 && slot[8] == ""){bolinha(8);}
		else if(slot[2] == play2 && slot[4] == play2 && slot[6] == ""){bolinha(6);}
		else if(slot[1] == play2 && slot[2] == play2 && slot[0] == ""){bolinha(0);}
		else if(slot[4] == play2 && slot[5] == play2 && slot[3] == ""){bolinha(3);}
		else if(slot[7] == play2 && slot[8] == play2 && slot[6] == ""){bolinha(6);}
		else if(slot[3] == play2 && slot[6] == play2 && slot[0] == ""){bolinha(0);}
		else if(slot[4] == play2 && slot[7] == play2 && slot[1] == ""){bolinha(1);}
		else if(slot[5] == play2 && slot[8] == play2 && slot[2] == ""){bolinha(2);}
		else if(slot[4] == play2 && slot[8] == play2 && slot[0] == ""){bolinha(0);}
		else if(slot[4] == play2 && slot[6] == play2 && slot[2] == ""){bolinha(2);}
		else if(slot[0] == play2 && slot[2] == play2 && slot[1] == ""){bolinha(1);}
		else if(slot[3] == play2 && slot[5] == play2 && slot[4] == ""){bolinha(4);}
		else if(slot[6] == play2 && slot[8] == play2 && slot[7] == ""){bolinha(7);}
		else if(slot[0] == play2 && slot[6] == play2 && slot[3] == ""){bolinha(3);}
		else if(slot[1] == play2 && slot[7] == play2 && slot[4] == ""){bolinha(4);}
		else if(slot[2] == play2 && slot[8] == play2 && slot[5] == ""){bolinha(5);}
		else if(slot[0] == play2 && slot[8] == play2 && slot[4] == ""){bolinha(4);}
		else if(slot[2] == play2 && slot[6] == play2 && slot[4] == ""){bolinha(4);}
		else if(slot[0] == play1 && slot[1] == play1 && slot[2] == ""){bolinha(2);}
		else if(slot[3] == play1 && slot[4] == play1 && slot[5] == ""){bolinha(5);}
		else if(slot[6] == play1 && slot[7] == play1 && slot[8] == ""){bolinha(8);}
		else if(slot[0] == play1 && slot[3] == play1 && slot[6] == ""){bolinha(6);}
		else if(slot[1] == play1 && slot[4] == play1 && slot[7] == ""){bolinha(7);}
		else if(slot[2] == play1 && slot[5] == play1 && slot[8] == ""){bolinha(8);}
		else if(slot[0] == play1 && slot[4] == play1 && slot[8] == ""){bolinha(8);}
		else if(slot[2] == play1 && slot[4] == play1 && slot[6] == ""){bolinha(6);}
		else if(slot[1] == play1 && slot[2] == play1 && slot[0] == ""){bolinha(0);}
		else if(slot[4] == play1 && slot[5] == play1 && slot[3] == ""){bolinha(3);}
		else if(slot[7] == play1 && slot[8] == play1 && slot[6] == ""){bolinha(6);}
		else if(slot[3] == play1 && slot[6] == play1 && slot[0] == ""){bolinha(0);}
		else if(slot[4] == play1 && slot[7] == play1 && slot[1] == ""){bolinha(1);}
		else if(slot[5] == play1 && slot[8] == play1 && slot[2] == ""){bolinha(2);}
		else if(slot[4] == play1 && slot[8] == play1 && slot[0] == ""){bolinha(0);}
		else if(slot[4] == play1 && slot[6] == play1 && slot[2] == ""){bolinha(2);}
		else if(slot[0] == play1 && slot[2] == play1 && slot[1] == ""){bolinha(1);}
		else if(slot[3] == play1 && slot[5] == play1 && slot[4] == ""){bolinha(4);}
		else if(slot[6] == play1 && slot[8] == play1 && slot[7] == ""){bolinha(7);}
		else if(slot[0] == play1 && slot[6] == play1 && slot[3] == ""){bolinha(3);}
		else if(slot[1] == play1 && slot[7] == play1 && slot[4] == ""){bolinha(4);}
		else if(slot[2] == play1 && slot[8] == play1 && slot[5] == ""){bolinha(5);}
		else if(slot[0] == play1 && slot[8] == play1 && slot[4] == ""){bolinha(4);}
		else if(slot[2] == play1 && slot[6] == play1 && slot[4] == ""){bolinha(4);}
		else 
			if(jogadas == 2){
				var marcou = true;
				var marcDificil = 0;
				if(slot[4] == play1){
					for(var i=0; i<9; i++){
						if(slot[i] == play1){
							if(slot[i] != 4){
								marcDificil = i;
							}
						}
					}
					if(marcDificil == 0 || marcDificil == 2){
						if(slot[6] == ""){
							bolinha(6);
						}else{
							bolinha(8);
						}
					}else
					if(marcDificil == 6 || marcDificil == 8){
						if(slot[0] == ""){
							bolinha(0);
						}else{
							bolinha(2);
						}
					}
				}else{
					do{
						var aleatorio = [1,3,5,7];
						var a = Math.floor(Math.random() * 4);
						if(slot[aleatorio[a]] == ""){
							bolinha(aleatorio[a]);
							marcou = false;
						}
					}while(marcou)
				}
			}else{
				for(var i=0; i<9; i++){
					var x = Math.floor(Math.random() * 9);
					if(slot[x] == ""){
						bolinha(x);
						marcou = true;
						i=9;
					}
				}

				if(marcou == false){
					for(var i=0; i<9; i++){
						if(table[i].innerHTML == ""){
							bolinha(i);
							i=9;
						}
					}
				}
			}

		isWinner();

		if(velha == 9 && winner == 0)
			isVelha();
	}
}

function show(){
	var div = document.getElementById('vencedor');
	var change = document.getElementById("placar");

	if(vez == "o"){
		change.innerHTML = 'Jogador: '+play1;
		div.innerHTML = 'O vencedor foi: '+play1;
		vicX++;

		var placar2 = document.getElementById("x");
		placar2.innerHTML = vicX;

		var placar3 = document.getElementById("o");
		if(placar3.innerHTML == play2)
			placar3.innerHTML = vicO;

	}else if(vez == "x"){
		div.innerHTML = 'O vencedor foi: '+play2;
		change.innerHTML = 'Jogador: '+play2;
		vicO++;

		var placar2 = document.getElementById("o");
		placar2.innerHTML = vicO;

		var placar3 = document.getElementById("x");
		if(placar3.innerHTML == play1)
			placar3.innerHTML = vicX;
	}
}

function isVelha(){
	var aux = document.getElementById("velha");
	var change = document.getElementById("placar");
	if(vez == "o"){
		change.innerHTML = 'Jogador: '+play1;
	}else if(vez == "x"){
		change.innerHTML = 'Jogador: '+play2;
	}
	aux.setAttribute("style", "display:block");
}

function riscar(pA, pB, pC){
	var aux = document.querySelectorAll('div.coluna');
	if(pA == 0 && pB == 1 || pA == 3 || pA == 6 && pB == 7){
		aux[pA].innerHTML += '<div class="h"></div>';
		aux[pB].innerHTML += '<div class="h"></div>';
		aux[pC].innerHTML += '<div class="h"></div>';
	}else
	if(pA == 0 && pB == 3 || pA == 1 || pA == 2 && pB == 5){
		aux[pA].innerHTML += '<div class="v"></div>';
		aux[pB].innerHTML += '<div class="v"></div>';
		aux[pC].innerHTML += '<div class="v"></div>';
	}else
	if(pA == 0 && pB == 4){
		aux[pA].innerHTML += '<div class="de"></div>';
		aux[pB].innerHTML += '<div class="de"></div>';
		aux[pC].innerHTML += '<div class="de"></div>';
	}else{
		aux[pA].innerHTML += '<div class="dd"></div>';
		aux[pB].innerHTML += '<div class="dd"></div>';
		aux[pC].innerHTML += '<div class="dd"></div>';
	}
}

function isWinner(){
	var aux = document.querySelectorAll('div.coluna');

	var x = play1;
	// Verifica o "X"
	if(aux[0].innerHTML == x
	&& aux[1].innerHTML == x
	&& aux[2].innerHTML == x){
		show();
		winner = true;
		riscar(0,1,2);
	}
	else
	if(aux[3].innerHTML == x
	&& aux[4].innerHTML == x
	&& aux[5].innerHTML == x){
		show();
		winner = true;
		riscar(3,4,5);
	}
	else
	if(aux[6].innerHTML == x
	&& aux[7].innerHTML == x
	&& aux[8].innerHTML == x){
		show();
		winner = true;
		riscar(6,7,8);
	}
	else
	if(aux[0].innerHTML == x
	&& aux[3].innerHTML == x
	&& aux[6].innerHTML == x){
		show();
		winner = true;
		riscar(0,3,6);
	}
	else
	if(aux[1].innerHTML == x
	&& aux[4].innerHTML == x
	&& aux[7].innerHTML == x){
		show();
		winner = true;
		riscar(1,4,7);
	}
	else
	if(aux[2].innerHTML == x
	&& aux[5].innerHTML == x
	&& aux[8].innerHTML == x){
		show();
		winner = true;
		riscar(2,5,8);
	}
	else
	if(aux[0].innerHTML == x
	&& aux[4].innerHTML == x
	&& aux[8].innerHTML == x){
		show();
		winner = true;
		riscar(0,4,8);
	}
	else
	if(aux[2].innerHTML == x
	&& aux[4].innerHTML == x
	&& aux[6].innerHTML == x){
		show();
		winner = true;
		riscar(2,4,6);
	}


	// Verifica o "O"
	var y = play2;
	if(aux[0].innerHTML == y
	&& aux[1].innerHTML == y
	&& aux[2].innerHTML == y){
		show();
		winner = true;
		riscar(0,1,2);
	}
	else
	if(aux[3].innerHTML == y
	&& aux[4].innerHTML == y
	&& aux[5].innerHTML == y){
		show();
		winner = true;
		riscar(3,4,5);
	}
	else
	if(aux[6].innerHTML == y
	&& aux[7].innerHTML == y
	&& aux[8].innerHTML == y){
		show();
		winner = true;
		riscar(6,7,8);
	}
	else
	if(aux[0].innerHTML == y
	&& aux[3].innerHTML == y
	&& aux[6].innerHTML == y){
		show();
		winner = true;
		riscar(0,3,6);
	}
	else
	if(aux[1].innerHTML == y
	&& aux[4].innerHTML == y
	&& aux[7].innerHTML == y){
		show();
		winner = true;
		riscar(1,4,7);
	}
	else
	if(aux[2].innerHTML == y
	&& aux[5].innerHTML == y
	&& aux[8].innerHTML == y){
		show();
		winner = true;
		riscar(2,5,8);
	}
	else
	if(aux[0].innerHTML == y
	&& aux[4].innerHTML == y
	&& aux[8].innerHTML == y){
		show();
		winner = true;
		riscar(0,4,8);
	}
	else
	if(aux[2].innerHTML == y
	&& aux[4].innerHTML == y
	&& aux[6].innerHTML == y){
		show();
		winner = true;
		riscar(2,4,6);
	}
}

function bolinha(xesq){
	var aux = document.querySelectorAll('div.coluna');
	aux[xesq].innerHTML = play2;
	vez = "x";
	velha++;
}