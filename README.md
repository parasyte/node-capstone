# node-capstone

`node-capstone` provides Node.js bindings for the
[Capstone](https://github.com/aquynh/capstone) disassembler library, allowing
binary data in `Buffer` objects to be disassembled using any of Capstone's
supported architectures.

### Dependencies

* [node.js v0.10.x](https://nodejs.org/)
    * [npm](https://www.npmjs.org/)
* [capstone](http://www.capstone-engine.org/download.html)

Additionally, the Capstone library version needs to match the binding's version
or it will throw an exception.

### Install

`npm install capstone`

### Basic usage

```javascript
var capstone = require("capstone");

var code = new Buffer([
    0x55, 0x48, 0x8b, 0x05, 0xb8, 0x13, 0x00, 0x00
]);

var cs = new capstone.Cs(capstone.ARCH_X86, capstone.MODE_64);

cs.detail = true;
cs.disasm(code, 0x1000).forEach(function (insn) {
    console.log(
        "0x%s:\t%s\t%s\t%s",
        insn.address.toString(16), insn.mnemonic, insn.op_str,
        JSON.stringify(insn.detail)
    );
});

cs.close();
```

For other examples, see the tests in the `spec` directory.

Full documentation is available at https://parasyte.github.io/node-capstone-docs

### License

The source code is hereby released under the MIT License. The full text of the
license appears below.

Copyright (c) 2014 Jay Oster

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
