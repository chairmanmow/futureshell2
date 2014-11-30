	load("sbbsdefs.js");
		load("rss-atom.js");
		rssFeedsIndex = 0;

		var rssFeeds = new Array();
		rssFeeds[0] = "http://feeds.feedburner.com/DrudgeReportFeed";
		rssFeeds[1] = "http://mlb.mlb.com/partnerxml/gen/news/rss/mlb.xml";
		rssFeeds[2] = "http://www.grudgemirror.com/feed/";


	// you can only use one rssString or rssCyckle depending on how the headerFrame works because rssTickerCounter is used in different ways
	// for each function... not good form, but hey i could fix it. rssCycle is designed to return one object at a time.

		function rssString(){
			var feedStr = "";
			var feedToConvert = rssFeeds[rssFeedsIndex];

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
			feedStr += "---";

		}
		headerFrame.putmsg(feedStr);//substring(0,headerFrame.width)
		headerFrame.scrollTo(1,1);
		//rssTickerCounter = headerFrame.width;
		cycleAll();
		return feedStr;
	}
	currentFeedObject = new Feed(rssFeeds[0]);
	var rssItemsIndex = 0;
	var rssChannelIndex = 0;
	var rssTitleToggle = false;
	var feedErrorFlag;	
	var grabToggle = false;


	function grabFeed(){
	try {
		
		feedToConvert = rssFeeds[rssFeedsIndex];
		if(rssFeedsIndex > rssFeeds.length) {  //if we've gone too far and have no more feeds.
			feedToConvert = rssFeeds[0];
			rssFeedsIndex = 0;
		}

		grabToggle = false;
		currentFeedObject = new Feed(feedToConvert);
		//chatOutputFrame.putmsg("new rss");   
		//rssCycle();
		//currentFeedObject.load();
		cycleAll();
	}
	catch(err){
		//chatOutputFrame.putmsg("rss error " + feedToConvert);
		grabToggle = true;
		rssFeedsIndex++;
		grabFeed();
		cycleAll();
		}
	}
		



	function rssCycle(){
		if(grabToggle == true){
			return;
		}

		while(rssChannelIndex < currentFeedObject.channels.length) {  //while there are still channels
			headerFrame.clear();
			/*if(rssTitleToggle == false){
				headerFrame.putmsg("\1h\1y" + currentFeedObject.channels[rssChannelIndex].title.substring(0,headerFrame.width) + "\1n--");
				//headerFrame.putmsg(f.channels[c].updated + "--");;
			rssTitleToggle = true;
			chatOutputFrame.putmsg(rssTitleToggle + " --ch:" + rssChannelIndex + " --it:" + rssItemsIndex);
			cycleAll();
			return;
		}  //end if to make sure the title doesn't display again. 
		*/  
			while(rssItemsIndex < currentFeedObject.channels[rssChannelIndex].items.length) {  //while the title toggle is true
					headerFrame.putmsg(currentFeedObject.channels[rssChannelIndex].items[rssItemsIndex].title.substring(0,headerFrame.width) + " -- ");
					rssItemsIndex++;
					rssTickerCounter++;
					cycleAll();
					return;
				}  // end inner while - iterating over each item and putting title in frame;
				//rssTitleToggle = false;
				//rssChannelIndex++; //go to the next channel
				rssFeedsIndex++;
				rssItemsIndex = 0;
				returnssChannelIndex = 0;
				grabFeed();
				cycleAll();
				cycleAll();  //this shouldn't happen i think
				
				}  // end outer loop
		
		}
		 // end function

		
			
