# zen-tools

[中文](./README.md) | English

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bplok20010/zen-tools/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/zen-tools)](https://www.npmjs.com/package/zen-tools)
[![npm bundle size](https://img.shields.io/bundlephobia/min/zen-tools)](https://raw.githubusercontent.com/bplok20010/zen-tools/master/umd/zen-tools.min.js)

A JavaScript interpreter written in TypeScript.

> Support JavaScript running environment such as browser, node.js, WeChat Mini Program, etc

[Try it out](https://bplok20010.github.io/zen-tools/)

[Examples](https://bplok20010.github.io/zen-tools/examples.html)

## You may not need it unless

-   Need to execute code in the browser with a sandbox environment
-   Controlling execution time
-   JavaScript runtime environment that does not support `eval` and `Function`. for example: WeChat Mini Program [demo](https://github.com/bplok20010/zen-tools-wx-demo)
-   Be interested or Be curious

## ECMAScript version supported

ES5

## Install

```
npm install --save zen-tools
```

## Usage

```javascript
import { Interpreter } from "zen-tools";

const interpreter = new Interpreter(window, {
	timeout: 1000,
});

let result;

try {
	result = interpreter.evaluate("1+1");
	console.log(result);

	interpreter.evaluate("var a=100");
	interpreter.evaluate("var b=200");
	result = interpreter.evaluate("a+b");

	console.log(result);
} catch (e) {
	console.log(e);
}
```

## Options

```ts
interface Options {
	// default: 0 not limited
	timeout?: number;
	// readonly
	rootContext?: {} | null;
	globalContextInFunction?: any;
}
```

Example

```
import { Interpreter } from "zen-tools";

const ctx = {};
const interpreter = new Interpreter(ctx, {
    rootContext: window,
	timeout: 1000,
});

interpreter.evaluate(`
    a = 100;
    console.log(a); // 100
`);

window.a;//undefined

```

## Interpreter

**`version`**

current version

**`global`**

default: `{}`

global context

```js
Interpreter.global = window;
const interpreter = new Interpreter();
interpreter.evaluate('alert("hello zen-tools")');
```

**`globalContextInFunction`**

default: `undefined`

`zen-tools` does not support `use strict` mode, but the default value of `this` in function calls is `undefined`, you can set this property as the default.

```js
import { Interpreter } from "Interpreter";

const ctx = {};
const interpreter = new Interpreter(ctx);
interpreter.evaluate(`
this; // ctx
function func(){
    return this; // undefined
}
func();
`);
```

```js
import { Interpreter } from "Interpreter";

Interpreter.globalContextInFunction = window;
const ctx = {};
const interpreter = new Interpreter(ctx);
interpreter.evaluate(`
this; // ctx
function func(){
    return this; // window
}
func();
`);
```

Let's take a look at the following example

> **Note: Illegal invocation**
>
> that's why `globalContextInFunction` is set to `undefined`

```
import { Interpreter } from "Interpreter";

Interpreter.globalContextInFunction = {};

const ctx = {alert: alert};

const interpreter = new Interpreter(ctx);

interpreter.evaluate(`
// alert.call({}, 'Hello zen-tools')
// Illegal invocation
alert('Hello zen-tools');
`);
```

**`constructor(context?: {}: options: Options = Interpreter.global)`**

---

## Instance methods

**`evaluate(code: string): any`**

executes string code and returns the value of the last expression

```js
import { Interpreter } from "Interpreter";

const interpreter = new Interpreter(window);

const result = interpreter.evaluate(`
var a = 100;
var b = 200;

a+b;

`);

console.log(result); // 300
```

**`appendCode(code: string): any`**

alias of `evaluate`

**`getExecutionTime(): number`**

get the last execution time

**`setExecTimeout(timeout: number = 0): void`**

set the timeout for each execution

**`getOptions(): Readonly<Options>`**

get interpreter options

## evaluate(code: string, ctx?: {}, options?: Options)

executes string code and returns the value of the last expression

> note: a new interpreter is created with every execution

```js
import { evaluate } from "zen-tools";

evaluate(
	`
var a = 100;
var b = 100;
console.log(a+b);
`,
	{ console: console }
); // 200

evaluate(`
    a;
`); // a is not defined
```

## Function

use `Interpreter.global` as the default context, `Interpreter.globalContextInFunction` also

```js
import { Function } from "zen-tools";

const func = new Function("a", "b", "return a+b;");
console.log(func(100, 200)); // 300
```

## vm

see [vm](https://nodejs.org/dist/latest-v13.x/docs/api/vm.html)

-   vm.createContext
-   vm.compileFunction
-   vm.runInContext
-   vm.runInNewContext
-   vm.Script

## License

MIT

## Related

-   [evaljs](https://github.com/marten-de-vries/evaljs)
-   [closure-interpreter](https://github.com/int3/closure-interpreter)
