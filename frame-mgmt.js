load("frame.js");
load("sbbsdefs.js");
//load(system.mods_dir + "supershell/superhelpers.js");

// colors
headerBG = BG_RED;
headerFG = WHITE;
footerABG = BG_BLACK;
footerAFG = LIGHTGREEN;
footerBBG = BG_BLUE;
footerBFG = YELLOW;
bodyBG = BG_RED;
bodyFG = BLACK;
menuBG = BG_LIGHTGRAY;
menuFG = YELLOW;
chatOutputBG = BG_BLACK;
chatOutputFG = WHITE;
localNodeBG = BG_BLACK;
localNodeFG = WHITE;
tableA1BG = BG_RED;
tableA1FG = WHITE;
tableB1BG = BG_RED;
tableB1FG = WHITE;
tableA2BG = BG_BLACK;
tableA2FG = YELLOW;
tableB2BG = BG_RED;
tableB2FG = YELLOW;
leftBlockBG = BG_BLACK;
leftBlockFG = CYAN;
rightBlockBG = BG_BLACK;
rightBlockFG = BLACK;
menuFooterFrameBG = BG_RED;
menuFooterFrameFG = YELLOW;
menuHeaderBG = BG_MAGENTA;
menuHeaderFG = WHITE;
chatHeaderBG = BG_LIGHTGRAY;
chatHeaderFG = BLACK;
msgBoardDateBG = BG_BLACK
msgBoardNameBG = BG_BLACK;
msgBoardNameMeBG = BG_BLACK;
msgBoardTopicBG = BG_BLACK;
msgBoardTitleBG = BG_BLACK;
msgBoardDateFG = LIGHTCYAN;
msgBoardNameFG = LIGHTRED;
msgBoardNameMeFG = YELLOW;
msgBoardTopicFG = LIGHTGRAY;
msgBoardTitleFG = LIGHTGREEN;
chanJoinBG = BG_CYAN;
chanJoinFG = RED;
popUpFrameBG = BG_RED;
popUpFrameFG = WHITE;


var msgBoaoardToMeDateFG = LIGHTCYAN;
var msgBoaoardToMeDateBG = BG_BLACK;
var msgBoardnameToMeSenderNameFG = GREEN;
var msgBoardnameToMeSenderNameBG = BG_BLACK;
var msgBoardToMeTopicFG = WHITE;
var msgBoardToMeTopicBG = BG_BLACK;
// GLOBAL VARIABLES


	var termHeight = console.screen_rows;
if(termHeight % 2 != 0){
	var termOddY = 1;
}
var termWidth = console.screen_columns;
if(termWidth % 2 != 0){
	var termOddX = 1;
}

//DECLARE ALL THE FRAMES 

	var mainFrame = new Frame(1,1,console.screen_columns,console.screen_rows);
	//console.putmsg(JSON.stringify(mainFrame) + "\r\n");

	var bodyFrame = new Frame(1,2,console.screen_columns,console.screen_rows - 2,bodyBG|bodyFG);
	//console.putmsg(JSON.stringify(bodyFrame) + "\r\n");
	var headerFrame = new Frame(1,1,console.screen_columns,1,headerBG|headerFG);
	//console.putmsg(JSON.stringify(headerFrame) + "\r\n");
	leftColumnWidth = parseInt(console.screen_columns/4) + 5;
	var rtColPos = leftColumnWidth + 2;
	var rtColWidth = console.screen_columns - 2 - leftColumnWidth;
	var menuHeaderFrame = new Frame(1,2,leftColumnWidth,1,menuHeaderBG|menuHeaderFG);  //this could be renamed as it is more of a secondary feedback header (and the menu is not active) working with ChatOutput header
	//console.putmsg(JSON.stringify(menuHeaderFrame) + "\r\n");
	var chatOutputHeaderFrame = new Frame(rtColPos,2,rtColWidth,1,chatHeaderBG|chatHeaderFG);
	//console.putmsg(JSON.stringify(chatOutputHeaderFrame) + "\r\n");
	var menuFooterFrame = new Frame(1,3,leftColumnWidth,1,menuFooterFrameBG|menuFooterFrameFG); 
	//console.putmsg(JSON.stringify(menuFooterFrame) + "\r\n");
	var chatOutputFrame = new Frame(rtColPos, 3,rtColWidth,parseInt(console.screen_rows/2 - 2),chatOutputBG|chatOutputFG);  // local node header
	chatOutputFrame.word_wrap = true;
	chatOutputFrame.scrollbars = true;
	//console.putmsg(JSON.stringify(chatOutputFrame) + "\1h\1y\r\nCHAT OUTPUT FRAME ABOVE\r\n");
	var footerBFrame = new Frame(rtColPos,2 + chatOutputFrame.height,rtColWidth,2,footerBBG|footerBFG);  // chat output frame determines height of everything else
	//console.putmsg(JSON.stringify(footerBFrame) + "\r\n");
	var localNodeFrame = new Frame(1,4,leftColumnWidth,chatOutputFrame.height -3,localNodeBG|localNodeFG);  //chat input
	//console.putmsg(JSON.stringify(localNodeFrame) + "\r\n");
	var tableA1Frame = new Frame(1, 4 + localNodeFrame.height, leftColumnWidth,1, tableA1BG|tableA1FG);   // notification header
	//console.putmsg(JSON.stringify(tableA1Frame) + "\r\n");
	var tableA2Frame = new Frame(1, 5 + localNodeFrame.height,leftColumnWidth,4, tableA2BG|tableA2FG); 
	tableA2Frame.word_wrap = true; // notification body
	//console.putmsg(JSON.stringify(tableA2Frame) + "\1h\1y\r\nNOTIFICATION BODY\r\n");
	var centerFrameTop = new Frame(rtColPos + 2, 4 + chatOutputFrame.height, rtColWidth - 4,1,BG_BLACK|YELLOW)
	var centerFrameBottom = new Frame(rtColPos + 2, 5 + chatOutputFrame.height, rtColWidth - 4,1,BG_BLACK|WHITE)
	var tableB1Frame = new Frame(1, 9 + localNodeFrame.height,leftColumnWidth,1, tableB1BG|tableB1FG);  // beginning of the row across to indicate message boards
	//console.putmsg(JSON.stringify(tableB1Frame) + "\1h\1y\r\nBEGINNING OF B CELL ROW\r\n");
	var tableB2Frame = new Frame(rtColPos, 9 + localNodeFrame.height,parseInt(rtColWidth/2),1, tableB2BG|tableB2FG);
	//console.putmsg(JSON.stringify(tableB2Frame) + "\r\n");
	var tableB3Frame = new Frame(rtColPos + tableB2Frame.width,9 + localNodeFrame.height,rtColWidth - tableB2Frame.width,1, tableB1BG|tableB1FG);
	//console.putmsg(JSON.stringify(tableB3Frame) + "\r\n");
	var rightBlockFrame = new Frame(1, 10 + localNodeFrame.height, leftColumnWidth, console.screen_rows - 11 - localNodeFrame.height, rightBlockBG|rightBlockFG);
	//console.putmsg(JSON.stringify(rightBlockFrame) + "\1h\1y\r\nFIRST BLOCK FRAME\r\n");
	var leftBlockHeaderFrame = new Frame(rtColPos, 10 + localNodeFrame.height,rtColWidth,1,BG_MAGENTA|WHITE);
	//console.putmsg(JSON.stringify(leftBlockHeaderFrame) + "\r\n");
	var leftBlockFrame = new Frame(rtColPos,11 + localNodeFrame.height,rtColWidth, rightBlockFrame.height -1, leftBlockBG|leftBlockFG);
	//console.putmsg(JSON.stringify(leftBlockFrame) + "\r\n");
	leftBlockFrame.word_wrap = true;
	quarterWidth = parseInt(console.screen_columns/4)
	var leftFooterFrame = new Frame(1,console.screen_rows,quarterWidth,1, BG_GREEN|WHITE);
	var footerAFrame = new Frame(quarterWidth+1,console.screen_rows,quarterWidth*2,1,footerABG|footerAFG);
	var rightFooterFrame = new Frame(1 + 3 * quarterWidth,console.screen_rows,quarterWidth,1, BG_GREEN|WHITE);
	//console.putmsg(JSON.stringify(footerAFrame) + "\r\n");
	//console.pause();
	chatOutputFrame.height = chatOutputFrame.height - 1;
	



		 // needs a rename sort of


// footerA->footerB footerA->menuFrame.width aThirdHeight
function mainFrameInit(){
	openFrames();
	centerFrameBottom.center("\1n\1yESCAPE\1h\1w for Menu \1kor \1n\1yTAB\1h\1w to switch Chat & Forums");
	//headerFrame.putmsg(rssTickerString);
	drawFrames();
	cycleAll();
}

function openFrames(){	

	mainFrame.open();
	bodyFrame.open();
	//menuFrame.open();
	menuFooterFrame.open();
	headerFrame.open();
	footerAFrame.open();
	footerBFrame.open();
	chatOutputFrame.open();
	localNodeFrame.open();
	tableA1Frame.open();
	tableA2Frame.open();
	tableB1Frame.open();
	tableB2Frame.open();
	leftBlockHeaderFrame.open();
	leftBlockFrame.open();
	rightBlockFrame.open();
	tableB3Frame.open();
	menuHeaderFrame.open();
	chatOutputHeaderFrame.open();
	centerFrameBottom.open();
	centerFrameTop.open();
	leftFooterFrame.open();
	rightFooterFrame.open();
}
function invalidateFrames(){	

	mainFrame.invalidate();
	bodyFrame.invalidate();
	//menuFrame.invalidate();
	menuFooterFrame.invalidate();
	headerFrame.invalidate();
	footerAFrame.invalidate();
	footerBFrame.invalidate();
	chatOutputFrame.invalidate();
	localNodeFrame.invalidate();
	tableA1Frame.invalidate();
	tableA2Frame.invalidate();
	tableB1Frame.invalidate();
	tableB2Frame.invalidate();
	tableB3Frame.invalidate();
	leftBlockHeaderFrame.invalidate();
	leftBlockFrame.invalidate();
	rightBlockFrame.invalidate();
	menuHeaderFrame.invalidate()
	chatOutputHeaderFrame.invalidate();
	centerFrameBottom.invalidate();
	centerFrameTop.invalidate();
	leftFooterFrame.invalidate();
	rightFooterFrame.invalidate();
	//cycleAll();
}

function refreshScreen(){
	invalidateFrames();
	openFrames();
	drawFrames();
	cycleAll();
}
function cycleAll(){	

	bodyFrame.cycle();
	//menuFrame.cycle();
	menuFooterFrame.cycle();
	headerFrame.cycle();
	footerAFrame.cycle();
	footerBFrame.cycle();
	chatOutputFrame.cycle();
	localNodeFrame.cycle();
	tableA1Frame.cycle();
	tableA2Frame.cycle();
	tableB1Frame.cycle();
	tableB2Frame.cycle();
	tableB3Frame.cycle();
	leftBlockHeaderFrame.cycle();
	leftBlockFrame.cycle();
	rightBlockFrame.cycle();
	menuHeaderFrame.cycle();
	chatOutputHeaderFrame.cycle();
	centerFrameBottom.cycle();
	centerFrameTop.cycle();
	leftFooterFrame.cycle();
	rightFooterFrame.cycle();
}

function drawFrames(){
	mainFrame.draw();
	bodyFrame.draw();
	//menuFrame.draw();
	menuFooterFrame.draw();
	headerFrame.draw();
	chatOutputFrame.draw();
	footerAFrame.draw();
	footerBFrame.draw();
	localNodeFrame.draw();
	tableA1Frame.draw();
	tableA2Frame.draw();
	tableB1Frame.draw();
	tableB2Frame.draw();
	tableB3Frame.draw();
	leftBlockHeaderFrame.draw();
	leftBlockFrame.draw();
	rightBlockFrame.draw();
	menuHeaderFrame.draw();
	chatOutputHeaderFrame.draw();
	centerFrameBottom.draw();
	centerFrameTop.draw();
	leftFooterFrame.draw();
	rightFooterFrame.draw();
}
