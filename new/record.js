var r = document.getElementById('result');

var phrases = [
    'Mejuah-juah banta kerina, ',
    'Gelarku',
    'Hiskia Perdamen Puungan',
    'Rahmat Ginting',
    'Simerawana',
    'Keleng Ateku Kam',
    'Uga Berita Kena',
    'Kai pe labo man tangkelen'
];

var kalimat = [
    'mejuah-juah banta kerina, ',
    'gelarku',
    'hiskia perdamen pulungan',
    'rahmat ginting',
    'simerawana',
    'keleng ateku kam',
    'uga berita kena',
    'kai pe labo man tangkelen'
];
var grammar = '#JSGF V1.0; grammar kalimat public <kalimat> = ' + kalimat.join(' | ') + ';'
var speechRecognizer = new webkitSpeechRecognition();
speechRecognizer.grammars.addFromString('simerawana');
speechRecognizer.continuous = true;
speechRecognizer.interimResults = true;
speechRecognizer.lang = 'id-ID';

function startConverting() {

    if ('webkitSpeechRecognition' in window) {

        speechRecognizer.start();

        var finalTranscripts = '';

        speechRecognizer.onresult = function (event) {
            var interimTranscripts = '';
            for (var i = event.resultIndex; i < event.results.length; i++) {
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if (event.results[i].isFinal) {
                    finalTranscripts += transcript;

                } else {
                    interimTranscripts += transcript;
                }
            }
            r.innerHTML = finalTranscripts + '<span style="color:#999">' + interimTranscripts + '</span>';
        };

        speechRecognizer.onsoundend = function () {
            console.log('Sound has stopped being received');
        };

        // speechRecognizer.onerror = function (event) {

        // };
    } else {
        r.innerHTML = 'Browser Tidak Support. Coba di Google Chrome';
    }
}

function stopConverting() {
    speechRecognizer.stop();
}