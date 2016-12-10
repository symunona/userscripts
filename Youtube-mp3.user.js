// ==UserScript==
// @name         Youtube-mp3 (Hash redirecter)
// @namespace    http://benthegoose.com/
// @version      0.1
// @description  second half of ytdl
// @author       You
// @match        http://www.youtube-mp3.org/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==

(function() {
    'use strict';    
    var observeDOM = (function(){
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
            eventListenerSupported = window.addEventListener;

        return function(obj, callback){
            if( MutationObserver ){
                // define a new observer
                var obs = new MutationObserver(function(mutations, observer){
                    if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                        callback();
                });
                // have the observer observe foo for changes in children
                obs.observe( obj, { childList:true, subtree:true });
            }
            else if( eventListenerSupported ){
                obj.addEventListener('DOMNodeInserted', callback, false);
                obj.addEventListener('DOMNodeRemoved', callback, false);
            }
        };
    })();

    setTimeout(function(){
        if (location.hash){
            var url = decodeURIComponent(location.hash.substr(1));
            console.log(url);
            $('#youtube-url').val(url).trigger('change');
            $('#submit').trigger('click');
            console.log('Clicked');
            observeDOM( document.getElementById('dl_link') ,function(){
                console.log('dom changed');
                setTimeout(function(){
                    $('#dl_link').children().get(2);
                    console.log($('#dl_link').children().get(2));
                    $('#dl_link').children().get(2).click();
                    setTimeout(window.close,3000);
                }, 500);
            });
        }
    },500);

})();


