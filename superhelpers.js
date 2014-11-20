
function showLocalNodes(){
	var onlineCount = 0;
	localNodeFrame.clear();
for(i=0; i < system.node_list.length; i++){

	if(system.node_list[i].status == 3){
		onlineCount++;
		var nodeListString = "";
		nodeListString += "#" + (i + 1) + "\1r:\1n" + system.username(system.node_list[i].useron) + NodeAction[system.node_list[i].action];
	}
}
localNodeFrame.putmsg(onlineCount + " Users online.\r\n" + nodeListString);
localNodeFrame.cycle();
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
