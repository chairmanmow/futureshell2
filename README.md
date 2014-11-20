futureshell2
============

A revision of the Futureshell with many new features and bug fixes written from the ground up

ROAD MAP FOR REWRITE - FIXES, IMPROVEMENTS AND CHANGES.

*** KNOWN ISSUES ***

Highest Priority - difficulty medium -> high
Bug - CHAT UPDATE WHILE TYPING MESSAGE : Somewhere the timer and the refresh or the subscribe to chat updates does happen in the loop.  I have hacked a way a bit at this to no avail, but the chat is the most hacky part.

High Priority - difficulty unknown
Bug - When people connect to server with certain json chat clients, bbs crashes.
Medium Priority - difficulty unknown
Nuisance- MESSAGE GROUP SCROLLING SLOWS DOWN AT CERTAIN TIMES (related to BBS events or group size or retrieving more messages in memory than neccessary for frame perhaps?

Low priority - easy fix?

Nuisance/bug - After approximately 8 hours on the board loitering, memory will run out and kick the user.  My theory is it has to do with how the RSS ticker allocates memory growing and growing.  Not a shock given when I wrote it.  

*** PLANNED UPGRADES ***
THEME COLOR SWAPPING VIA JSON OBJECTS - straight forward enough - BORDER OPTIONS / tricky for me.

BBS NOTIFICATION FRAME- Replace lower left frame with a bbs action frame that displays what people are doing on the BBS, this will probably be accompanied by a change to a way things are launched by creating an object prototype that perhaps sends its own kind of JSON messages to be interpreted by the frame.

MULTIPLE (INTELLIGENT) DISPLAY RATIOS FOR LARGER TERMINALS - Basically if you have more terminal real estate use it to show more data.  Otherwise use smart abbreviations.  Perhaps reintegrate graphic banner frames if space allows (filling in gaps with ansi files that by themselves or added together fill the frame gaps)

MESSAGE BASE INTERACTION AND DISPLAY UPGRADES -  
		- Show a last read pointer indicator via color formatting in the message list
		- FULL BROWSWING FROM THE SHELL- Perhaps integrate a pop-up frame reader which may lead to a writer.  

RSS INTEGRATION READING AND POSTING TO CHAT, BOARDS, ETC. - ADD more controller and parser functions

*** NICE TO HAVE ***
Node messaging system using strings and JSON-server.  

*** OTHER IDEAS ***


*** CONCLUSION ***
Any other suggestions are welcome.

