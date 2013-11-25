;(function($, window, undefined) {
	$(function(){
		flowplayer("player", "/js/plugins/flowplayer/flowplayer-3.2.16.swf",{
			clip: {
				url: '/video/demo.flv',
				autoPlay: false,
				autoBuffering: true
			},
			plugins: {
				// controls: null
			},
			onLoad: function(){
				
			}

		});
	});
})(jQuery, window);