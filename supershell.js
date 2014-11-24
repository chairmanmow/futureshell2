//Libraries
load("sbbsdefs.js");
load("frame-mgmt.js");
load("event-timer.js");
load("superhelpers.js");
load("ssmenu.js");
load("json-client.js");
load("json-chat.js");
load("ssmsg.js");
load("megarss.js");


load(system.mods_dir + "coa/coa-client.js");
//globals
var the_loop;
var contextNum = 0; //starting context
var timer = new Timer();
var event1 = timer.addEvent(2000,true,eventOne);
var nodeListtimer = timer.addEvent(10000,true,showLocalNodes)
eventDebugCounter = 0;
var localJSONclient = new JSONClient("127.0.1.1",10088);
var chat = new JSONChat(user.number,localJSONclient);
chat.join("#main");
var channels = [];
var channels_map = [];
var channel_index = 0;
var rssTickerCounter = 0;
var theTickerString = rssString();

function chatCycle(){
	for(var c in chat.channels) {
		chat.cycle();
		var chan = chat.channels[c];
		verifyLocalCache(chan); // verify this channels presence in the local cache */				
			/* display any new messages */
		while(chan.messages.length > 0) {
			chatOutputFrame.putmsg(printMessage(chan,chan.messages.shift()));
		}
		updateLocalCache();	
		cycleAll();
	}
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
	{func_name:"message_lister",desc:"blah messages",
	func: function(){
		footerBFrame.clear();
		footerBFrame.putmsg("\1h\1wLeft/Right Arrows = Switch Areas, Up/Down = Browse Messages");
		mbcode = bbs.cursub_code;  // get the current code
			cycleAll();
			bbs.node_action = 1;

			cycleAll();
			var a_key;
			a_key = console.inkey();

			while(a_key != "\t"){
				a_key = console.inkey();
				if(a_key == KEY_RIGHT){
					msgSwitch = "nextSub";
					switchMsgAreas();
				}
				if(a_key == KEY_LEFT) {
					msgSwitch = "prevSub";
					switchMsgAreas();
				}
				if(a_key == "\t"){
					contextSwitch(contextNum + 1);
					return;
				}
				if(a_key == KEY_UP || a_key == KEY_DOWN){
					msgList.interact();
				}
				cycleAll();
			}
		
		}}];

var contextNumStop = contexts.length; //ghetto array pointers
var context = contexts[contextNum];






preRoll();
mainFrameInit();
//headerFrame.putmsg(rssTickerString);
showLocalNodes();
msgList.display();
eventOne();
cycleAll();

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
	if(rssTickerCounter > theTickerString.length){
		rssLoopIndex++;
		headerFrame.clear();
		cycleAll();
		theTickerString = rssString();
		rssString();
	}
	bodyFrame.putmsg(theTickerString.length + "|" + rssTickerCounter + "|");  //debuggers
	chatCycle();
	eventDebugCounter++;
	rssTickerCounter++;
	headerFrame.scroll(0,1);
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
		default:
		return;
	}
}



function updateContext(contextIndex){
	
	var obj = contexts[contextIndex];
	footerAFrame.clear();
	footerBFrame.clear();
	footerAFrame.center(obj.desc);
	cycleAll();
	obj.func();
	
}
function chatInput(){	
	bbs.node_action = 17;
	var chatKey;
	var chatMessage = "";
	//chatKey = console.inkey();
	footerBFrame.clear();
	footerBFrame.cycle();
	while(chatKey != '\t') { 
	
		timerCheck();
		chatKey = console.inkey();
		if(chatKey == "\t"){
			footerBFrame.clear();
			contextSwitch(contextNum + 1);
			return;
		}	if(chatKey == "\r" || chatKey == "\n"){  // submit messages
				chat.submit(channels[channel_index],chatMessage);
					footerBFrame.clear();
					cycleAll();
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


function menuControl(){
	bbs.node_action = 0;
	menuTree.open();
	cycleAll();
	var k;
	while(k != "\t"){
		k = console.inkey();
		menuTree.getcmd(k);
		timerCheck();
		menuTree.cycle();
	}
	contextSwitch(contextNum + 1);
	return;
		//}

}


function preRoll(){
	console.putmsg("PRE-ROLL");
	console.pause();
}


function verifyLocalCache(chan) {
	if(channels_map[chan.name] == undefined) {
			
		chatOutputFrame.cleartoeol();
		chatOutputFrame.putmsg("joining channel: " + chan.name + "\r\n", chanJoinBG|chanJoinFG);
		chatOutputFrame.cleartoeol();
			
		channels_map[chan.name] = channels.length;
		channel_index = channels.length;
		channels.push(chan.name);
	}
}

function updateLocalCache() {
	/* verify local channel cache */
	for(var c in channels_map) {
		if(!chat.channels[c.toUpperCase()]) {
			chatOutput.cleartoeol();
			chatOutput.putmsg("parting channel: " + c);
			
			channels.splice(channels_map[c],1);
			delete channels_map[c];
			if(!channels[channel_index])
				channel_index = channels.length-1;
			}	
		}}

function printMessage(chan,msg) {	
	if(!msg.nick)
	{
			return msg.str;
	}
		

		msgstring =  "[" + chan.name + "]" + msg.nick.name + ":" + msg.str;  // this is the original code to construct a msgstring variable
//conditional formatting - is the message sent from you or someone else?		
			var strChat = "";
		if(msg.nick.name == user.alias)
		{
		    strChat = "\1c" +  chan.name + "\1h\1y" +  msg.nick.name + "\1n\1w:" + msg.str;
		    return strChat;
		
		}
		else
		{
		strChat = "\1h\1c" +  chan.name + "\1h\1r" +  msg.nick.name + "\1n:\1h\1w" + msg.str;
                    return strChat;
		}
}

