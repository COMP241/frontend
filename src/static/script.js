window.onload = function() {
    var form = document.getElementById('file-form');
    var fileSelect = document.getElementById('file-select');

    form.onsubmit = function() {
        event.preventDefault();

        var formData = new FormData();
        var file = fileSelect.files[0];
        formData.append('image', file, file.name);

        var http = new XMLHttpRequest();

        http.onreadystatechange = function() {
            console.log(http);
            if (http.readyState == 4 && http.status == 200) {
                console.log()
            }
        };

        http.open("POST", "http://128.199.159.24/api/map", true);
        http.send(formData);
    };
};