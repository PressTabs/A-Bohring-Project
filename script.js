let current_interval_id = 0;

function newBohrModel( ) {
    let num_electrons = parseInt(document.getElementById("bohr_box").value);
    clearInterval(current_interval_id);
    current_interval_id = renderBohrModel(num_electrons);

}

function renderRings (n) {
    const canvas = document.getElementById("bohr_model");
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.arc(canvas.getAttribute("width") / 2, canvas.getAttribute("height") / 2,
        n * 50, 0,2*Math.PI);
    ctx.stroke();

    ctx.font = "20px Calibri"
    ctx.fillText("n = " + n, canvas.getAttribute("width") / 2 - 20, 150 + n * 50 - 10)

}

function renderCenter( ) {
    const canvas = document.getElementById("bohr_model");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";

    ctx.beginPath();
    ctx.arc(canvas.getAttribute("width") / 2, canvas.getAttribute("height") / 2,
        10, 0,2*Math.PI);
    ctx.fill();
    ctx.stroke();

}

function renderCanvas ( ) {
    current_interval_id = renderBohrModel(18);
    /*
    let i = 0;
    setInterval(function () {
        i += 0.75;

        const ctx = document.getElementById("bohr_model").getContext("2d");

        ctx.clearRect(0, 0, 320, 320);

        renderCenter();
        renderRings(1);
        renderRings(2);
        renderRings(3);

        for (let j = 0; j < 2; j++) {
            renderElectron(i + j * 180, 50);
        }
        for (let j = 0; j < 8; j++) {
            renderElectron(i/2 + j * 45, 100);
            renderElectron(i/3 + j * 45, 150);
        }
    }, 10)

     */
}

function renderElectron(angle, radius) {
    const canvas = document.getElementById("bohr_model");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "blue";

    angle = angle / 180 * Math.PI

    ctx.beginPath();
    ctx.arc(radius * Math.cos(angle) + 160, radius * Math.sin(angle) + 160,
        2, 0,2*Math.PI);
    ctx.fill();
    //ctx.stroke();
}

function wipeCanvas( ) {
    const ctx = document.getElementById("bohr_model").getContext("2d");

    ctx.clearRect(0, 0, 320, 320);
}

function renderBohrModel(number_of_electrons) {
    if (number_of_electrons > 18) {
        throw Error("too many electrons");
    }

    let num_electrons_per_shell = [0, 0, 0]

    if (number_of_electrons > 2) {
        num_electrons_per_shell[0] = 2;
        number_of_electrons -= 2;
    }

    else {
        num_electrons_per_shell[0] = number_of_electrons;
        number_of_electrons = 0;
    }

    for (let i = 0; i < 2; i++) {
        if (number_of_electrons > 8) {
            num_electrons_per_shell[i + 1] = 8;
            number_of_electrons -= 8;
        }

        else {
            num_electrons_per_shell[i + 1] = number_of_electrons;
            number_of_electrons = 0;
        }
    }

    console.log(num_electrons_per_shell)

    let angle = 0;

    return setInterval(function () {

        angle += 0.75;

        wipeCanvas();
        renderCenter();
        renderRings(1);
        renderRings(2);
        renderRings(3);

        for (let n = 1; n < 4; n++) {
            let sub_angle = angle / n;
            let spacing_angle = 0;

            if (num_electrons_per_shell[n - 1] !== 0) {
                spacing_angle = 360 / num_electrons_per_shell[n - 1]
            }

            for (let e = 0; e < num_electrons_per_shell[n - 1]; e++) {
                renderElectron(sub_angle + spacing_angle * e, n * 50)
            }
        }

        /*
        for (let j = 0; j < 2; j++) {
            renderElectron(i + j * 180, 50);
        }
        for (let j = 0; j < 8; j++) {
            renderElectron(i/2 + j * 45, 100);
            renderElectron(i/3 + j * 45, 150);
        }
    }, 10)

         */


    }, 10);

}

