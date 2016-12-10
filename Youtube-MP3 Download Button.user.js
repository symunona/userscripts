// ==UserScript==
// @name       Youtube-MP3 Download Button
// @namespace  http://benthegoose.com
// @version    1.0
// @description  Adds a MP3 Download button next to the subscribe button, thanks to youtubeinmp3 for their simple download service (http://youtubeinmp3.com/api/). Based off magnus's youtube2mp3 code. Just used something different as it wont open another tab.
// @match         http*://www.youtube.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2016, tmP
// ==/UserScript==

var linkPath ='http://youtubeinmp3.com/fetch/?video='+encodeURIComponent(document.URL)+"&hq=1";
var videoUrl = encodeURIComponent(document.URL);

setTimeout(function(){
    addButton('Youtube-MP3', youtubemp3);
    console.log('yt dl');
},500);

function addButton(caption, clickFunction){
    $('<a>',{
        id: 'pinadl',
        'class': 'yt-uix-button yt-uix-button-default',
        style: 'margin-left: 8px; height: 26px; padding: 0 22px; background-color: #e62117;'
    })
    .on('click',clickFunction)
    .append($('<span>', {
        style: 'line-height: 25px; /* font-variant: small-caps; */ font-size: 12px; color: #fefefe;',
        'class': 'yt-uix-button-content'
    }).html(caption))
        .insertAfter( "#watch7-subscription-container" );
}

function youtubemp3(){
    var url = 'http://youtube-mp3.org/#' + videoUrl;    
    var win = unsafeWindow.ytdl = window.open(url,'','width=,height=,resizable=no');    
    win.blur();
    unsafeWindow.focus();
}
