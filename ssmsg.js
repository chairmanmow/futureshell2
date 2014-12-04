//colors
 msgBoardToMeDateFG = LIGHTCYAN;
msgBoardToMeDateBG = BG_BLACK;
 msgBoardnameToMeSenderNameFG = GREEN;
 msgBoardToMeTopicFG = WHITE;
 msgBoardToMeTopicBG = BG_BLACK;


//tracking variables

var msgSwitch = new String;
var mbcode = new String;
var cursub = new String;
var msgBaseIndex;
var msgGroupIndex;
var msgNumIndex;

load("tree.js");

var msgList = new MsgList();
msgList.display();

function MsgList(){
	
		mbcode = bbs.cursub_code;
		var mb = new MsgBase(mbcode);

	this.display = function(){
		//footerBFrame.clear();
		//footerBFrame.putmsg("\1h\1w<-/-> Arrows = Switch Areas, Up/Down = Browse Messages [J]ump");
		mbcode = bbs.cursub_code;  // get the current code
		currentBoard = new MsgBase(mbcode);
		currentBoard.open();
		rightBlockFrame.clear();
		//chatOutputFrame.putmsg("msglist.display running");
		
		rightBlockFrame.clear();
		//rightBlockFrame.invalidate();
		//rightBlockFrame.open();
		//rightBlockFrame.draw();
		cycleAll();
		for(var m = currentBoard.last_msg; m >= currentBoard.first_msg; m--) 
		{
			
			var cursub2 = msg_area.grp_list[bbs.curgrp].sub_list[bbs.cursub].name;
			var curSubTotalMsgs = currentBoard.total_msgs;
			var groupDescription = msg_area.grp_list[bbs.curgrp].description.substring(0,rightBlockFrame.width);
			//msgLastReadPointer = msg_area.grp_list[bbs.curgrp].sub_list[bbs.cursub].scan_ptr;
		    var header = currentBoard.get_msg_header(m);
		    if(header === null || header.attr&MSG_DELETE)
		        continue;
		        var msgTime = system.timestr(header.when_written_time);
		        var msgTimeTrim = msgTime.substr(4,6);
		        msgTimeTrim = msgTimeTrim.replace(" ","");
		        var msgSubj = new String;  //creates a string to hold the full message subject
		        msgSubj = header.subject; //puts the value of the message subject in the variable
		        var fromLen = header.from.length;  // gets length of posters name
		        var poster = header.from.substr(0,10);
		        var subjLen = rightBlockFrame.width - poster.length - 6;  //creates a variable to create the width of subject without spilling to a new line
		        var msgSubjTrim = msgSubj.substr(0,subjLen);
					if(header.to == user.name || header.to == user.alias){
					rightBlockFrame.putmsg(msgTimeTrim, msgBoardToMeDateBG|msgBoardToMeDateFG);
					}
			else
			{
		    rightBlockFrame.putmsg(msgTimeTrim, msgBoardDateBG|msgBoardDateFG);
			}
			if(header.from == user.name)
			{
			rightBlockFrame.putmsg(poster, msgBoardNameMeBG|msgBoardNameMeFG);
			}
			else if(header.to == user.name || header.to == user.alias)
			{
			rightBlockFrame.putmsg(poster, msgBoardnameToMeSenderNameBG|msgBoardnameToMeSenderNameFG);
			}
			else
			{
			rightBlockFrame.putmsg(poster, msgBoardNameBG|msgBoardNameFG);
			}
			if(header.to == user.name || header.to == user.alias) {
			rightBlockFrame.putmsg(msgSubjTrim, msgBoardToMeTopicBG|msgBoardToMeTopicFG);
			}
			else
			{
			rightBlockFrame.putmsg(msgSubjTrim, msgBoardTopicBG|msgBoardTopicFG);
			}
			/*var concatDisplay = new String;
		        concatDisplay = msgTime + poster;
		        
		        msgTree.addItem(concatDisplay,readMessage,headerIndex);
		        */
		    rightBlockFrame.crlf(); 
		    
		}
		//chatOutputFrame.putmsg("msglist.display got through if/else");
		tableB2Frame.clear();
		tableB2Frame.putmsg("       " + cursub2.substring(0,rightBlockFrame.width)+"\r\nYou've made " + user.stats.total_posts + " posts\r\n");
		tableB1Frame.clear();
		tableB1Frame.center(groupDescription );//+ msgLastReadPointer
		tableB1Frame.cycle();
		tableB3Frame.clear();
		tableB3Frame.center(curSubTotalMsgs + " Total Msgs in ");
		currentBoard.close();
		cycleAll();
	//refreshMsgTree();
	}  //end display	
	this.interact = function(){
		mbcode = bbs.cursub_code;
		var myMb = new MsgBase(mbcode);
		myMb.open();
		rightBlockFrame.clear();
		var tempRightBlockFrame = new Frame(rightBlockFrame.x, rightBlockFrame.y, rightBlockFrame.width, rightBlockFrame.height, BG_RED|WHITE);
		tempRightBlockFrame.open();
		//chatOutputFrame.putmsg("msgList.interact running");
		cycleAll();
		var msgTree = new Tree(tempRightBlockFrame,"message board test");
		msgTree.colors = {
		fg:WHITE,
		// non-current item/empty space background 
		bg:BG_BLACK,
		// current item foreground
		lfg:WHITE,
		// current item background
		lbg:BG_BLUE,
		// current tree heading foreground
		cfg:WHITE,
		// current tree heading background
		cbg:BG_CYAN,
		// disabled item foreground
		dfg:DARKGRAY,
		// hotkey foreground
		kfg:YELLOW,
		// tree branch foreground
		tfg:RED,
		// tree heading foreground
		hfg:WHITE,
		// tree heading background
		hbg:BG_BLUE,
		// tree expansion foreground
		xfg:RED
	}
		//mb.open();	
		var cursub2 = msg_area.grp_list[bbs.curgrp].sub_list[bbs.cursub].name;
		var n = 0;
		for(var m = myMb.last_msg; n < tempRightBlockFrame.height * 3; m--){	
			n++;	
			var curSubTotalMsgs = myMb.total_msgs;
			var groupDescription = msg_area.grp_list[bbs.curgrp].description.substring(0,40);
			var header = myMb.get_msg_header(m);
    		if(header === null || header.attr&MSG_DELETE)
        		continue;
        	var msgTime = system.timestr(header.when_written_time);
	        var msgTimeTrim = msgTime.substr(4,6);
	        msgTimeTrim = msgTimeTrim.replace(" ","");
	        msgTime = msgTimeTrim;
	        var msgSubj = new String;  //creates a string to hold the full message subject
	        msgSubj = header.subject; //puts the value of the message subject in the variable
	        var fromLen = header.from.length;  // gets length of posters name
	        var poster = header.from.substr(0,10);
	        var subjLen = rightBlockFrame.width - poster.length - 5;  //creates a variable to create the width of subject without spilling to a new line
	        var msgSubjTrim = msgSubj.substr(0,subjLen);
	        var headerIndex = header.number;
	        var concatDisplay = new String;
	        	if(header.from == user.name)        {
	        	concatDisplay = "|m|e|@" + msgTime + "|:" + poster + "|:" + msgSubj;
	        	}
	       		else if(header.to == user.name || header.to == user.alias){
	       		concatDisplay = "@|U|-" + msgTime + "|:" + poster + "|:" + msgSubj;
	        	}
	        	else {
	        	concatDisplay = "-|--" + msgTime + "|:" + poster + "|:" + msgSubj;
	        	//msgTree.addItem(concatDisplay,readMessage,headerIndex);
	     	}
        msgTree.addItem(concatDisplay,readMessage,headerIndex);
		}
		myMb.close();
		tempRightBlockFrame.draw();
		//chatOutputFrame.putmsg("is it drawing the temp frame?");
		cycleAll();
		var a_key = console.inkey();
		msgTree.open();

		while(a_key != '\t'  || a_key != KEY_RIGHT  || a_key != KEY_LEFT){
			a_key = console.inkey();
			if(a_key == "E"  || a_key == "e"){
				displayMessage();
			}
			if(a_key == "j"  || a_key == "J"){
				jumpForum();
			}
			if(a_key == "N"  || a_key == "n") {
					//chatOutputFrame.putmsg("a_key to uppercase N received");
					leftBlockFrame.scroll(0,leftBlockFrame.height - 1);
					cycleAll();
				}
				if(a_key == "P"  || a_key == "p") {
					leftBlockFrame.scroll(0,-(leftBlockFrame.height - 1));
					cycleAll();
					}
			if(a_key == KEY_UP || a_key == KEY_DOWN  || a_key == "\r" || a_key == "\n"){		
			msgTree.getcmd(a_key);
		}
			msgTree.cycle();
			timerCheck();
			//cycleAll();
			if(a_key == KEY_LEFT || a_key == KEY_RIGHT){
				if(a_key == KEY_LEFT){
					msgSwitch = "prevSub";
				} else {
					msgSwitch = "nextSub";
				}
				cycleAll();
				
				switchMsgAreas();
				tempRightBlockFrame.delete();
				tempRightBlockFrame.invalidate();
				msgTree.close();
				//msgList.display();
				//break;
				contextSwitch(2);
				//return;
			}
			if(a_key == "\t"){
				tempRightBlockFrame.delete();
				tempRightBlockFrame.invalidate();
				msgTree.close();
				msgList.display();
				contextSwitch(contextNum + 1);
			return;
		}
		//timerCheck();  //commented because it appears to be un-need but could be needed later
	}
		this.display();
		contextSwitch(contextNum + 1);
	}//end interact

		function readMessage(msgNum) {
		mbcode = bbs.cursub_code;
		var readingMb = new MsgBase(mbcode);
		msgBaseIndex = readingMb;
		msgNumIndex = msgNum;
		readingMb.open();
		leftBlockFrame.clear();
		var readingHeader = readingMb.get_msg_header(msgNum);
		var body = readingMb.get_msg_body(msgNum);
		readingMb.close();
		////chatOutputFrame.putmsg("length of message body : " + body.length);
		footerBFrame.clear();
		leftBlockHeaderFrame.clear();
		leftBlockHeaderFrame.putmsg(readingHeader.from + " rambled about " + readingHeader.subject)
		leftBlockFrame.putmsg(body);
		footerBFrame.putmsg("\1h\1wControls : \1y(N)\1wext Page \1y(P)\1wPrevious Page \1y(E)\1wxpand");
		leftBlockFrame.scrollTo(1,1);

		cycleAll();
		
}


cycleAll();
}
function switchMsgAreas() {

if(msgSwitch == "nextSub" || msgSwitch == "prevSub") {  // handling sub canges
		//chatOutputFrame.putmsg("msg switch proper syntax detected");
		cycleAll();
		var subsInGroup = msg_area.grp_list[bbs.curgrp].sub_list.length - 1;
		var cursubInteger = bbs.cursub;
		var currentGroup = bbs.curgrp;

			if(msgSwitch == "nextSub"){ // see if we are going up in subs
				if(subsInGroup == cursubInteger) {  // check to see that it's not the last sub in the array
					if(bbs.curgrp == msg_area.grp_list.length - 1){ //check to see if it's the last group in the array
						bbs.curgrp = 0;  // go back to the beginning if it is the last message in the last message board
						bbs.cursub = 0;
					} else {
						bbs.curgrp = bbs.curgrp + 1;  // advance a group if it's not the last group
						bbs.cursub = 0;
						}
					msgList.display();
				} else {
					bbs.cursub = bbs.cursub + 1;				
					msgList.display();
					}
				}  // end nextSub 
			if(msgSwitch == "prevSub"){ // see if we are going up or down in subs
				if(bbs.cursub == 0) {  // check to see that it's the first subboard in a group
					if(bbs.curgrp == 0) {  // check to see if it's the first group
						bbs.curgrp = msg_area.grp_list.length - 1;  // set the group to the last group
					} else {
						bbs.curgrp = bbs.curgrp - 1; //go down a group 
					}
					bbs.cursub = msg_area.grp_list[bbs.curgrp].sub_list.length - 1;
					msgList.display();
				} else {
					bbs.cursub = bbs.cursub - 1;
					msgList.display();
					}
				}  // end prevSub
					
	}  // end check to see if it's prevSub or nextSub
	//chatOutputFrame.putmsg("\1iswitchMsgAreas run\1n");
	cycleAll();
	}

function displayMessage() {
	function messagePopUp(){
		var msgPopUpHeaderFrame = new Frame(
			x=		2,
			y=		2,
			width=	console.screen_columns-2,
			height=	4,
			attr= BG_GREEN|BLACK,
			parent=	js.global.frame
	);
		var msgPopUpFrame = new Frame(
			x=		2,
			y=		6,
			width=	console.screen_columns-2,
			height=	console.screen_rows -12,
			attr= BG_BLACK|GREEN,
			parent=	js.global.frame
	);
		var msgPopUpFooterFrame = new Frame(
			x=		2,
			y=		msgPopUpFrame.height + 6,
			width=	console.screen_columns-2,
			height=	3,
			attr= BG_GREEN|BLACK,
			parent=	js.global.frame
	);
		//msgPopUpFrame.putmsg(caseDesc);
		msgPopUpFrame.open();
		msgPopUpHeaderFrame.open();
		msgPopUpFooterFrame.open();
		msgPopUpFrame.draw();
		msgPopUpHeaderFrame.draw();
		msgPopUpFooterFrame.draw();
		mbcode = bbs.cursub_code;
		var readingMb = new MsgBase(mbcode);
		readingMb.open();
		headerFrame.clear();
		var header2 = readingMb.get_msg_header(msgNumIndex);
		headerFrame.center("Browsing Msg " + header2.number + " of " + readingMb.total_msgs + " in " + msg_area.grp_list[bbs.curgrp].sub_list[bbs.cursub].name);
		var body = readingMb.get_msg_body(msgNumIndex);
		msgPopUpFooterFrame.putmsg(JSON.stringify(header2));
		msgPopUpFooterFrame.cycle();
		msgPopUpHeaderFrame.putmsg("From:" + header2.from + "\r\nTo: " + header2.to + "\r\nDate:" + system.timestr(header2.when_written_time) + "\r\nSubject:" +header2.subject);
		readingMb.close();
		////chatOutputFrame.putmsg("length of message body : " + body.length);
		footerBFrame.clear();
		msgPopUpFrame.putmsg(body);
		footerBFrame.putmsg("\1y(N)\1wext Page \1y(P)\1wPrevious Page \1y(X)\1wExit");
		//msgPopUpFrame.scrollTo(1,1);
		msgPopUpFrame.cycle();
		msgPopUpHeaderFrame.cycle();
		cycleAll();
}
	messagePopUp();
		//all the initialization and loading of the message should becomplete.  now to get input
		var a_key = console.inkey();
		while(a_key != "x" ||a_key != "X"){
			if(a_key == "x"  || a_key == "X") {
				break;
			}
			if(a_key == "J" || a_key == "j"){
				jumpForum();
			}
		if(a_key == "N"  || a_key == "n") {
					msgPopUpFrame.scroll(0,msgPopUpFrame.height - 1);
					cycleAll();
				}
				if(a_key == "P"  || a_key == "p") {
					msgPopUpFrame.scroll(0,-(msgPopUpFrame.height - 1));
					cycleAll();
					}
				if(a_key == KEY_UP||a_key == KEY_DOWN){
					bbs.exec_xtrn("DDML");
					refreshScreen();
					messagePopUp();
				}
		// handlers for changing groups, messages
		if(a_key == "-" || a_key == "+" || a_key == "<" || a_key == ">" || a_key == "[" || a_key == ""){
			if(a_key == "+") { 
				msgNumIndex++;
				//mif(msgNumIndex > )
				//go to next message unless last message
			}
			if(a_key == "-") { 
				//go to prev message unless first message
			} 
			if(a_key == ">") { 
				//go to next sub-board unless it is the last sub board
			}
			if(a_key == "<") { 
				//go to prev sub unless it is first
			}
			if(a_key == "]") { 
				//go to next group unless last group
			}
			if(a_key == "[") { 
				//go to previous group
			}

	}  
	a_key = console.inkey();
}
	invalidateFrames();
	refreshScreen();
	//tempRightBlockFrame.cycle();
	msgList.display();
}


function messageViewer(){  //let's make this function convert the message listing to trees and use anohter frame (pop up to display messages)
	
/*		
while(key != "\t"){
	key = console.inkey();
	if(key == KEY_RIGHT){
		msgSwitch = "nextSub";
		switchMsgAreas();
	}
	if(key == KEY_LEFT) {
		msgSwitch = "prevSub";
		switchMsgAreas();
	}
	cycleAll();
}
*/

}
