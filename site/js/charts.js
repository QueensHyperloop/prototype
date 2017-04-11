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
var ctx = document.getElementById("clientChart");
if (ctx != null) {
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

ctx = document.getElementById("accelChart");
if (ctx != null) {
    var accelData = {
        labels: ["Acceleration"],
        datasets: [{
            label: "accel",
            backgroundColor: "rgba(236,112,99,0.7)",
            lineTension: 0.2,
            data: [{
                x: 0,
                y: 0
            }]
        }]
    };
    var accelChart = new Chart(ctx, {
        type: 'line',
        data: accelData,
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
