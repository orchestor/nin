(function() {
  'use strict';

  angular.module('nin').directive('waveform', function() {
    return {
      restrict: 'A',
      template: '<div class=under style="width:{{ currentFrame * xScale }}px"></div>' +
                '<div class=over></div>',
      link: function(scope, element, attrs) {

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var context = new AudioContext();

        var waveform;
        var request = new XMLHttpRequest();
        request.open('GET', '//localhost:9000/' + PROJECT.music.path, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
          context.decodeAudioData(request.response, function(buffer) {
            var channelData = buffer.getChannelData(1);
            var duration = channelData.length / 44100 * 60;
            waveform = new Waveform({
              container: element[0].children[1],
              height: 50,
              width: duration,
              interpolate: true,
              innerColor: 'rgb(46, 62, 72)',
              outerColor: 'rgba(0, 0, 0, 0)',
              data: channelData
            });
          });
        };
        request.send();
      }
    };
  });
})();
