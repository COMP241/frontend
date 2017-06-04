window.onload = function () {
    var container = document.getElementById('thumbnails');

    var readStream = function(maxIndex) {
        var start = 0;

        var handleData = function() {
            if (http.readyState != null && (http.readyState < 3 || http.status != 200)) {
                return;
            }
            while (true) {
                var index = http.responseText.indexOf('\n', start);
                if (index < 0) break;

                try {
                    var map = JSON.parse(http.responseText.substring(start, index));
                    displayMap(map);
                } catch (e) {}
                start = index + 1;
            }
        };

        var http = new XMLHttpRequest();
        http.onprogress = handleData;
        http.onload = handleData;
        http.open('GET', 'http://papermap.tk/api/map/0-' + maxIndex.toString(), true);
        http.send();
    };

    var displayMap = function(map) {
        var cell = document.createElement('div');
        var text = document.createElement('span');
        var canvas = document.createElement('canvas');
        text.innerHTML = map["Id"];
        drawPreview(map, canvas);
        cell.appendChild(text);
        cell.appendChild(canvas);
        container.appendChild(cell);
    };

    var http = new XMLHttpRequest();
    http.open('GET', 'http://papermap.tk/api/map', true);
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            readStream(JSON.parse(http.responseText).length-1);
        }
    };
    http.send();
};