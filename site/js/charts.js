var ctx = document.getElementById("clientChart");
if (ctx != null) {
    var clientData = {
        labels: ["lbl1"],
        datasets: [{
            label: "Connected clients",
            backgroundColor: "rgba(84,153,199,0.6)",
            lineTension: 0.2,
            data: [{
                x: 0,
                y: 0
            }]
        }]
    };

    var clientChart = new Chart(ctx, {
        type: 'line',
        data: clientData,
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
            }]
            }
        }
    });
}

ctx = document.getElementById("buttonChart");
if (ctx != null) {
    var buttonData = {
        labels: ["lbl1"],
        datasets: [{
            label: "Button",
            backgroundColor: "rgba(236,112,99,0.7)",
            lineTension: 0.2,
            data: [{
                x: 0,
                y: 0
            }]
        }]
    };
    var buttonChart = new Chart(ctx, {
        type: 'line',
        data: buttonData,
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
            }]
            }
        }
    });
}