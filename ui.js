var blessed = require('blessed');
var util    = require('util');

var current_artist = "Dead Cannons";
var current_track  = "Catepillar Song";
var current_pos	   = "01:20";
var current_length = "03:42";

var UI = function() {
    this.elements = [];

    this.colors = {'main': {'fg': 'white', 'bg': 'black'}, 'highlight': {'fg': 'black', 'bg': 'white'}};

    // Create a screen object.
    this.screen = blessed.screen({
      smartCSR: true
    });

    this.screen.title = 'Grooveshare';

    this.renderLayout();

    // Quit on Escape, q, or Control-C.
    this.screen.key(['escape','q','C-c'], function(ch, key) {
      return process.exit(0);
    });

    // Render the screen.
    this.screen.render();
}

UI.prototype.renderLayout = function() {
    var self = this;

    // Footer
    this.elements['nowPlaying'] = blessed.Box({
        content: "", 
        tags: true,
        align: 'left',
        valign: 'top',
        width: '100%',
        height: '5%',
        bottom: 0,
        left: 0,
        style: {
            bg: this.colors.highlight.bg,
            fg: this.colors.highlight.fg
        }
    });
    this.screen.append(this.elements['nowPlaying']);

    this.screen.render();
}

/* Set Functions */
UI.prototype.setTrack = function(artist, track){
	var self = this;
	current_artist = artist;
	current_track  = track;
	this.elements['nowPlaying'].setContent(util.format(" {bold}%s{/bold} - %s [%s/%s]", current_track ,current_artist ,current_pos, current_length));
	this.screen.render();
}

module.exports = UI;


