window.onload = function() {
    var form = document.getElementById('file-form');
    var fileSelect = document.getElementById('file-select');
    var transformCheck = document.getElementById('transform-check');
    var responseText = document.getElementById('response');

    // Other page set up code
    var label = fileSelect.nextElementSibling,
        labelVal = label.innerHTML;

    fileSelect.addEventListener('change', function(e) {
        var filename = e.target.value.split('\\').pop();
        if (filename)
            label.querySelector('span').innerHTML = filename;
        else
            label.innerHTML = labelVal;
    });

    // Form Submission
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
        formData.append('transform', transformCheck.checked);

        var http = new XMLHttpRequest();

        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                if (http.status == 200) {
                    var map = JSON.parse(http.responseText);
                    responseText.innerHTML = 'Map ID: ' + map['Id'];
                    responseText.className = 'success';
                    drawPreview(map, document.getElementById('preview'));
                } else {
                    switch (http.status) {
                        case 0:
                            responseText.innerHTML = 'Server not found or timeout - check console for details.';
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