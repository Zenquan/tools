version.innerHTML = "zen-tools: " + zen-tools.Interpreter.version;
var interpreter = new zen-tools.Interpreter(window);
function run() {
	var source = code.value;

	try {
		var result = interpreter.evaluate(source);
		results.innerHTML = result;
		console.log(result);
	} catch (e) {
		console.log(e);
		results.innerHTML = `<div class="error">${e.message}</div>`;
	}
}
run();
