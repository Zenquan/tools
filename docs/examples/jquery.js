var libUrl = "https://cdn.jsdelivr.net/npm/jquery@latest";
version.innerHTML = "version: " + zen-tools.Interpreter.version;
var interpreter = new zen-tools.Interpreter(window);
var _init = false;
function run() {
	try {
		!_init && interpreter.evaluate(lib.value);
		_init = true;

		var result = interpreter.evaluate(code.value);
		results.innerHTML = "complete";
		console.log(result);
	} catch (e) {
		console.log(e);
		results.innerHTML = '<div class="error">' + e.message + "</div>";
	}
}

function startRun() {
	results.innerHTML = "parsing...";
	setTimeout(run, 10);
}
main();
function main() {
	results.innerHTML = "loading...";
	runBtn.disabled = true;

	fetch(libUrl)
		.then(res => res.text())
		.then(s => {
			runBtn.disabled = false;

			lib.value = s;
			code.value = `
$('#example')
    .css({
        height: 50,
        padding: 10,
        border: '1px solid blue'
    })
    .html('<h3>Hello zen-tools</h3>')
            `;

			startRun();
		});
}
