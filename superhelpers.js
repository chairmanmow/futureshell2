

var oldNodeString = "";
function showLocalNodes(){
	var onlineCount = 0;
	var nodeString = "";
	localNodeFrame.clear();	
	tableA1Frame.clear();
	for(i=0; i < system.node_list.length; i++){
		
		if(system.node_list[i].status == 3){
			onlineCount++;
			nodeString += "#" + i + ":" + system.username(system.node_list[i].useron) + "\r\n" + NodeAction[system.node_list[i].action] +"\r\n";
			//localNodeFrame.crlf();	
		}
	}

localNodeFrame.putmsg(nodeString + "\r\n" + showCoaNodes());
tableA2Frame.center(onlineCount + " users online");
//tableA1Frame.cycle();
//localNodeFrame.cycle();
return;
}

load(system.mods_dir + "coa/coa.js");

var coa = new COA();
function showCoaNodes(){
var coaNodeString = "";
coa.cycle();
//console.putmsg(JSON.stringify(coa.presence));
for(i=0; i<coa.presence.length; i++){
	var coaBBS = coa.presence[i];
	
	for(j=0; j < coaBBS.nodes.length;j++){
			if(coaBBS.nodes[j].status == 3 && coaBBS.system != system.name){
				coaNodeString += coaBBS.nodes[j].alias + "\r\n\1y" + coaBBS.system + "\r\n";
			}
	}
}
	return coaNodeString;
}

load("rss-atom.js");

function rssFeed(feedUrl){
	var rssString = "";
	var feedToFetch = feedUrl;
	if(feedUrl == undefined) {
		feedToFetch = "http://mlb.mlb.com/partnerxml/gen/news/rss/mlb.xml";
	}
	var f = new Feed(feedToFetch);
	        for(var c = 0; c < f.channels.length; c++) {
                rssString += f.channels[c].title + "\r\n";
	                rssString += f.channels[c].updated + "\r\n";
	                for(var i = 0; i < f.channels[c].items.length; i++) {
                        rssString += f.channels[c].items[i].title + "\r\n";
	                        rssString += f.channels[c].items[i].author + "\r\n";
                        rssString += f.channels[c].items[i].date + "\r\n";
	                        rssString += f.channels[c].items[i].body + "\r\n";
                        rssString += "---\r\n";	                }
	                rssString += "---\r\n";
        }
	        
	        return rssString;
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
