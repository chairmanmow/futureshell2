load("tree.js");

var tree=new Tree(menuFrame,"My Menu");
tree.colors = {
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
tree.addItem("games",games);
tree.addItem("shit",shit);
tree.addItem("kill",kill)
tree.open();

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
