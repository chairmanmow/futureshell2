load("sbbsdefs.js");
	load("rss-atom.js");
	rssLoopIndex = 0;

	var rssFeeds = new Array();
	rssFeeds[0] = "http://www.nba.com/rss/nba_rss.xml";
	rssFeeds[1] = "http://feeds.feedburner.com/DrudgeReportFeed";
	rssFeeds[2] = "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml";
	rssFeeds[3] = "http://rss.cnn.com/rss/cnn_topstories.rss";
	rssFeeds[4] = "http://mlb.mlb.com/partnerxml/gen/news/rss/mlb.xml";
	rssFeeds[5] = "http://feeds.reuters.com/reuters/technologyNews";
	rssFeeds[6] = "http://feeds.reuters.com/reuters/businessNews";
	rssFeeds[7] = "http://www.grudgemirror.com/feed/"
	rssFeeds[8] = "http://web.mit.edu/newsoffice/topic/humanities.feed";
	rssFeeds[9] = "http://www.npr.org/rss/rss.php?id=1039";
	rssFeeds[10] = "http://http://www.usmagazine.com/celebrity_news/rss";
	rssFeeds[11] = "http://rss.nytimes.com/services/xml/rss/nyt/Sports.xml";


	function rssString(){
		var feedStr = "";
		var feedToConvert = rssFeeds[rssLoopIndex];
	if(rssLoopIndex > rssFeeds.length) {
		feedToConvert = rssFeeds[0];
		rssLoopIndex = 0;
	}
	var f = new Feed(feedToConvert);
	for(var c = 0; c < f.channels.length; c++) {
		feedStr += "\1h\1y" + f.channels[c].title + "\1n--";
		feedStr += f.channels[c].updated + "--";
		for(var i = 0; i < f.channels[c].items.length; i++) {
			feedStr += f.channels[c].items[i].title + " -- ";
			//console.putmsg(f.channels[c].items[i].author + "\r\n");
			//console.putmsg(f.channels[c].items[i].date + "\r\n");
			//console.putmsg(f.channels[c].items[i].body + "\r\n");
			//console.putmsg("---\r\n");
		}
		feedStr += "---\r\n";

	}
	headerFrame.putmsg(feedStr);
	headerFrame.scrollTo(1,1);
	cycleAll();
	return feedStr;
}

