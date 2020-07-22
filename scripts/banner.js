const fs = require("fs-extra");
const pkg = require("../package.json");

exports.getBannerTemplate = function () {
	return `/*!
 * @license ${pkg.name} v${pkg.version}
 * Copyright (c) 2019-2020 zenquan (MIT Licensed)
 * https://github.com/zenquan/zen-tools
 */`;
};

function main() {
	const data = fs.readFileSync("./umd/zen-tools.min.js");
	fs.writeFileSync("./umd/zen-tools.min.js", exports.getBannerTemplate() + "\n" + data);
}

if (require.main === module) {
	main();
}
