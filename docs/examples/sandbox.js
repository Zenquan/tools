version.innerHTML = "version: " + zen-tools.Interpreter.version;
var interpreter = new zen-tools.Interpreter({
	hello: function() {
		return "hello zen-tools";
	},
});
function run() {
	try {
		var result = interpreter.evaluate(code.value);
		results.innerHTML = result;
		console.log(result);
	} catch (e) {
		console.log(e);
		results.innerHTML = '<div class="error">' + e.message + "</div>";
	}
	runBtn.disabled = false;
}

function startRun() {
	runBtn.disabled = true;
	results.innerHTML = "parsing...";
	setTimeout(run, 10);
}
main();
function main() {
	code.value = `
// eval without window
// console is not defined
// console.log('hello zen-tools');
hello();`;

	startRun();
}
