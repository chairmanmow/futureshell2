//Libraries
load("sbbsdefs.js");
load("frame-mgmt.js");
load("event-timer.js");
load("superhelpers.js");
load("ssmenu.js");
load("json-client.js");
load("json-chat.js");

load(system.mods_dir + "coa/coa-client.js");
//globals
var the_loop;
var contextNum = 0; //starting context
var timer = new Timer();
var event1 = timer.addEvent(2000,true,eventOne);
var nodeListtimer = timer.addEvent(10000,true,showLocalNodes)
eventDebugCounter = 0;
var chat_options = load("modopts.js","jsonchat");
var chat_client = new JSONClient("127.0.1.1",10088);
var chat = new JSONChat(user.number,chat_client);
chat.join("#main");

function chatCycle(){
		chat.cycle();
		var chan = chat.channels[channel.toUpperCase()];
		while(chan.messages.length > 0) {
			submitMessage(chatOutputFrame,chan.messages.shift());
		}
		cycleAll();
}


//var rssTickerString = rssFeed();

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
//headerFrame.putmsg(rssTickerString);
showLocalNodes();

function mainLoop(){
	//showLocalNodes();
	contextSwitch(1);
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
		timerCheck();
	}
}


function timerCheck(){
			while(timer.events.length > 0) {
			timer.cycle();
			break;
		}
}
mainLoop();





function eventOne(){
	chatCycle();
	eventDebugCounter++;
	headerFrame.putmsg("\1g..\1w" + eventDebugCounter * 2);
	cycleAll();
}



function contextSwitch(contextNumber){  //adds the number values -1.0.1 are good
contextNum = contextNumber;
	if(contextNum == contexts.length){
		contextNum = 0;
	}
	switch (contextNum){
		case 0 :
		updateContext(contextNum); //chat
		break;
		case 1 :
		updateContext(contextNum); //menu
		break;
		case 2 :
		updateContext(contextNum); //menu
		break;
		default:
		return;
	}
}

function updateContext(contextIndex){
	var obj = contexts[contextIndex];

	footerAFrame.clear();
	footerAFrame.center(obj.desc);
	footerAFrame.cycle();
	obj.func();
	
}
function chatInput(){
	bbs.node_action = 17;
	var chatKey;
	var chatMessage = "";
	while(chatKey != '\t') { 
		timerCheck();
		chatKey = console.inkey();	
		if(chatKey == "\t"){
			footerBFrame.clear();
			contextSwitch(contextNum + 1);
			return;
		}	
		if(chatKey == "\r" || chatKey == "\n"){
				chat.submit(channels[channel_index],chatMessage);
				chatMessage = "";
		} else if(chatKey == "\b" && chatMessage.length > 0) { //handle delete
			chatMessage = chatMessage.substring(0,chatMessage.length - 1);
			footerBFrame.putmsg(chatKey);
			footerBFrame.cycle();
		} else {
			chatMessage += chatKey;
			footerBFrame.putmsg(chatKey);
			footerBFrame.cycle();
		}				
	}  //end while
	footerBFrame.clear();
	footerBFrame.cycle();
}

function submitChatMessage(messageString){
	chatOutputFrame.putmsg(messageString);
	footerBFrame.clear();
	chatOutputFrame.cycle();
}
function menuControl(){
	bbs.node_action = 0;
	tree.open();
	cycleAll();
	var k;
	while(k != "\t"){
		k = console.inkey();
		tree.getcmd(k);
		tree.cycle();
	}
	contextSwitch(contextNum + 1);
	return;
		//}

}

function messages(){  //let's make this function convert the message listing to trees and use anohter frame (pop up to display messages)
	bbs.node_action = 1;
	return;
}

function preRoll(){
	console.putmsg("PRE-ROLL");
	console.pause();
}



