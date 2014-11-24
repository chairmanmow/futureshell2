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
		footerBFrame.clear();
		footerBFrame.putmsg("\1h\1wLeft/Right Arrows = Switch Areas, Up/Down = Browse Messages");
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
					rightBlockFrame.putmsg(msgTimeTrim, msgBoaoardToMeDateBG|msgBoaoardToMeDateFG);
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
		tableB2Frame.center(cursub2.substring(0,rightBlockFrame.width));
		tableB1Frame.clear();
		tableB1Frame.center(groupDescription);
		tableB1Frame.cycle();
		tableB2Frame.clear();
		tableB2Frame.center(curSubTotalMsgs + " Total Msgs in Sub-Forum");
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
		fg:BLACK,
		// non-current item/empty space background 
		bg:BG_CYAN,
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
		tfg:BLACK,
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
	        var subjLen = 40 - poster.length - 5;  //creates a variable to create the width of subject without spilling to a new line
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
		var msgTreeKey = console.inkey();
		msgTree.open();

		while(msgTreeKey != '\t'  || msgTreeKey != KEY_RIGHT  || msgTreeKey != KEY_LEFT){
			msgTreeKey = console.inkey();
			if(msgTreeKey == "N"  || msgTreeKey == "n") {
					//chatOutputFrame.putmsg("msgTreekey to uppercase N received");
					leftBlockFrame.scroll(0,leftBlockFrame.height - 1);
					cycleAll();
				}
				if(msgTreeKey == "P"  || msgTreeKey == "p") {
					leftBlockFrame.scroll(0,-(leftBlockFrame.height - 1));
					cycleAll();
					}
			if(msgTreeKey == KEY_UP || msgTreeKey == KEY_DOWN  || msgTreeKey == "\r" || msgTreeKey == "\n"){		
			msgTree.getcmd(msgTreeKey);
		}
			msgTree.cycle();
			timerCheck();
			//cycleAll();
			if(msgTreeKey == KEY_LEFT || msgTreeKey == KEY_RIGHT){
				if(msgTreeKey == KEY_LEFT){
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
			if(msgTreeKey == "\t"){
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
		var body = readingMb.get_msg_body(msgNum);
		readingMb.close();
		////chatOutputFrame.putmsg("length of message body : " + body.length);
		footerBFrame.clear();
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
		mbcode = bbs.cursub_code;
		var readingMb = new MsgBase(mbcode);
		msgBaseIndex = readingMb;
		msgNumIndex = msgNum;
		readingMb.open();
		leftBlockFrame.clear();
		var body = msgBaseIndex.get_msg_body(msgNumIndex);
		readingMb.close();
		////chatOutputFrame.putmsg("length of message body : " + body.length);
		footerBFrame.clear();
		leftBlockFrame.putmsg(body);
		footerBFrame.putmsg("\1h\1wControls : \1y(N)\1wext Page \1y(P)\1wPrevious Page \1y(E)\1wxpand");
		leftBlockFrame.scrollTo(1,1);

		cycleAll();
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
