	load("frame.js");
	load("sbbsdefs.js");
	//load("vid_noise.js");
	load(system.mods_dir + "supershell/superhelpers.js");

	// colors
	headerBG = BG_RED;
	headerFG = WHITE;
	footerABG = BG_CYAN;
	footerAFG = BLACK;
	footerBBG = BG_BLUE;
	footerBFG = YELLOW;
	bodyBG = BG_LIGHTGRAY;
	bodyFG = BLACK;
	menuBG = BG_BLACK;
	menuFG = YELLOW;
	chatOutputBG = BG_BLACK;
	chatOutputFG = WHITE;
	localNodeBG = BG_BLUE;
	localNodeFG = WHITE;
	tableA1BG = BG_GREEN;
	tableA1FG = BLACK;
	tableB1BG = BG_RED;
	tableB1FG = WHITE;
	tableA2BG = BG_BLACK;
	tableA2FG = YELLOW;
	tableB2BG = BG_MAGENTA;
	tableB2FG = YELLOW;
	leftBlockBG = BG_RED;
	leftBlockFG = WHITE;
	rightBlockBG = BG_BLACK;
	rightBlockFG = BLACK;
	menuFooterFrameBG = BG_GREEN;
	menuFooterFrameFG = BLACK;
	menuHeaderBG = BG_BROWN;
	menuHeaderFG = WHITE;
	chatHeaderBG = BG_CYAN;
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

		var mainFrame = new Frame(1,1,termWidth,termHeight);
		var headerFrame = new Frame(1,1,termWidth,1,headerBG|headerFG);
		headerFrame.h_scroll = true;
		headerFrame.checkbounds = false;
		//headerFrame.parent = mainFrame;
		var footerAwidth = (console.screen_columns - console.screen_columns % 4)/4;
		var footerAFrame = new Frame(1,termHeight,footerAwidth,1,footerABG|footerAFG);
		var footerBFrame = new Frame(footerAwidth + 1,termHeight,termWidth - footerAwidth,1,footerBBG|footerBFG);
		var bodyFrame = new Frame(1,2,termWidth,termHeight - 2,bodyBG|bodyFG);
		var aThirdHeight = (console.screen_rows - console.screen_rows % 3)/3;
		var menuFrame = new Frame(1,3,parseInt(footerAwidth * 1.33),parseInt(aThirdHeight * 1.5)-5,menuBG|menuFG);
		var menuHeaderFrame = new Frame(1,2,menuFrame.width,1,menuHeaderBG|menuHeaderFG);
		var menuFooterFrame = new Frame(1,3+menuFrame.height,menuFrame.width,1,menuFooterFrameBG|menuFooterFrameFG);
		var chatOutputFrame = new Frame(menuFrame.width + 1, 3,termWidth - menuFrame.width,aThirdHeight * 2 - 5,chatOutputBG|chatOutputFG)
		chatOutputFrame.word_wrap = true;
		var chatOutputHeaderFrame = new Frame(menuFrame.width+1,2,chatOutputFrame.width,1,chatHeaderBG|chatHeaderFG);
		var localNodeFrame = new Frame(1,4 + menuFrame.height,menuFrame.width,parseInt((chatOutputFrame.height - menuFrame.height)*2 + 2),localNodeBG|localNodeFG);
		var tableA1Frame = new Frame(menuFrame.width + 1, 3 + chatOutputFrame.height,parseInt(chatOutputFrame.width/2),1, tableA1BG|tableA1FG);
		var tableA2Frame = new Frame(menuFrame.width + 1, 4 + chatOutputFrame.height,parseInt(chatOutputFrame.width/2),localNodeFrame.y+localNodeFrame.height - tableA1Frame.y - 1, tableA2BG|tableA2FG);
		var tableB1Frame = new Frame(menuFrame.width + 1 + tableA1Frame.width, 3 + chatOutputFrame.height,termWidth-tableA1Frame.width - menuFrame.width,1, tableB1BG|tableB1FG);
		if(tableA2Frame.height > 1){
			tableB2height = tableA2Frame.height -1;
		} else {
			tableB2height = 1;
		}
		var tableB2Frame = new Frame(menuFrame.width + 1 + tableA1Frame.width, 4 + chatOutputFrame.height,termWidth-tableA1Frame.width - menuFrame.width,tableB2height -1, tableB2BG|tableB2FG);
		var tableB3Frame = new Frame(tableB1Frame.x,tableB2Frame.y + tableB2Frame.height -1,tableB2Frame.width,1, tableB1BG|tableB1FG)
		var leftBlockHeaderFrame = new Frame(1, 1 + menuFrame.height + localNodeFrame.height,menuFrame.width + tableA1Frame.width,1,BG_MAGENTA|WHITE)
		var leftBlockFrame = new Frame(1,2 + menuFrame.height + localNodeFrame.height,menuFrame.width + tableA1Frame.width, console.screen_rows - 2 - menuFrame.height - localNodeFrame.height, leftBlockBG|leftBlockFG);
		leftBlockFrame.word_wrap = true;
		var rightBlockFrame = new Frame(leftBlockFrame.width + 1, leftBlockFrame.y, console.screen_columns - leftBlockFrame.width, leftBlockFrame.height, rightBlockBG|rightBlockFG);

	function mainFrameInit(){
		openFrames();
		//headerFrame.putmsg(rssTickerString);
		drawFrames();
		cycleAll();
	}

	function openFrames(){	

		mainFrame.open();
		bodyFrame.open();
		menuFrame.open();
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
	}
	function invalidateFrames(){	

		mainFrame.invalidate();
		bodyFrame.invalidate();
		menuFrame.invalidate();
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
		menuFrame.cycle();
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
	}

	function drawFrames(){
		mainFrame.draw();
		bodyFrame.draw();
		menuFrame.draw();
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
	}
