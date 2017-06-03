drawPreview = function (map, canvas) {
    var colors = ['#000000', '#ff0000', '#00ff00', '#0000ff', '#00ffff', '#ff00ff', '#ffff00'];

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