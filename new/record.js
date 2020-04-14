var r = document.getElementById('result');


var speechRecognizer = new webkitSpeechRecognition();
speechRecognizer.continuous = true;
speechRecognizer.interimResults = true;
speechRecognizer.lang = 'id-ID';

function startConverting() {

    if (!('webkitSpeechRecognition' in window)) {
        upgrade();
    } else {
        speechRecognizer.start();

        var finalTranscripts = ''

        speechRecognizer.onresult = function (event) {
            var interimTranscripts = '';
            for (var i = event.resultIndex; i < event.results.length; i++) {
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<p>");
                if (event.results[i].isFinal) {
                    finalTranscripts += transcript;

                } else {
                    interimTranscripts += transcript;
                }
            }

            r.innerHTML = '<span id="finalspan" >' + finalTranscripts + '</span>' + '<span id="interimspan" style="color:#999">' + interimTranscripts + '</span>';

        };


        speechRecognizer.onerror = function (event) {
            console.log('Speech recognition error detected: ' + event.error);
        };
    }
}

function stopConverting() {
    speechRecognizer.stop();
}