"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts = __importStar(require("typescript"));
const nosense_1 = require("./nosense");
function handle(inputBuffer) {
    var _a, _b;
    const sourceFile = ts.createSourceFile('foo.ts', inputBuffer, ts.ScriptTarget.ES5, true);
    const comments = [];
    const ret = [];
    nosense_1.walkCompilerAstAndFindComments(sourceFile, '', comments);
    for (const { compilerNode } of comments) {
        const base = {
            typeName: undefined,
            name: undefined,
            comment: undefined,
        };
        // console.log(compilerNode);
        switch (compilerNode.kind) {
            case ts.SyntaxKind.PropertySignature: {
                const f = compilerNode;
                base.name = f.name.getText();
                base.typeName = (_a = f.type) === null || _a === void 0 ? void 0 : _a.getFullText();
                break;
            }
            case ts.SyntaxKind.MethodSignature: {
                const f = compilerNode;
                // console.log(f.getFullText());
                const params = [];
                for (const pp of f.parameters) {
                    if (pp.type === undefined)
                        continue;
                    params.push(pp.type.getText());
                }
                base.typeName = `(${params.join(',')}) => ${(_b = f.type) === null || _b === void 0 ? void 0 : _b.getText()}`;
                base.name = f.name.getText();
                break;
            }
        }
        const bstr = compilerNode.getSourceFile().getFullText();
        const locate = nosense_1.getJSDocCommentRanges(compilerNode, bstr)[0];
        const cm = bstr.substring(locate.pos, locate.end);
        base.comment = nosense_1.parseComment(cm);
        ret.push(base);
    }
    return ret;
}
exports.handle = handle;
