//Libraries
load("sbbsdefs.js");
load("frame-mgmt.js");
load("event-timer.js");

//globals
var contextNum = 0; //starting context
var timer = new Timer();
var event1 = timer.addEvent(2000,true,eventOne)
eventDebugCounter = 0;

var contexts = [
	{func_name:"chatInput",desc:"blah chat",
	func: function(){
		chatInput();
	}},
	{func_name:"menuControl",desc:"blah menu",func: function(){
		menuControl();
	}},
	{func_name:"messages",desc:"blah messages",
	func: function(){
			messages();
		}}];
var contextNumStop = contexts.length; //ghetto array pointers
var context = contexts[contextNum];
preRoll();
mainFrameInit();



function mainLoop(){
	var the_loop;
	contextSwitch(0);
	//testA();
	while(the_loop = true){

		the_key = console.inkey();
		//testB();
		if(the_key == "q"){
			the_loop = false;
			break;
		}
		else if(the_key == "\t")
		{
			contextSwitch(contextNum + 1);
		} else {
		//testB();
		}//detectTermSizeChange();	}
		while(timer.events.length > 0) {
			timer.cycle();
			break;
		}
	}
}

mainLoop();

function eventOne(){
	showLocalNodes();
	eventDebugCounter++;
	headerFrame.putmsg("\1g..\1w" + eventDebugCounter * 2);
	headerFrame.cycle();
}



function contextSwitch(contextNumber){  //adds the number values -1.0.1 are good
contextNum = contextNumber;
if(contextNum > contexts.length){
	contextNum = 0;
}
	switch (contextNum){
		case 0 :
		updateContext(contextNum); //chat
		return;
		case 1 :
		updateContext(contextNum); //menu
		return;
		case 2 :
		updateContext(contextNum); //menu
		return;
}

}
function updateContext(contextIndex){
	var obj = contexts[contextIndex];
	obj.func();
	footerAFrame.clear();
	footerAFrame.center(obj.desc);
	footerAFrame.cycle();
	
}
function chatInput(){
	bbs.node_action = 17;
}

function menuControl(){
	bbs.node_action = 0;
		//expand the frame
		/*
		menuFrame.checkbounds = false;
		menuFrame.width = menuFrame.width * 2;  //shift frames right resize A
		menuFrame.close();
		menuFrame.cycle();
		menuFrame.open();
		menuFrame.checkbounds = true;
		menuFrame.cycle();
		menuFrame.putmsg("menu control function operating");
		*/  
		if(console.getkey() != undefined)
		{
			/*menuFrame.invalidate();
			//menuFrame.checkbounds = false;
			menuFrame.width = menuFrame.width/2;
			menuFrame.close();

			menuFrame.cycle();
			chatOutputFrame.top();
			menuFrame.bottom();
			bodyFrame.bottom();
			menuFrame.open();
			menuFrame.checkbounds = true;
			menuFrame.refresh();
			menuFrame.cycle();
			*/
			return;
		}
}

function messages(){  //let's make this function convert the message listing to trees and use anohter frame (pop up to display messages)
	bbs.node_action = 1;
}

function preRoll(){
	console.putmsg("PRE-ROLL");
	console.pause();
}



function testA(){
	for(i = 0; i < contexts.length; i++){
		obj = contexts[i];
		bodyFrame.putmsg(obj.desc + "\r\n");
	}
bodyFrame.cycle();
}

function testB(){
	bodyFrame.putmsg(contextNum) + " + " ;
	bodyFrame.cycle();
}
