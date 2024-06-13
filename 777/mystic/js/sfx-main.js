var sfx_list = [];
var sfx_volumes = [];

var music_volume_mod;
var music_intro;
var music_loop;

var music_volume = 0;
var sfx_volume = 0;

$(document).ready(function() {
	sfx_default = new Howl({
		src: ['/html/boards/res/audio/sfx/default.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_default);
	sfx_volumes.push(1);

	sfx_beep = new Howl({
		src: ['/html/boards/res/audio/sfx/beep.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_beep);
	sfx_volumes.push(1);

	sfx_finalunlock = new Howl({
		src: ['/html/boards/res/audio/sfx/finalunlock.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_finalunlock);
	sfx_volumes.push(1);

	sfx_announcement = new Howl({
		src: ['/html/boards/res/audio/sfx/announcement.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_announcement);
	sfx_volumes.push(1);

	sfx_transition = new Howl({
		src: ['/html/boards/res/audio/sfx/transition.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_transition);
	sfx_volumes.push(1);

	sfx_dvout = new Howl({
		src: ['/html/boards/res/audio/sfx/dv-out.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_dvout);
	sfx_volumes.push(1);

	sfx_dvin = new Howl({
		src: ['/html/boards/res/audio/sfx/dv-in.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_dvin);
	sfx_volumes.push(1);


	sfx_channelok = new Howl({
		src: ['/html/boards/res/audio/sfx/channelok.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_channelok);
	sfx_volumes.push(1);

	sfx_siren = new Howl({
		src: ['/html/boards/res/audio/sfx/siren.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_siren);
	sfx_volumes.push(0.5);


	sfx_hover = new Howl({
		src: ['/html/boards/res/audio/sfx/hover.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_hover);
	sfx_volumes.push(1);

	sfx_bighover = new Howl({
		src: ['/html/boards/res/audio/sfx/bighover.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_bighover);
	sfx_volumes.push(1);

	sfx_mouseleave = new Howl({
		src: ['/html/boards/res/audio/sfx/mouseleave.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_mouseleave);
	sfx_volumes.push(1);


	sfx_select = new Howl({
		src: ['/html/boards/res/audio/sfx/select.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_select);
	sfx_volumes.push(1);

	sfx_chainselect = new Howl({
		src: ['/html/boards/res/audio/sfx/chainselect.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_chainselect);
	sfx_volumes.push(1);


	sfx_click = new Howl({
		src: ['/html/boards/res/audio/sfx/click.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_click);
	sfx_volumes.push(1);

	sfx_copy = new Howl({
		src: ['/html/boards/res/audio/sfx/copy.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_copy);
	sfx_volumes.push(0.6);

	sfx_swap = new Howl({
		src: ['/html/boards/res/audio/sfx/swap.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_swap);
	sfx_volumes.push(1);

	sfx_bigclick = new Howl({
		src: ['/html/boards/res/audio/sfx/bigclick.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_bigclick);
	sfx_volumes.push(1);


	sfx_check = new Howl({
		src: ['/html/boards/res/audio/sfx/check.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_check);
	sfx_volumes.push(1);

	sfx_uncheck = new Howl({
		src: ['/html/boards/res/audio/sfx/uncheck.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_uncheck);
	sfx_volumes.push(1);

	sfx_lock_start = new Howl({
		src: ['/html/boards/res/audio/sfx/lock-start.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_lock_start);
	sfx_volumes.push(1);

	sfx_lock_end = new Howl({
		src: ['/html/boards/res/audio/sfx/lock-end.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_lock_end);
	sfx_volumes.push(1);


	sfx_button_click = new Howl({
		src: ['/html/boards/res/audio/sfx/button-click.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_button_click);
	sfx_volumes.push(1);

	sfx_button_click_small = new Howl({
		src: ['/html/boards/res/audio/sfx/button-click-small.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_button_click_small);
	sfx_volumes.push(1);


	sfx_no = new Howl({
		src: ['/html/boards/res/audio/sfx/no.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_no);
	sfx_volumes.push(1);

	sfx_continue = new Howl({
		src: ['/html/boards/res/audio/sfx/continue.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_continue);
	sfx_volumes.push(0.6);

	sfx_backwards = new Howl({
		src: ['/html/boards/res/audio/sfx/backwards.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_backwards);
	sfx_volumes.push(1);

	sfx_forwards = new Howl({
		src: ['/html/boards/res/audio/sfx/forwards.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_forwards);
	sfx_volumes.push(1);

	sfx_halo = new Howl({
		src: ['/html/boards/res/audio/sfx/halo.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_halo);
	sfx_volumes.push(1);

	sfx_bliss = new Howl({
		src: ['/html/boards/res/audio/sfx/bliss.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_bliss);
	sfx_volumes.push(1);

	sfx_success = new Howl({
		src: ['/html/boards/res/audio/sfx/success.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_success);
	sfx_volumes.push(1);

	sfx_failure = new Howl({
		src: ['/html/boards/res/audio/sfx/failure.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_failure);
	sfx_volumes.push(1);

	sfx_slide = new Howl({
		src: ['/html/boards/res/audio/sfx/slide.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_slide);
	sfx_volumes.push(1);

	sfx_achieve = new Howl({
		src: ['/html/boards/res/audio/sfx/achieve.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_achieve);
	sfx_volumes.push(1);

	sfx_achieve_big = new Howl({
		src: ['/html/boards/res/audio/sfx/achieve-big.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_achieve_big);
	sfx_volumes.push(1);

	sfx_explode = new Howl({
		src: ['/html/boards/res/audio/sfx/explode.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_explode);
	sfx_volumes.push(1);

	sfx_explode_big = new Howl({
		src: ['/html/boards/res/audio/sfx/explode-big.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_explode_big);
	sfx_volumes.push(1);


	sfx_lose = new Howl({
		src: ['/html/boards/res/audio/sfx/lose.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_lose);
	sfx_volumes.push(1);

	sfx_complete = new Howl({
		src: ['/html/boards/res/audio/sfx/complete.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_complete);
	sfx_volumes.push(1);


	sfx_dialog = new Howl({
		src: ['/html/boards/res/audio/sfx/dialog.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_dialog);
	sfx_volumes.push(1);

	sfx_dialog_cancel = new Howl({
		src: ['/html/boards/res/audio/sfx/dialog-cancel.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_dialog_cancel);
	sfx_volumes.push(1);

	sfx_dialog_confirm = new Howl({
		src: ['/html/boards/res/audio/sfx/dialog-confirm.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_dialog_confirm);
	sfx_volumes.push(1);


	sfx_power_loop = new Howl({
		src: ['/html/boards/res/audio/sfx/power-loop.ogg'],
		loop: true,
		volume: 0
	});
	sfx_list.push(sfx_power_loop);
	sfx_volumes.push(0.6);

	sfx_aurora_loop = new Howl({
		src: ['/html/boards/res/audio/sfx/aurora-loop.ogg'],
		loop: true,
		volume: 0
	});
	sfx_list.push(sfx_aurora_loop);
	sfx_volumes.push(1);

	sfx_badspin = new Howl({
		src: ['/html/boards/res/audio/sfx/badspin.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_badspin);
	sfx_volumes.push(1);

	sfx_destroy = new Howl({
		src: ['/html/boards/res/audio/sfx/destroy.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_destroy);
	sfx_volumes.push(1);

	sfx_destroyed = new Howl({
		src: ['/html/boards/res/audio/sfx/destroyed.ogg'],
		volume: 0
	});
	sfx_list.push(sfx_destroyed);
	sfx_volumes.push(1);





	bindEnterLeave("a");
	bindEnterLeave(".button");
	bindEnterLeave(".dataverse-link");

	$("input:not(input[type='range'])").focus(function() {
		sfx_select.play();
	});
	$("textarea").focus(function() {
		sfx_select.play();
	});

	$("a").click(function() {
		if ($(this).attr("href") === "#") {
			sfx_button_click_small.play();
		} else {
			sfx_click.play();
		}
	});

	$(".button").click(function() {
		if ($(this).hasClass("disabled")) {
			sfx_no.play();
		} else {
			sfx_button_click.play();
		}
	});

	function bindEnterLeave(tag) {
		$(tag).mouseenter(function() {
			if ($(this).parents("section").attr("id") === "sitemap") {
				var index = $("#sitemap>a").index(this);
				playPitched(sfx_hover, 1 + (index / $("#sitemap>a").length) * 0.5);
			} else {
				sfx_hover.play();
			}
			
		});
		$(tag).mouseleave(function() {
			sfx_mouseleave.play();
		});
	}
});

function setSfxVolume(volume) {
	for (var i = 0; i < sfx_list.length; i++) {
		sfx_list[i].volume(sfx_volumes[i] * volume);
	}
}

function setMusicVolume(volume) {
	if (typeof music_intro !== "undefined") {
		music_intro.volume(1 * music_volume_mod * music_volume);
	}
	if (typeof music_loop !== "undefined") {
		music_loop.volume(1 * music_volume_mod * music_volume);
	}
}

var pitchCatcher = null;

function playPitched(soundobj, pitch) {
	soundobj.rate(pitch);
	soundobj.play();

	var pc = window.performance.now();
	pitchCatcher = pc;
	console.log("new pc: " + pc);

	soundobj.on("end", function() {
		if (pc === pitchCatcher) {
			soundobj.rate(1);
		}
	});
}

var musicCatcher = null;

function playMusic(volume, name1, name2, callback) {
	music_volume_mod = volume;
	volume = 1 * volume * music_volume;

	if (typeof name2 === "undefined") {
		music_loop = new Howl({
			src: ['/html/boards/res/audio/music/' + name1 + '.ogg'],
			volume: volume,
			loop: true
		});

		music_loop.on("load", function(){
			var mc = Date.now();
			musicCatcher = mc;

			music_loop.play();
		});
	} else {
		music_intro = new Howl({
			src: ['/html/boards/res/audio/music/' + name1 + '.ogg'],
			volume: volume,
			loop: false
		});

		music_loop = new Howl({
			src: ['/html/boards/res/audio/music/' + name2 + '.ogg'],
			volume: volume,
			loop: true
		});

		music_intro.on("load", function(){
			var mc = Date.now();
			musicCatcher = mc;
			music_intro.play();

			music_intro.on("end", function(){
				if (mc === musicCatcher) {
					music_loop.play();
				}
			});

			if (typeof callback !== "undefined") {
				callback();
			}
		});
	}
}

function playAmbient(volume = 1) {
	playMusic(volume, "ambient/" + randInt(1, 11));
}

function playAmbientDataverses(volume = 1) {
	playMusic(volume, "ambient/dataverses/" + randInt(1, 13));
}

function fadeAway(ms) {
	musicCatcher = 0;

	if (typeof ms === "undefined") {
		ms = 100;
	}

	if (typeof music_loop !== "undefined") {
		music_loop.fade(music_loop.volume(), 0, ms);

		setTimeout(function() {
			music_loop.unload();
		}, ms);
	}
	if (typeof music_intro !== "undefined") {
		music_intro.fade(music_intro.volume(), 0, ms);

		setTimeout(function() {
			music_intro.unload();
		}, ms);
	}
}