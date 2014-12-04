

var oldNodeString = "";
function showLocalNodes(){
	var onlineCount = 0;
	var nodeString = "*\1yFuTur3l@nD\1w*\r\n";
	localNodeFrame.clear();	
	
	for(i=0; i < system.node_list.length; i++){
		
		if(system.node_list[i].status == 3){
			onlineCount++;
			nodeString +=  system.username(system.node_list[i].useron) + "\r\n"; //+ NodeAction[system.node_list[i].action] +"\r\n"
			//localNodeFrame.crlf();	
		}
	}

var coaRetrieve = showCoaNodes();
localNodeFrame.putmsg(nodeString + "\r\n" + coaRetrieve.userList);
var totalOnline = onlineCount + coaRetrieve.numCoaUsers;
menuFooterFrame.center(totalOnline + " users online");
//tableA1Frame.cycle();
//localNodeFrame.cycle();
return;
}

load(system.mods_dir + "coa/coa.js");

mailWaiting = user.stats.mail_waiting;
var nodeMsgFlag = false;

var coa = new COA();
function showCoaNodes(){
var nodeMsgs = system.get_node_message(bbs.node_num);
	if(nodeMsgs != null){
		nodeMsgFlag = true;
		if(nodeMsgs.substr(4,8) == "Telegram"){
			tableA1Frame.clear();
			tableA1Frame.center("\1i1n$t@nT m3$$@G3");
			console.beep();
		}
		tableA2Frame.clear();
		tableA2Frame.putmsg(nodeMsgs);
		cycleAll();
	}
	if(user.stats.mail_waiting > mailWaiting){
			nodeMsgFlag = false;
			mailWaiting = user.stats.mail_waiting;
				console.beep();
				tableA1Frame.clear();
				tableA1Frame.center("\1i\1hn3w 3-M@1L\1n");	
				tableA1Frame.cycle();
				mailWaiting = user.stats.mail_waiting;
		}

		if(user.stats.mail_waiting >= mailWaiting && nodeMsgFlag != true){
			tableA2Frame.clear();
			if(user.stats.mail_waiting > mailWaiting){
					
			}
			if(user.stats.mail_waiting == mailWaiting ){
			tableA2Frame.putmsg("You have " + user.stats.mail_waiting + " emails waiting");
		}
	tableA2Frame.cycle();
};
	//mailWaiting = user.stats.mail_waiting;




var coaNodeString = "";
var coaUsersOnline = 0;
coa.cycle();
//console.putmsg(JSON.stringify(coa.presence));
for(i=0; i<coa.presence.length; i++){
	var coaBBS = coa.presence[i];
	for(j=0; j < coaBBS.nodes.length;j++){
			if(coaBBS.nodes[j].status == 3 && coaBBS.system != system.name){
				coaNodeString += "\1w*\1y" +coaBBS.system + "\1w*\r\n" + coaBBS.nodes[j].alias + "\r\n" ;
				coaUsersOnline++;
			}
	}
}
	var coaInfoObj = {userList:coaNodeString,numCoaUsers:coaUsersOnline}
	return coaInfoObj;
}



//message functions











/* SCRAPPED functions

function detectTermSizeChange(){
	if(console.screen_rows != termHeight || console.screen_columns != termWidth) {
		mainFrame.putmsg("\1h\1rScreen Size Changed.  adjust terminal to ideal and hit key");
		mainFrame.cycle();
		/* if(console.getkey() != undefined){
		alterFrameSizes();
		}	
		*/

/*


// some errors are being thrown and not handled currently.
function alterFrameSizes(){
	termWidth = console.screen_columns;
	termHeight = console.screen_rows;
	//try {
	mainFrame.width = termWidth;
	mainFrame.height = termHeight;
	mainFrame.putmsg("\1gScreen Size adjusted [hopefully]!")
	mainFrame.cycle();
	//}
}

*/
