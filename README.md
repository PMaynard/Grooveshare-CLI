# Grooveshare CLI 

Requires the following packages.

	npm install player socket.io-client libnotify

Which in turn may require some of these packages

	sudo apt-get install libnotify-bin libasound2-dev 

# Future work

- Generate/import uuid
- Set initial position (First song will skip midway)
- Mute
- Select Channel
- View Queue
- Search and add
- Vote up/down


## Optional
- last.fm
- ~~screen notification~~
- visualisation

# FAQ

## 1. How can I add it to my system path. 

If it does not already exist, create ```%HOME/bin```.

Create a symbolic link to ```main.js``` in your user bin file:

	ls -s /path/to/cloned/repo/main.js $HOME/bin/grooveshare

Enable execution of the linked file: 

	chmod +x $HOME/bin/grooveshare

*Optional* Depending on how your bash is configured, you might need to add
```$HOME/bin``` to you path. The simpliest method is to add the following line
to the end of your ```.bashrc```:

	if [ -d "$HOME/bin" ] ; then
	    PATH="$HOME/bin:$PATH"
	fi

# Trouble

1. I get this alsa error?!

	ALSA lib pcm_dmix.c:1022:(snd_pcm_dmix_open) unable to open slave
	[../deps/mpg123/src/output/alsa.c:165] error: cannot open device default
	node: pcm_params.c:2286: snd_pcm_hw_refine: Assertion `pcm && params' failed.
	Aborted (core dumped)

This can happen if you have two devices, so for example on my laptop I have my
HDMI output (HDA Intel HDMI) and my audio card (HDA Intel PCH). To check open
up alsamixer and press F6 to select sound cards. It appears to bork when the
default is not set and it picks up the HDMI as default. So a simple fix is to
tell alsa to use the audio card (HDA Intel PCH) as the default. Create
```$HOME/.asoundrc``` and fill it with:

	pcm.!default {
		type hw
		card 1
	}

	ctl.!default {
		type hw           
		card 1
	}


