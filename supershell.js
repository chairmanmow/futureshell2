//Libraries

load("sbbsdefs.js");
load(system.mods_dir + "supershell/frame-mgmt.js");
load("event-timer.js");
load(system.mods_dir + "supershell/superhelpers.js");
load(system.mods_dir + "supershell/ssmsg.js");
load(system.mods_dir + "supershell/ssmenu.js");
load("json-client.js");
load(system.mods_dir + "coa/coa-client.js");
load("json-chat.js");
load(system.mods_dir + "supershell/megarss.js");

versionNumber = "2.0beta"

load(system.mods_dir + "coa/coa-client.js");
//globals
var the_loop;
var contextNum = 0; //starting context
var timer = new Timer();
var event1 = timer.addEvent(1000,true,eventOne);
var eventTwenty = timer.addEvent(15000,true,rssCycle);
var nodeListtimer = timer.addEvent(10000,true,showLocalNodes)
eventDebugCounter = 0;
//var localJSONclient = new JSONClient("127.0.1.1",10088);
var chat = new JSONChat(user.number,coaClient);
chat.join("#coa");
var channels = [];
var channels_map = [];
var channel_index = 0;
var rssTickerCounter = 0;
var theTickerString = rssString();
var initMessage = "   Welcome " + user.name + " to the New Futureland shell version " + versionNumber+ "\r\n   It has all the old features with a slew of new ones (with more to come), and hopefully fewer bugs.  Use tab to switch from chat/messages/menu\r\n   Larger terminals are supported. If content is cut off, increase your term size and reconnect.";

function chatCycle(){
	for(var c in chat.channels) {
		chat.cycle();
		var chan = chat.channels[c];
		verifyLocalCache(chan); // verify this channels presence in the local cache */				
			/* display any new messages */
		while(chan.messages.length > 0) {
			chatOutputFrame.putmsg(printMessage(chan,chan.messages.shift()) + "\r\n");
		}
		updateLocalCache();	
		cycleAll();
	}
}


//var rssTickerString = rssFeed();

var contexts = [
	{func_name:"chatInput",desc:"\1i\1h\1kCHATTING ~-=>>",
	func: function(){
		menuHeaderFrame.clear();
		menuHeaderFrame.center("\1h\1bTAB *once* for Menu");
		chatOutputHeaderFrame.clear();
		chatOutputHeaderFrame.putmsg("Chatting. Type a message. \1h\1r *TAB* for other functions");
		chatInput();
	}},
	{func_name:"menuControl",desc:"^^ MENU ACTIVE ^^",func: function(){
		chatOutputHeaderFrame.clear();
		chatOutputHeaderFrame.putmsg("Up/Down Arrows and Enter Keys to use Menu");
		footerBFrame.clear();
		footerBFrame.putmsg("*TAB* to browse message boards.")
		menuHeaderFrame.clear();
		menuHeaderFrame.center("\1h\1k\1iMENU ACTIVE\1n\1r *TAB*exits");
		menuControl();
	}},
	{func_name:"message_lister",desc:"Message Boards",
	func: function(){
		menuHeaderFrame.clear();
		menuHeaderFrame.center("\1h\1bTAB **twice** for Menu");
		chatOutputHeaderFrame.clear();
		chatOutputHeaderFrame.putmsg("You're Browsing msg boards(bottom).\1h\1r*TAB* for Chat.");
		footerBFrame.clear();
		footerBFrame.putmsg("\1h\1w<-/->|Up/Down Arrows : Switch Areas|Browse Messages [J]ump");
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
				if(a_key == "J" || a_key == "j"){
					jumpForum();
					msgList.display();
				}
				timerCheck();
				cycleAll();

			}
		
		}}];

//var contextNumStop = contexts.length; //ghetto array pointers
var context = contexts[contextNum];





bbs.sys_status|=SS_MOFF;  // this turns off the node messaging log ons/log offs
oldPt = console.ctrlkey_passthru;
console.ctrlkey_passthru="+PKUT";
preRoll();
mainFrameInit();
leftBlockFrame.putmsg(initMessage);
leftBlockHeaderFrame.center("***WELCOME MESSAGE***");
tableA1Frame.center("NoTiFuNCaT$hunZ");
//headerFrame.putmsg(rssTickerString);
showLocalNodes();
msgList.display();
grabFeed();
eventOne();
cycleAll();


function mainLoop(){
	//showLocalNodes();
	contextSwitch(contextNum);
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

	/*if(rssTickerCounter > theTickerString.length){
		rssLoopIndex++;  // go to next feed
		headerFrame.clear();
		cycleAll();
		theTickerString = rssString();
		rssString();
	} else {
	
	}
	*/
	//bodyFrame.putmsg(theTickerString.length + "|" + rssTickerCounter + "|");  //debuggers
	//headerFrame.scroll(1,0);
	//rssCycle();
	chatCycle();
	eventDebugCounter++;
	rssTickerCounter++;

	//headerFrame.scrollTo(headerFrame.width + rssTickerCounter,1);
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
		}	
if(chatKey == "KEY_UP" || chatKey == "KEY_DOWN"){
				//do nothing for now, add scroll later
		}
		else if(chatKey == "\r" || chatKey == "\n"){  // submit messages
			if(chatMessage.length > 0){
				chat.submit(channels[channel_index],chatMessage);
					footerBFrame.clear();
					cycleAll();
				}
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
		k = console.inkey(K_NONE, 5);
		menuTree.getcmd(k);
		menuTree.cycle();
		timerCheck();
		/*
		log(LOG_DEBUG,testTree.toSource());
	 	log(LOG_DEBUG,"is this a tree? " + testTree instanceof Tree);
	 	log(LOG_DEBUG,"is this a tree item? " + testTree instanceof TreeItem);
	 	console.pause();
	 	*/
	}
	contextSwitch(contextNum + 1);
	return;
		//}

}


function preRoll(){
	console.putmsg("hey");
	console.pause();
bbs.exec_xtrn("LASTCALL");
//bbs.exec_xtrn("SCREENSV");
bbs.exec_xtrn("ONELNRZ");
bbs.exec_xtrn("FLBULLET");
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

