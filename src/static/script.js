window.onload = function() {
    var form = document.getElementById('file-form');
    var fileSelect = document.getElementById('file-select');
    var responseText = document.getElementById('response');

    form.onsubmit = function() {
        event.preventDefault();

        responseText.innerHTML = 'Uploading...';
        responseText.className = 'progress';

        var formData = new FormData();
        var file = fileSelect.files[0];

        if (file == undefined) {
            responseText.innerHTML = 'Please choose a file.';
            responseText.className = 'fail';
            return;
        }

        formData.append('image', file, file.name);

        var http = new XMLHttpRequest();

        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                if (http.status == 200) {
                    var map = JSON.parse(http.responseText);
                    responseText.innerHTML = 'Map ID: ' + map['Id'];
                    responseText.className = 'success';
                    drawpreview(map);
                } else {
                    switch (http.status) {
                        case 0:
                            responseText.innerHTML = 'The server could not be found.';
                            break;
                        case 413:
                            responseText.innerHTML = 'File too large for the server.';
                            break;
                        case 415:
                            responseText.innerHTML = 'Unsupported image type, try another one.';
                            break;
                        case 500:
                            responseText.innerHTML = 'An error occurred processing your image, please try another one.';
                            break;
                        default:
                            responseText.innerHTML = 'An unknown error occurred. ¯\\_(ツ)_/¯'
                    }
                    responseText.className = 'fail';
                }
            }
        };

        http.open('POST', 'http://papermap.tk/api/map', true);
        http.send(formData);
    };
};

drawpreview = function (map) {
    var colors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ff00ff', '#ffff00'];

    var canvas = document.getElementById('preview');
    var ctx = canvas.getContext('2d');

    canvas.height = canvas.width / map['Ratio'];
    var lines = map['Lines'];

    for (var i = 0, numlines = lines.length; i < numlines; i++) {
        var line = lines[i];
        var points = line['Points'];

        ctx.beginPath();
        ctx.moveTo(points[0]['X'] * canvas.width, points[0]['Y'] * canvas.height);
        for (var p = 1, len = points.length; p < len; p++) {
            ctx.lineTo(points[p]['X'] * canvas.width, points[p]['Y'] * canvas.height);
        }
        if (line['Loop']) {
            ctx.lineTo(points[0]['X'] * canvas.width, points[0]['Y'] * canvas.height);
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = colors[lines[i]['Color']];
        ctx.stroke();
    }
};