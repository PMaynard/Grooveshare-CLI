var Player = require('player');
var socket = require('socket.io-client')('http://grooveshare.co.uk/');
var libnotify = require('libnotify');
var uuid    = 'test-cli-app';
var default_channel  = 1;
//var current_song;
var player = new Player();

process.title = "Grooveshare";

socket.on('connect', function() {
	socket.emit('register', { uuid: uuid });
	// console.log("Connected," uuid);
});

// Which channel?

//socket.on('channels.list', function(data) {
//	console.log(data);
	// channels = data;
	//renderChannelList(data);
//});

socket.emit('channel.join', default_channel);

socket.on('channel.joined', function(data) {
	//socket.emit('tracklist.list');
	player.add('http://grooveshare.co.uk/music/'+data.track.id+'.mp3');
	//current_song = data;
	
	console.log(data.track.track, " by ", data.track.artist);
	libnotify.notify(data.track.track + " by " + data.track.artist, {title : 'Music in your ears!' });
	// TODO: Set start point.
	player.play();                   

	// TODO: List the currently queued songs.
	//if(data.queue){
        //        console.log(data.queue);
        //}

});

socket.on('playlist.play', function(data) {
	// console.log(data.track, data.position);
	player.add('http://grooveshare.co.uk/music/'+data.track.id+'.mp3');
	player.next();
	console.log(data.track.track, " by ", data.track.artist);
	libnotify.notify(data.track.track + " by " + data.track.artist, {title : 'Music in your ears!' });
});

socket.on('track.queued', function(data) {
	//player.add('http://grooveshare.co.uk/music/'+data.id+'.mp3');
	console.log(data.track, " by ", data.artist, " - Added to Queue");
	libnotify.notify(data.track + " by " + data.artist, {title : 'Queued' });
});

player.on('playing', function(item){
	//console.log(current_song.track.track, " by ", current_song.track.artist);
}); 

player.on('error', function(err){
	//console.log(err);
});

