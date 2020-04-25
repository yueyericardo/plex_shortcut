// ==UserScript==
// @name         Plex Shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add shortcut to plex!
// @author       Richard Xue
// @license      MIT
// @match        app.plex.tv/desktop
// @include      /^https?://plex..*/.*/
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
  }

  function expand_player() {
    var speed = get_or_init_playback_speed();
    var targetNode = document.querySelector('[data-qa-id="expandPlayerButton"]');
    if (targetNode) {
      //--- Simulate a natural mouse-click sequence.
      triggerMouseEvent(targetNode, "mouseover");
      triggerMouseEvent(targetNode, "mousedown");
      triggerMouseEvent(targetNode, "mouseup");
      set_playback_speed(speed);
    }
    else {
      console.log("*** Target node not found!");
    }
  }

  function minimize_player() {
    var speed = get_or_init_playback_speed();
    var targetNode = document.querySelector('[data-qa-id="minimizePlayerButton"]');
    if (targetNode) {
      //--- Simulate a natural mouse-click sequence.
      triggerMouseEvent(targetNode, "mouseover");
      triggerMouseEvent(targetNode, "mousedown");
      triggerMouseEvent(targetNode, "mouseup");
      set_playback_speed(speed);
    }
    else {
      console.log("*** Target node not found!");
    }
  }

  function mute_player() {
    var targetNode = document.querySelector('[data-qa-id="volumeButton"]');
    if (targetNode) {
      //--- Simulate a natural mouse-click sequence.
      triggerMouseEvent(targetNode, "mouseover");
      triggerMouseEvent(targetNode, "mousedown");
      triggerMouseEvent(targetNode, "mouseup");
      console.log("-----------------------");
    }
    else {
      console.log("*** Target node not found!");
    }
  }

  function insert_playback_speed() {
      var speed_dom = document.createElement('button'); // is a node
      speed_dom.setAttribute("id", "playback_speed");
      speed_dom.setAttribute("class", "PlayerIconButton-playerButton-1DmNp4 IconButton-button-9An-7I Link-link-2n0yJn Link-default-2XA2bN");
      speed_dom.innerHTML = '1.0';
      // insert
      document.getElementsByClassName('PlayerControls-buttonGroupRight-18LS_l')[0].prepend(speed_dom);
  }

  function get_or_init_playback_speed() {
    var playback_speed_dom = document.getElementById('playback_speed');
    if (playback_speed_dom == null){
        insert_playback_speed();
    }
    var speed = parseFloat(document.getElementById('playback_speed').innerHTML);
    return speed;
  }

  function set_playback_speed(speed) {
    get_or_init_playback_speed();
    document.getElementsByTagName('video')[0].playbackRate = speed;
    document.getElementById('playback_speed').innerHTML = speed.toFixed(1);
  }

  function adjust_playback_speed(inc) {
    var speed = get_or_init_playback_speed();
    if (inc){
        set_playback_speed(speed + 0.2);
    }else{
        set_playback_speed(speed - 0.2);
    }

  }

  document.onkeyup = function (e) {
    // char key code: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes

    if (e.which == 27) {
      // ESC
      minimize_player();
      // } else if (e.ctrlKey && e.which == 80) {
    }
    else if (e.which == 13) {
      // Enter
      expand_player();
    }
    else if (e.which == 77) {
      // M
      console.log("-----------------------")
      mute_player();
    }
    else if (e.which == 65) {
      // A - Reset playspeed
        set_playback_speed(1);
    }
    else if (e.which == 83) {
      // S - Increase playspeed
      adjust_playback_speed(false);
    }
    else if (e.which == 68) {
      // D - Decrease playspeed
      adjust_playback_speed(true);
    }
  };


    window.onload = function () {
	var delayInMilliseconds = 5000; //1 second
	setTimeout(function() {
		// inserted button template
        insert_playback_speed();
	}, delayInMilliseconds);
    }

  // Your code here...
})();
