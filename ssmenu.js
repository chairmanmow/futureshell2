//load("menuTree.js");
load("sbbsdefs.js");
load("tree.js");
load("coldfuncs.js");
load("str_cmds.js");
var menuFrame = new Frame(1,3,leftColumnWidth,console.screen_rows -3,menuBG|menuFG);
	var menuTree = new Tree(menuFrame,"My Menu");
	menuTree.colors = {
		fg:BLACK,
		// non-current item/empty space background 
		bg:BG_LIGHTGRAY,
		// current item foreground
		lfg:WHITE,
		// current item background
		lbg:BG_BLACK,
		// current tree heading foreground
		cfg:MAGENTA,
		// current tree heading background
		cbg:BG_CYAN,
		// disabled item foreground
		dfg:DARKGRAY,
		// hotkey foreground
		kfg:MAGENTA,
		// tree branch foreground
		tfg:BLUE,
		// tree heading foreground
		hfg:BLACK,
		// tree heading background
		hbg:BG_LIGHTGRAY,
		// tree expansion foreground
		xfg:LIGHTCYAN
	}
	menuTree.addItem("instant message",telegram);
	menuTree.addItem("e-|mail and messages", netMailSection);
	//menuTree.addItem("|post msg in this forum",forumPost);
	//menuTree.addItem("kill",kill);
	//menuTree.addItem("|trade wars 2002",tradeWars);
	//var testSubTree = new Tree();
	//menuTree.addTree(testSubTree);

	menuTree.addItem("ANSI MUSEUM", sixteenColors);
	//testTree = menuTree.addTree("|piss shit fuck");

	var forumTree = menuTree.addTree("|forums");
		forumTree.addItem("message|lister",digdistML);
		forumTree.addItem("|post msg in this forum",forumPost);
		forumTree.addItem("|jump to another forum",jumpForum);
		forumTree.addItem("|browse new messages",browseNewMsgs);
		forumTree.addItem("scan for msgs 2 |you",msgsForYou);
		
		forumTree.addItem("|search for text",findTextInForum);
		forumTree.addItem("|threaded message viewer",ecReader);
		forumTree.addItem("t|radtional bbs message reader",traditionalForum);
		forumTree.addItem("|new message scan",newMsgScan);

	var  gameTree = menuTree.addTree("games");
	var dosDoorgameTree = gameTree.addTree("|old school classics")
		dosDoorgameTree.addItem("|trade wars 2002",tradeWars);
		dosDoorgameTree.addItem("The Pit",thePit)
		dosDoorgameTree.addItem("|legend of the red dragon",lordBLink);
		dosDoorgameTree.addItem("Coa L.O.R.D.",lordCoa)
		dosDoorgameTree.addItem("usurper",coaUsurper);
		dosDoorgameTree.addItem("barren realms",coaBRE);
		dosDoorgameTree.addItem("falcon's eye",coaFalcon);
		dosDoorgameTree.addItem("global war",  globalWar);
		dosDoorgameTree.addItem("top rank boxing", topRankBoxing);
		dosDoorgameTree.addItem("|2 l.o.r.d. II",lord2BLink);
		dosDoorgameTree.addItem("|pimp wars",pimpBLink);
		dosDoorgameTree.addItem("|planet t.e.o.s.",teosBLink);
		dosDoorgameTree.addItem("|operation overkill ii",overkillBLink);
		dosDoorgameTree.addItem("lunati|x",lunatix);
		dosDoorgameTree.addItem("|bbs crash",bbsCrash);

	var jsDoorgameTree = gameTree.addTree("|new school games");
		jsDoorgameTree.addItem("Lemons",lemons)
		jsDoorgameTree.addItem("Doubles aka |2048",doublesGame)
		jsDoorgameTree.addItem("|star stocks",starStocks);
		jsDoorgameTree.addItem("|dice wars",diceWars);
		jsDoorgameTree.addItem("star |trek",starTrek);
		jsDoorgameTree.addItem("|uberblox",uberBloxDoor);
		jsDoorgameTree.addItem("|fat fish",fatFish);
		jsDoorgameTree.addItem("|chickenDelivery",chickenDelivery);
		jsDoorgameTree.addItem("|bubble boggle",bubbleBoggle);
		jsDoorgameTree.addItem("synchrone|tris",synchronetris);
		jsDoorgameTree.addItem("|word em",wordEm);
		jsDoorgameTree.addItem("thirsty|ville",thirstyVille);
		jsDoorgameTree.addItem("ma|ze race",mazeRace);
		jsDoorgameTree.addItem("|oregon trail(in Games Section", oregonTrail);

		gameTree.addItem("|more external programs(unorganized)",xtrnMenuSec)

	var portalTree =  menuTree.addTree("|portals");
		var bbsTree = portalTree.addTree("|bbs's");
			bbsTree.addItem("p|hunc sister bbs", phunc);
			bbsTree.addItem("|fatcats", fatcats);
			bbsTree.addItem("b|roken bubble", brokenBubble);
			bbsTree.addItem("electronic |chicken", eChicken);
			bbsTree.addItem("|pharcyde", pharcyde);
			bbsTree.addItem("|digital distortion", digitalDistortion);

var chatTree = menuTree.addTree("Internet Relay |Chat");
	chatTree.addItem("bbs scene IRC|1",bbsScene);
	chatTree.addItem("free node IRC|2",freeNode);
	chatTree.addItem("efnet IRC|3",efNet);
	chatTree.addItem("undernet IRC|4",undernet);
	chatTree.addItem("german IRC|5",germanIRC);
	chatTree.addItem("quakeNet IRC|6",quakeNet);
	chatTree.addItem("rizon IRC|7",rizon);
	chatTree.addItem("uStream IRC|8",uStream);
	
var userTree = menuTree.addTree("|user lists and matchmaking");
	userTree.addItem("|list of users",userLister);
	userTree.addItem("|match maker",synchroMM);

var bbsFunctionTree = menuTree.addTree("|bbs functions");
	bbsFunctionTree.addItem("|default user settings",defaultUser);
	bbsFunctionTree.addItem("|information & statistics on bbs",bbsInfoStat);
	bbsFunctionTree.addItem("|node activity log",listNodeActivity);
	bbsFunctionTree.addItem("bbs |auto message",autoMsg);
	bbsFunctionTree.addItem("interbbs |ANSI machine",ansiWall);
if(user.compare_ars("SYSOP or EXEMPT Q or I or N") || (bbs.sys_status&SS_TMPSYSOP)) {  //Sysop menu
bbsFunctionTree.addItem("s|ysop menu", sysopMenu);
}
menuTree.addItem("logoff",logoffTheBBS);

function createTempMenuFrame(){
	
	menuFrame.open();
	menuFrame.draw();


menuTree.open();
menuFrame.cycle();
var k = "";
	while(k != "\t" && ascii(k) != 27){	
		k = console.inkey();
		if(k == "\t" || ascii(k) == 27){
			menuTree.close();
			menuFrame.delete();
			menuFrame.invalidate();
			//updateContext(contextNum);
			//refreshScreen();
			return;
		}
		menuTree.getcmd(k);
		menuTree.cycle();
		timerCheck();

}
this.killMenu = function(){
	menuTree.close();
			menuFrame.delete();
			menuFrame.invalidate();

}
menuTree.close();
menuFrame.close();
menuFrame.delete();
menuFrame.invalidate();
updateContext(contextNum);
			//refreshScreen();
			return;

}

function kill(){
	the_loop = false;
	throw "kill switch thrown";
}

function telegram(){	

	var popUpFrame = new Frame(
			x=		console.screen_columns/4,
			y=		parseInt(console.screen_rows/6),
			width=	console.screen_columns/2,
			height=	parseInt((console.screen_rows/2)*.7),
			attr= popUpFrameBG|popUpFrameFG,
			parent=	js.global.frame
	);
	var popUpFrameHeader = new Frame(popUpFrame.x,popUpFrame.y - 2,popUpFrame.width,2,BG_BLUE|YELLOW);
	popUpFrameHeader.parent = popUpFrame;
	var popUpFrameFooter = new Frame(popUpFrame.x,popUpFrame.y+popUpFrame.height,popUpFrame.width,3,BG_BLUE|YELLOW);
	popUpFrameFooter.parent = popUpFrame;
	popUpFrameHeader.open();
	popUpFrameHeader.draw();
	popUpFrame.open();
	popUpFrameFooter.open();
	popUpFrameFooter.draw();
	popUpFrame.draw();
	popUpFrame.putmsg("  From : " + user.name + "\r\n  To: ");
	popUpFrame.cycle();
	popUpFrameHeader.putmsg("Please enter the name of your recipient below...");
	popUpFrameHeader.cycle();
	var telegramRecipient = "";
	var str_key = console.getkey();
	telegramRecipient += str_key;
	popUpFrameFooter.putmsg(str_key);
		popUpFrameFooter.cycle();
	while(str_key){
		str_key = console.getkey();
		if(str_key == "\r" || str_key == "\n"){
			break;
		}
		telegramRecipient += str_key;
		popUpFrameFooter.putmsg(str_key);
		popUpFrameFooter.cycle();
	}
	popUpFrame.putmsg(telegramRecipient + "\r\n\r\n  Message : ");
	popUpFrameFooter.clear();
	popUpFrameFooter.cycle();
	popUpFrame.cycle();
	var telegramBody = "";
	str_key = console.getkey();
	telegramBody += str_key;
	popUpFrameFooter.putmsg(str_key);
		popUpFrameFooter.cycle();
	while(str_key){
		str_key = console.getkey();
		if(str_key == "\r" || str_key == "\n"){
			break;
		}
		telegramBody += str_key;
		popUpFrameFooter.putmsg(str_key);
		popUpFrameFooter.cycle();
	}
	popUpFrame.putmsg(telegramBody + "\r\n\r\n\1i\1yDo you want to submit this message???");
	popUpFrame.cycle();
	str_key = console.getkey();
	while(str_key){
if(str_key == "Y" || str_key == "y"){
		popUpFrame.putmsg("\r\n\1wSubmitting Messsage");
		popUpFrame.cycle();
		var coa2 = new COA();
		coa2.sendTelegram(telegramRecipient,user.name,telegramBody);
		coa2.cycle();
		mswait(1500);
		refreshScreen();
		return;
	} else if(str_key == "N" || str_key == "n"){
	popUpFrame.putmsg("ABORTED ABORTED");
	popUpFrame.cycle();
		break;
	}else {
		popUpFrame.clear();
		popUpFrameHeader.center("\1iEnter Y or N");
		popUpFrameHeader.cycle();
		str_key = console.getkey();
	}
}
	mswait(1500);
	refreshScreen();
}
// COMMAND CONFIRM FUNCTION

function commandConfirm(){
		var popUpFrame = new Frame(
			x=		console.screen_columns/4,
			y=		parseInt(console.screen_rows/6),
			width=	console.screen_columns/2,
			height=	parseInt(console.screen_rows/2),
			attr= popUpFrameBG|popUpFrameFG,
			parent=	js.global.frame
	);
	popUpFrame.putmsg(caseDesc);
	popUpFrame.open();
	popUpFrame.draw();
	menuTree.close();
	menuFrame.delete();
	menuFrame.invalidate();
	cursorPosX = parseInt(console.screen_rows/4) * 3 + 5;
	cursorPosY = parseInt(console.screen_rows/6) * 4;
	console.gotoxy(cursorPosX,cursorPosY);
	console.pause();

	invalidateFrames();
	bbs.exec_xtrn("SCREENSV");
}

// menu item object
function MenuItem(){

}
// *******  BUNCH OF FUNCTIONS PASTED FROM CHSH-MENU-FUNC.js

function lemons(){
caseDesc = "LEMONS IS JUST LIKE THE CLASSIC LEMMINGS, BUT WITH LEMONS";
			commandConfirm();
			bbs.exec_xtrn("LEMONS");
			refreshAndReturn();
			return;
}

function lordCoa(){
caseDesc = "Another LORD Game networked With COA";
			commandConfirm();
			bbs.exec_xtrn("COALORD");
			refreshAndReturn();
			return;
}
function thePit(){
caseDesc = "The Pit Interbbs COA Awesomeness";
			commandConfirm();
			bbs.exec_xtrn("COAPIT4");
			refreshAndReturn();
			return;
}
function logoffTheBBS(){
console.clear();
console.printfile("../text/logoff.msg");
console.pause();
bbs.hangup();
}
function refreshAndReturn(){
		updateContext(contextNum);
			refreshScreen();
			menuFrame.cycle();
}

function sysopMenu() {
        caseDesc = "SYSOP MENU";
                        commandConfirm();
                        bbs.menu("sysmain");
    str=get_next_str("",40,0,false);
                        str_cmds(str);
console.pause();
                        refreshAndReturn();

                        return;
                        }

function sixteenColors(){
caseDesc = "View the  entire 16 colors ANSI archive remotely on a real BBS.  Written by your Sysop";
			commandConfirm();
			bbs.exec_xtrn("16COLORS");
			refreshAndReturn();
			return;
}
function coaUsurper(){
caseDesc = "Usurper";
			commandConfirm();
			bbs.exec_xtrn("SURPER");
			refreshAndReturn();
			return;
}

function coaBRE(){
caseDesc = "Barren Realms Elite";
			commandConfirm();
			bbs.exec_xtrn("COABRE");
			refreshAndReturn();
			return;
}

function coaFalcon(){
		caseDesc = "Falcon's Eye";
			commandConfirm();
			bbs.exec_xtrn("COAFE");
			refreshAndReturn();
			return;
}
function globalWar(){
		caseDesc = "Global War";
			commandConfirm();
			bbs.exec_xtrn("COAGWAR");
			refreshAndReturn();
			return;
}

function topRankBoxing(){
	caseDesc = "Top Rank Boxing";
			commandConfirm();
			bbs.exec_xtrn("COATRBOX");
			refreshAndReturn();
			return;
}




function bbsScene() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("BBSSCENE");
		
			refreshAndReturn();
			return;
			}
			function freeNode() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("FREENODE");
		
			refreshAndReturn();
			return;
			}
function efNet() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("EFNET");
		
			refreshAndReturn();
			return;
			}
function germanIRC() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("GERMANIR");
		
			refreshAndReturn();
			return;
			}
function quakeNet() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("QUAKENET");
		
			refreshAndReturn();
			return;
			}
function rizon() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("RIZON");
		
			refreshAndReturn();
			return;
			}
function undernet() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("UNDERNET");
		
			refreshAndReturn();
			return;
			}
function uStream() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("USTREAM");
		
			refreshAndReturn();
			return;
			}
function netMailSection() {
	caseDesc = "\1yE\1c-mail";
			commandConfirm();
			
			email();
			refreshAndReturn();
			
			return;
			}
			
function jumpForum() {
caseDesc = "Change message Areas";
			//commandConfirm();
			load("../xtrn/ddac_105/DDMsgAreaChooser.js");
			invalidateFrames();
			msgList.display();
			refreshAndReturn();
			return;
}

function browseNewMsgs() {
			caseDesc = "\1yB\1crowse New Messages";
			commandConfirm();
			console.print("\r\nchBrowse/New Message Scan\r\n");
			bbs.scan_subs(SCAN_NEW|SCAN_BACK);
			refreshAndReturn();
			return;
			}
			
function newMsgScan() {
	caseDesc = "\1yN\1cew Message Scan";
			commandConfirm();
			console.print("\r\nchNew Message Scan\r\n");
			bbs.scan_subs(SCAN_NEW);
			refreshAndReturn();
			return;
}

function msgsForYou(){
		caseDesc = "\1yY\1cour messages";
			commandConfirm();
			console.print("\r\nchScan for Messages Posted to You\r\n");
			bbs.scan_subs(SCAN_TOYOU);
			refreshAndReturn();
			return;
			}
function ecReader() {
	caseDesc = "Electronic chickens threaded message viewer (sometimes buggy)";
			commandConfirm();
			//load("../xtrn/ecreader/ecReader.js")
			bbs.exec_xtrn("ECREADER")
			// console.print("\r\nchContinuous New Message Scan\r\n");
			// bbs.scan_subs(SCAN_NEW|SCAN_CONST);
			refreshAndReturn();
			return;
			}
function digdistML(){
caseDesc = "Digital distortions message viewer (more stable not threaded)";
			commandConfirm();
			//load("../xtrn/ddm136/DigitalDistortionMessageLister.js")
			bbs.exec_xtrn("DDML")
			// console.print("\r\nchContinuous New Message Scan\r\n");
			// bbs.scan_subs(SCAN_NEW|SCAN_CONST);
			refreshAndReturn();
			return;
			}
function traditionalForum() {
	caseDesc = "\1yR\1cead Forums";
			commandConfirm();
			bbs.scan_posts();
			refreshAndReturn();
			return;
			}
			
	
	function autoMsg() {
			caseDesc = "\1yA\1cuto BBS Message";
			commandConfirm();
			bbs.auto_msg();
			refreshAndReturn();
			return;
}
	function fatcats() {
			caseDesc = "Fat cats BBS uses an innovative interface and is part of the COA network";
			commandConfirm();
			bbs.exec_xtrn("FATCATS");
			refreshAndReturn();
			return;
}
	function brokenBubble() {
			caseDesc = "The broken bubble is also part of COA, and has some innovative features, cool demos and a message base that discusses some of the things this BBS collective has been doing";
			commandConfirm();
			bbs.exec_xtrn("BROKEBUB");
			refreshAndReturn();
			return;
}
	function eChicken() {
			caseDesc = "Electronic chicken has made many things for the BBS scene, and you can check out his BBS here.  A good example of a well done BBS.";
			commandConfirm();
			bbs.exec_xtrn("ECHICKEN");
			refreshAndReturn();
			return;
}

	function pharcyde() {
			caseDesc = "Pharcyde maintains an active message network, AgoraNet, echoed here, as well as some gaming leagues.";
			commandConfirm();
			bbs.exec_xtrn("PHARCYDE");
			refreshAndReturn();
			return;
}

	function digitalDistortion() {
			caseDesc = "Nightfox runs Digital Distortion, which has some customized features, which seem to be shared with the community.";
			commandConfirm();
			bbs.exec_xtrn("DIGDIST");
			refreshAndReturn();
			return;
}
	function phunc() {
			caseDesc = "Our buddy Knight's new BBS launched 4/2014 watch it grow";
			commandConfirm();
			bbs.exec_xtrn("PHUNCBBS");
			refreshAndReturn();
			return;
}
	function tradeWars() {
			caseDesc = "One of the sysops personal favorites, the classic Space Trading Games";
			commandConfirm();
			bbs.exec_xtrn("TWBBSLK");
			refreshAndReturn();
	    return
}
        function lunatix() {
                        caseDesc = "haven't got to play it, i hear it's cool";
                        commandConfirm();
                        bbs.exec_xtrn("LUNATIX");
	    refreshAndReturn();
            return
}
        function bbsCrash() {
                        caseDesc = "haven't got to play it, i hear it's cool";
                        commandConfirm();
                        bbs.exec_xtrn("BBSCRASH");
            refreshAndReturn();
            return
}
	function randomArt() {
			caseDesc = "Enjoy some futuristic graffiti";
			commandConfirm();
			randomANSI();
			console.putmsg("\r\n\ *** !!! ***r\n\1h\1yEND \1cOF \1gARtWoRK \1rEND \1wOF \1mARtWoRK \1bEND  \1n\1yOF \1gARtWoRK\r\n\r\n\1h\1y                 come back and visit the gallery \1gANY \1mTIME\1r!!!!\r\n\r\n");
			console.pause();
			
			refreshAndReturn();
			return;
			}
	function oregonTrail() {
			caseDesc = "Larry Lagomorph wrote this game, to play, please select option [2]Games, and then [2]oregontrail. Trying to find a better way to launch this";
			commandConfirm();
			//js.global.frame.close();
			//fixFrame2();
			console.clear();
			bbs.exec_xtrn("OREGONTR");
			refreshAndReturn();
			return;
}

	function lordDoor() {
			caseDesc = "Everyone loves LORD, so many spin-offs, the original starts here";
			commandConfirm();
			bbs.exec_xtrn("LORD");
			refreshAndReturn();
			return;
}

function planetTeos(){
caseDesc = "Explore Space and destroy time";
			commandConfirm();
			bbs.exec_xtrn("TEOSBLNK");
			refreshAndReturn();
			return;
}

function doublesGame(){
caseDesc = "You are a DOG \r\n Give bitches bones and \r\n make puppies and shit and piss\rn\ in da house!!!";
			commandConfirm();
			bbs.exec_xtrn("DOUBLES");
			refreshAndReturn();
			return;
}



	function starStocks() {
			caseDesc = "This is a very addictive game if you ask Larry Lagomorph!";
			commandConfirm();
			bbs.exec_xtrn("STARSTOX");
			refreshAndReturn();
			return;
}
	function diceWars() {
			caseDesc = "A very fun game where you roll dice for world domination!";
			commandConfirm();
			bbs.exec_xtrn("DICEWAR2");
			refreshAndReturn();
			return;
}

	function starTrek() {
			caseDesc = "An awesome demonstration of pushing the limit of text based sprite gaming";
			commandConfirm();
			bbs.exec_xtrn("STARTREK");
			refreshAndReturn();
			return;
}
	function uberBloxDoor() {
			caseDesc = "An addictive puzzle game like no other!";
			commandConfirm();
			bbs.exec_xtrn("UBERBLOX");
			refreshAndReturn();
			return;
}

	function chickenDelivery() {
			caseDesc = "DELIVER THE CHICKEN TO SAFETY, QUICK!";
			commandConfirm();
			bbs.exec_xtrn("CHICKEND");
			refreshAndReturn();
			return;
}

	function fatFish() {
			caseDesc = "This game is a pretty sweet\r\n fishing simulator, very challenging!";
			commandConfirm();
			bbs.exec_xtrn("FATFISH");
			refreshAndReturn();
			return;
}

	function lordBLink() {
			caseDesc = "The classic door game, registered and with multi-BBS support without sacrificing core gameplay!";
			commandConfirm();
			bbs.exec_xtrn("LORDBLNK");
			refreshAndReturn();
			return;
}
	function lord2BLink() {
			caseDesc = "The graphical sequel to LORD, very different and cool";
			commandConfirm();
			bbs.exec_xtrn("LRD2BLNK");
			refreshAndReturn();
			return;
}
	function teosBLink() {
			caseDesc = "A cross between TradeWars and LORD";
			commandConfirm();
			bbs.exec_xtrn("TEOSBLNK");
			refreshAndReturn();
			return;
}
	function overkillBLink() {
			caseDesc = "Operation Overkill";
			commandConfirm();
			bbs.exec_xtrn("OOK2BLNK");
			refreshAndReturn();
			return;
}
	function pimpBLink() {
			caseDesc = "Play a Pimp, linked across other boards for more activity.";
			commandConfirm();
			bbs.exec_xtrn("PIMPBLNK");
			refreshAndReturn();
			return;
}

	function bubbleBoggle() {
	
			caseDesc = "INTER BBS BOGGLE CHALLENGE";
			commandConfirm();
			bbs.exec_xtrn("BOGGLE");
			refreshAndReturn();
			return;
}

	function synchronetris() {
	
			caseDesc = "multi-player network \r\n improved tetris";
			commandConfirm();
			bbs.exec_xtrn("TETRIS");
			refreshAndReturn();
			return;
}

	function wordEm() {
	
			caseDesc = "SCRABBLE WITH OTHER BBS PLAYERS";
			commandConfirm();
			bbs.exec_xtrn("WORDEM");
			refreshAndReturn();
			return;
}

	function mazeRace() {
	
			caseDesc = "Maze Race";
			commandConfirm();
			bbs.exec_xtrn("MAZERACE");
			refreshAndReturn();
			return;
}
	function thirstyVille() {
	
			caseDesc = "QUENCH THE THIRSTY OF \r\n virtual creatures \r\n with your love juices \r\n and entrepeneurship";
			commandConfirm();
			bbs.exec_xtrn("THIRSTY");
			refreshAndReturn();
			return;
}
	function unixEnv() {
	
			caseDesc = "This is a portal to a unix Environment, you will have to be approved for an account by a third party (nyx.nyx.net before using this feature";
			commandConfirm();
			bbs.exec_xtrn("NYXNYX");
			refreshAndReturn();
			return;
}
function internetRelayChat() {
	caseDesc = "\1yC\1chat Section";
			commandConfirm();
			load("chat_sec.js");
			refreshAndReturn();
			return;
			}
function ansiWall() {
caseDesc = "INTER BBS ANSI GRAPHICS WALL";
			commandConfirm();
			bbs.exec_xtrn("SYNCWALL");
			refreshAndReturn();
			return;
}
function synchroMM() {
caseDesc = "FIND THE LOVE OF YOUR LIFE... if it's a fat loser dude hehe";
			commandConfirm();
			bbs.exec_xtrn("SMM");
			refreshAndReturn();
			return;
}

function userLister(){
caseDesc = "\1yU\1cserlist Display";
			commandConfirm();
			console.print("\r\nchList Users\r\n");
			console.mnemonics("\r\n~Logons Today, ~Sub-board, or ~All: ");
			switch(get_next_keys("LSA",false)) {
				case 'L':
					bbs.list_logons();
					refreshAndReturn();
					return;
				case 'S':
					bbs.list_users(UL_SUB);
					refreshAndReturn();
					return;
				case 'A':
					bbs.list_users(UL_ALL);
					refreshAndReturn();
					return;
			}
		}

function defaultUser() {
	caseDesc = "\1yD\1cefault User Settings";
			commandConfirm();
			bbs.user_config();
			refreshAndReturn();
			return;
		}
		
function bbsInfoStat() {
	caseDesc = "\1yI\1cnfo for this BBS";
			commandConfirm();
			main_info();
			refreshAndReturn();
			return;
}
		
function findTextInForum() {
	caseDesc = "\1yF\1cind Text in Message Groups/Forums";
			commandConfirm();
			console.print("\r\nchFind Text in Messages\r\n");
			bbs.scan_subs(SCAN_FIND);
			refreshAndReturn();
			return;		
		}
function xtrnMenuSec(){
caseDesc = "\1ce\1yX\1ctra SPECIAL FUN";
			commandConfirm();
			bbs.xtrn_sec();
			refreshAndReturn();
			return;
		}
		
		function listNodeActivity() {
			caseDesc = "\1yL\1cist Node Activity";
			commandConfirm();
			bbs.list_nodes();
			refreshAndReturn();
			return;
			}
function forumPost() {
caseDesc = "\1yP\1cost a Message";
			commandConfirm();
			bbs.post_msg();
			//refreshAndReturn();
			return;
			}

function shellHelp() {
caseDesc = "user help";
			commandConfirm();
			userHelp();
			refreshAndReturn();
			return;
		}

		//############################### E-mail Section ################################

function email()
{
	var key;
	var i;
	while(1) {
		if(!(user.settings & USER_EXPERT))
			bbs.menu("e-mail");

		// async

		console.print("\r\nyhE-mail: n");
		key=get_next_keys("?SRFNUKQ\r");
		bbs.log_key(key);
		switch(key) {
			case '?':
				if(user.settings & USER_EXPERT)
					bbs.menu("e-mail");
				break;

			case 'S':
				console.print("_\r\nbhE-mail (User name or number): w");
				str=get_next_str("",40,K_UPRLWR,false);
				if(str==null || str=="")
					break;
				if(str=="Sysop")
					str="1";
				if(str.search(/\@/)!=-1)
					bbs.netmail(str);
				else {
					i=bbs.finduser(str);
					if(i>0)
						bbs.email(i,WM_EMAIL);
				}
				break;

			case 'U':
				console.print("_\r\nbhE-mail (User name or number): w");
				str=get_next_str("",40,K_UPRLWR,false);
				if(str==null || str=="")
					break;
				if(str=="Sysop")
					str="1";
				if(str.search(/\@/)!=-1)
					bbs.netmail(str,WM_FILE);
				else {
					i=bbs.finduser(str);
					if(i>0)
						bbs.email(i,WM_EMAIL|WM_FILE);
				}
				break;

			case 'R':
				bbs.read_mail(MAIL_YOUR);
				break;

			case 'F':
				bbs.email(1,WM_EMAIL,bbs.text(ReFeedback));
				break;

			case 'N':
				if(console.noyes("\r\nAttach a file"))
					i=WM_FILE;
				else
					i=0;
				console.putmsg(bbs.text(EnterNetMailAddress),P_SAVEATR);
				str=get_next_str("",60,K_LINE,false);
				if(str!=null && str !="")
					bbs.netmail(str,i);
				break;

			case 'K':
				bbs.read_mail(MAIL_SENT);
				break;

			case 'Q':
			default:
				return;
		}
	}
	return
}
function dogWorld(){
caseDesc = "You are a DOG \r\n Give bitches bones and \r\n make puppies and shit and piss\rn\ in da house!!!";
			commandConfirm();
			bbs.exec_xtrn("DOGWORLD");
			refreshAndReturn();
			return;
}
function dragonsHoard(){
caseDesc = "That dragon got too much shit \r\n take it back motherfucker!!";
			commandConfirm();
			bbs.exec_xtrn("DHOARD");
			refreshAndReturn();
			return;
}

function doorMud(){
caseDesc = "This is not dirt mixed with water.. \r\n MUD=Multi-User Dungeon";
			commandConfirm();
			bbs.exec_xtrn("MECHWARS");
			refreshAndReturn();
			return;
}
