var ctx = document.getElementById("buttonChart");
if (ctx != null) {
    var buttonData = [
        {
            label: 'Button presses',
            values: [{
                time: 0,
                y: 0
            }]
        },
    ];
    $('#buttonChart').epoch({
        type: 'time.area',
        data: buttonData
    });
}

ctx = document.getElementById("clientChart");
if (ctx != null) {
    var clientData = [
        {
            label: 'Clients',
            values: [{
                time: 0,
                y: 0
            }]
        },
    ];
    $('#buttonChart').epoch({
        type: 'time.area',
        data: clientData
    });
}