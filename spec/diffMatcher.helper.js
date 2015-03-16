var difflib = require("difflib");

function toLines(v) {
    return JSON.stringify(v, null, 4).split("\n");
}

var diffMatcher = {
    toBeDiff : function () {
        return {
            compare : function (actual, expected) {
                var check = difflib.unifiedDiff(
                    toLines(expected),
                    toLines(actual),
                    {
                        fromfile : "expected",
                        tofile : "actual",
                        lineterm : "",
                    }
                );
                return {
                    pass : check.slice(3).some(function (a) {
                        return a[0] !== " ";
                    }),
                    message : check.join("\n"),
                };
            }
        };
    }
};

beforeEach(function () {
    jasmine.addMatchers(diffMatcher);
});
