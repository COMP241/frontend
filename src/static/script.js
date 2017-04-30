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
            if (http.readyState == 4 && http.status == 200) {
                responseText.innerHTML = http.responseText;
                responseText.className = 'success';
            }
        };

        http.open("POST", "http://128.199.159.24/api/map", true);
        http.send(formData);
    };
};