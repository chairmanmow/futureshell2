//load("menuTree.js");
load("sbbsdefs.js");
load("tree.js");
load("coldfuncs.js");
load("str_cmds.js");

var menuTree=new Tree(menuFrame,"My Menu");
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
	menuTree.addItem("shit",shit);
	menuTree.addItem("e-|mail and messages", netMailSection);
	menuTree.addItem("|post msg in this forum",forumPost);
	menuTree.addItem("kill",kill);
	menuTree.addItem("|trade wars 2002",tradeWars);
	testTree = menuTree.addTree("|piss shit fuck");
	/*
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
*/
	var  gameTree = menuTree.addTree("games");
	var dosDoorgameTree = gameTree.addTree("|old school classics")
		dosDoorgameTree.addItem("|trade wars 2002",tradeWars);
		dosDoorgameTree.addItem("|legend of the red dragon",lordBLink);
		dosDoorgameTree.addItem("|2 l.o.r.d. II",lord2BLink);
		dosDoorgameTree.addItem("|pimp wars",pimpBLink);
		dosDoorgameTree.addItem("|planet t.e.o.s.",teosBLink);
		dosDoorgameTree.addItem("|operation overkill ii",overkillBLink);
		dosDoorgameTree.addItem("lunati|x",lunatix);
		dosDoorgameTree.addItem("|bbs crash",bbsCrash);
	/*		

	var jsDoorgameTree = gameTree.addTree("|new school games");
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
		jsDoorgameTree.addItem("|oregon trail(in Games Section", xtrnMenuSec);

	var portalTree =  menuTree.addTree("|portals");
		var bbsTree = portalTree.addTree("|bbs's");
			bbsTree.addItem("p|hunc \1wsister bbs", phunc);
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
*/

var bbsFunctionTree = menuTree.addTree("|bbs functions");
	bbsFunctionTree.addItem("|default user settings",defaultUser);
	bbsFunctionTree.addItem("|information & statistics on bbs",bbsInfoStat);
	bbsFunctionTree.addItem("|node activity log",listNodeActivity);
	bbsFunctionTree.addItem("bbs |auto message",autoMsg);
	bbsFunctionTree.addItem("interbbs |ANSI machine",ansiWall);


menuTree.open();


function games(){
	chatOutputFrame.putmsg("fuck we don't got no games yet");
	cycleAll();	
}
function shit(){
	chatOutputFrame.putmsg("shit");
	cycleAll();
}

function kill(){
	the_loop = false;
	throw "kill switch thrown";
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
function logoffTheBBS(){
console.clear();
console.printfile("../text/logoff.msg");
console.pause();
bbs.hangup();
}

function sysopMenu() {
        caseDesc = "SYSOP MENU";
                        commandConfirm();
                        bbs.menu("sysmain");
    str=get_next_str("",40,0,false);
                        str_cmds(str);
console.pause();
                        refreshScreen();

                        return;
                        }

function bbsScene() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("BBSSCENE");
		
			refreshScreen();
			return;
			}
			function freeNode() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("FREENODE");
		
			refreshScreen();
			return;
			}
function efNet() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("EFNET");
		
			refreshScreen();
			return;
			}
function germanIRC() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("GERMANIR");
		
			refreshScreen();
			return;
			}
function quakeNet() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("QUAKENET");
		
			refreshScreen();
			return;
			}
function rizon() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("RIZON");
		
			refreshScreen();
			return;
			}
function undernet() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("UNDERNET");
		
			refreshScreen();
			return;
			}
function uStream() {
	caseDesc = "IRC NETWORK";
			commandConfirm();

			bbs.exec_xtrn("USTREAM");
		
			refreshScreen();
			return;
			}
function netMailSection() {
	caseDesc = "\1yE\1c-mail";
			commandConfirm();
			
			email();
			refreshScreen();
			
			return;
			}
			
function jumpForum() {
caseDesc = "Change message Areas";
			commandConfirm();
			load("../xtrn/ddac_105/DDMsgAreaChooser.js")
			refreshScreen();
			return;
}

function browseNewMsgs() {
			caseDesc = "\1yB\1crowse New Messages";
			commandConfirm();
			console.print("\r\nchBrowse/New Message Scan\r\n");
			bbs.scan_subs(SCAN_NEW|SCAN_BACK);
			refreshScreen();
			return;
			}
			
function newMsgScan() {
	caseDesc = "\1yN\1cew Message Scan";
			commandConfirm();
			console.print("\r\nchNew Message Scan\r\n");
			bbs.scan_subs(SCAN_NEW);
			refreshScreen();
			return;
}

function msgsForYou(){
		caseDesc = "\1yY\1cour messages";
			commandConfirm();
			console.print("\r\nchScan for Messages Posted to You\r\n");
			bbs.scan_subs(SCAN_TOYOU);
			refreshScreen();
			return;
			}
function ecReader() {
	caseDesc = "Electronic chickens threaded message viewer (sometimes buggy)";
			commandConfirm();
			//load("../xtrn/ecreader/ecReader.js")
			bbs.exec_xtrn("ECREADER")
			// console.print("\r\nchContinuous New Message Scan\r\n");
			// bbs.scan_subs(SCAN_NEW|SCAN_CONST);
			refreshScreen();
			return;
			}
function digdistML(){
caseDesc = "Digital distortions message viewer (more stable not threaded)";
			commandConfirm();
			//load("../xtrn/ddm136/DigitalDistortionMessageLister.js")
			bbs.exec_xtrn("DDML")
			// console.print("\r\nchContinuous New Message Scan\r\n");
			// bbs.scan_subs(SCAN_NEW|SCAN_CONST);
			refreshScreen();
			return;
			}
function traditionalForum() {
	caseDesc = "\1yR\1cead Forums";
			commandConfirm();
			bbs.scan_posts();
			refreshScreen();
			return;
			}
			
	
	function autoMsg() {
			caseDesc = "\1yA\1cuto BBS Message";
			commandConfirm();
			bbs.auto_msg();
			refreshScreen();
			return;
}
	function fatcats() {
			caseDesc = "Fat cats BBS uses an innovative interface and is part of the COA network";
			commandConfirm();
			bbs.exec_xtrn("FATCATS");
			refreshScreen();
			return;
}
	function brokenBubble() {
			caseDesc = "The broken bubble is also part of COA, and has some innovative features, cool demos and a message base that discusses some of the things this BBS collective has been doing";
			commandConfirm();
			bbs.exec_xtrn("BROKEBUB");
			refreshScreen();
			return;
}
	function eChicken() {
			caseDesc = "Electronic chicken has made many things for the BBS scene, and you can check out his BBS here.  A good example of a well done BBS.";
			commandConfirm();
			bbs.exec_xtrn("ECHICKEN");
			refreshScreen();
			return;
}

	function pharcyde() {
			caseDesc = "Pharcyde maintains an active message network, AgoraNet, echoed here, as well as some gaming leagues.";
			commandConfirm();
			bbs.exec_xtrn("PHARCYDE");
			refreshScreen();
			return;
}

	function digitalDistortion() {
			caseDesc = "Nightfox runs Digital Distortion, which has some customized features, which seem to be shared with the community.";
			commandConfirm();
			bbs.exec_xtrn("DIGDIST");
			refreshScreen();
			return;
}
	function phunc() {
			caseDesc = "Our buddy Knight's new BBS launched 4/2014 watch it grow";
			commandConfirm();
			bbs.exec_xtrn("PHUNCBBS");
			refreshScreen();
			return;
}
	function tradeWars() {
			caseDesc = "One of the sysops personal favorites, the classic Space Trading Games";
			commandConfirm();
			bbs.exec_xtrn("TWBBSLK");
			refreshScreen();
	    return
}
        function lunatix() {
                        caseDesc = "haven't got to play it, i hear it's cool";
                        commandConfirm();
                        bbs.exec_xtrn("LUNATIX");
	    refreshScreen();
            return
}
        function bbsCrash() {
                        caseDesc = "haven't got to play it, i hear it's cool";
                        commandConfirm();
                        bbs.exec_xtrn("BBSCRASH");
            refreshScreen();
            return
}
	function randomArt() {
			caseDesc = "Enjoy some futuristic graffiti";
			commandConfirm();
			randomANSI();
			console.putmsg("\r\n\ *** !!! ***r\n\1h\1yEND \1cOF \1gARtWoRK \1rEND \1wOF \1mARtWoRK \1bEND  \1n\1yOF \1gARtWoRK\r\n\r\n\1h\1y                 come back and visit the gallery \1gANY \1mTIME\1r!!!!\r\n\r\n");
			console.pause();
			
			refreshScreen();
			return;
			}
	function oregonTrail() {
			caseDesc = "Larry Lagomorph wrote this game, to play, please select option [2]Games, and then [2]oregontrail. Trying to find a better way to launch this";
			commandConfirm();
			//js.global.frame.close();
			fixFrame2();
			console.clear();
			bbs.exec_xtrn("OREGONTR");
			refreshScreen();
			return;
}

	function lordDoor() {
			caseDesc = "Everyone loves LORD, so many spin-offs, the original starts here";
			commandConfirm();
			bbs.exec_xtrn("LORD");
			refreshScreen();
			return;
}

function planetTeos(){
caseDesc = "Explore Space and destroy time";
			commandConfirm();
			bbs.exec_xtrn("TEOSBLNK");
			refreshScreen();
			return;
}
function dragonsHoard(){
caseDesc = "That dragon got too much shit \r\n take it back motherfucker!!";
			commandConfirm();
			bbs.exec_xtrn("DHOARD");
			refreshScreen();
			return;
}

function doorMud(){
caseDesc = "This is not dirt mixed with water.. \r\n MUD=Multi-User Dungeon";
			commandConfirm();
			bbs.exec_xtrn("MECHWARS");
			refreshScreen();
			return;
}
function doublesGame(){
caseDesc = "You are a DOG \r\n Give bitches bones and \r\n make puppies and shit and piss\rn\ in da house!!!";
			commandConfirm();
			bbs.exec_xtrn("DOUBLES");
			refreshScreen();
			return;
}

function dogWorld(){
caseDesc = "You are a DOG \r\n Give bitches bones and \r\n make puppies and shit and piss\rn\ in da house!!!";
			commandConfirm();
			bbs.exec_xtrn("DOGWORLD");
			refreshScreen();
			return;
}

	function starStocks() {
			caseDesc = "This is a very addictive game if you ask Larry Lagomorph!";
			commandConfirm();
			bbs.exec_xtrn("STARSTOX");
			refreshScreen();
			return;
}
	function diceWars() {
			caseDesc = "A very fun game where you roll dice for world domination!";
			commandConfirm();
			bbs.exec_xtrn("DICEWAR2");
			refreshScreen();
			return;
}

	function starTrek() {
			caseDesc = "An awesome demonstration of pushing the limit of text based sprite gaming";
			commandConfirm();
			bbs.exec_xtrn("STARTREK");
			refreshScreen();
			return;
}
	function uberBloxDoor() {
			caseDesc = "An addictive puzzle game like no other!";
			commandConfirm();
			bbs.exec_xtrn("UBERBLOX");
			refreshScreen();
			return;
}

	function chickenDelivery() {
			caseDesc = "DELIVER THE CHICKEN TO SAFETY, QUICK!";
			commandConfirm();
			bbs.exec_xtrn("CHICKEND");
			refreshScreen();
			return;
}

	function fatFish() {
			caseDesc = "This game is a pretty sweet\r\n fishing simulator, very challenging!";
			commandConfirm();
			bbs.exec_xtrn("FATFISH");
			refreshScreen();
			return;
}

	function lordBLink() {
			caseDesc = "The classic door game, registered and with multi-BBS support without sacrificing core gameplay!";
			commandConfirm();
			bbs.exec_xtrn("LORDBLNK");
			refreshScreen();
			return;
}
	function lord2BLink() {
			caseDesc = "The graphical sequel to LORD, very different and cool";
			commandConfirm();
			bbs.exec_xtrn("LRD2BLNK");
			refreshScreen();
			return;
}
	function teosBLink() {
			caseDesc = "A cross between TradeWars and LORD";
			commandConfirm();
			bbs.exec_xtrn("TEOSBLNK");
			refreshScreen();
			return;
}
	function overkillBLink() {
			caseDesc = "Operation Overkill";
			commandConfirm();
			bbs.exec_xtrn("OOK2BLNK");
			refreshScreen();
			return;
}
	function pimpBLink() {
			caseDesc = "Play a Pimp, linked across other boards for more activity.";
			commandConfirm();
			bbs.exec_xtrn("PIMPBLNK");
			refreshScreen();
			return;
}

	function bubbleBoggle() {
	
			caseDesc = "INTER BBS BOGGLE CHALLENGE";
			commandConfirm();
			bbs.exec_xtrn("BOGGLE");
			refreshScreen();
			return;
}

	function synchronetris() {
	
			caseDesc = "multi-player network \r\n improved tetris";
			commandConfirm();
			bbs.exec_xtrn("TETRIS");
			refreshScreen();
			return;
}

	function wordEm() {
	
			caseDesc = "SCRABBLE WITH OTHER BBS PLAYERS";
			commandConfirm();
			bbs.exec_xtrn("WORDEM");
			refreshScreen();
			return;
}

	function mazeRace() {
	
			caseDesc = "Maze Race";
			commandConfirm();
			bbs.exec_xtrn("MAZERACE");
			refreshScreen();
			return;
}
	function thirstyVille() {
	
			caseDesc = "QUENCH THE THIRSTY OF \r\n virtual creatures \r\n with your love juices \r\n and entrepeneurship";
			commandConfirm();
			bbs.exec_xtrn("THIRSTY");
			refreshScreen();
			return;
}
	function unixEnv() {
	
			caseDesc = "This is a portal to a unix Environment, you will have to be approved for an account by a third party (nyx.nyx.net before using this feature";
			commandConfirm();
			bbs.exec_xtrn("NYXNYX");
			refreshScreen();
			return;
}
function internetRelayChat() {
	caseDesc = "\1yC\1chat Section";
			commandConfirm();
			load("chat_sec.js");
			refreshScreen();
			return;
			}
function ansiWall() {
caseDesc = "INTER BBS ANSI GRAPHICS WALL";
			commandConfirm();
			bbs.exec_xtrn("SYNCWALL");
			refreshScreen();
			return;
}
function synchroMM() {
caseDesc = "FIND THE LOVE OF YOUR LIFE... if it's a fat loser dude hehe";
			commandConfirm();
			bbs.exec_xtrn("SMM");
			refreshScreen();
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
					refreshScreen();
					return;
				case 'S':
					bbs.list_users(UL_SUB);
					refreshScreen();
					return;
				case 'A':
					bbs.list_users(UL_ALL);
					refreshScreen();
					return;
			}
		}

function defaultUser() {
	caseDesc = "\1yD\1cefault User Settings";
			commandConfirm();
			bbs.user_config();
			refreshScreen();
			return;
		}
		
function bbsInfoStat() {
	caseDesc = "\1yI\1cnfo for this BBS";
			commandConfirm();
			main_info();
			refreshScreen();
			return;
}
		
function findTextInForum() {
	caseDesc = "\1yF\1cind Text in Message Groups/Forums";
			commandConfirm();
			console.print("\r\nchFind Text in Messages\r\n");
			bbs.scan_subs(SCAN_FIND);
			refreshScreen();
			return;		
		}
function xtrnMenuSec(){
caseDesc = "\1ce\1yX\1ctra SPECIAL FUN";
			commandConfirm();
			bbs.xtrn_sec();
			refreshScreen();
			return;
		}
		
		function listNodeActivity() {
			caseDesc = "\1yL\1cist Node Activity";
			commandConfirm();
			bbs.list_nodes();
			refreshScreen();
			return;
			}
function forumPost() {
caseDesc = "\1yP\1cost a Message";
			commandConfirm();
			bbs.post_msg();
			//refreshScreen();
			return;
			}

function shellHelp() {
caseDesc = "user help";
			commandConfirm();
			userHelp();
			refreshScreen();
			return;
		}
