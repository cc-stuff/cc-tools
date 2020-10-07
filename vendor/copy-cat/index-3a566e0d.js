/**
 * copy-cat: Copyright SquidDev 2020
 *
 * - @squid-dev/cc-web-term: Copyright SquidDev (BSD-3-Clause)
 * - buffer-es6: Copyright Feross Aboukhadijeh (MIT)
 * - immediate: Copyright  (MIT)
 * - jszip: Copyright Stuart Knightley ((MIT OR GPL-3.0))
 * - lie: Copyright  (MIT)
 * - pako: Copyright  ((MIT AND Zlib))
 * - preact: Copyright  (MIT)
 * - process-es6: Copyright Roman Shtylman (MIT)
 * - rollup-plugin-node-builtins: Copyright  (ISC)
 * - set-immediate-shim: Copyright Sindre Sorhus (MIT)
 * - setimmediate: Copyright YuzuJS (MIT)
 *
 * @license
 */

define(['exports', 'vs/editor/editor.main'], function (exports, monacoEditor) { 'use strict';

    /*
     * MIT License
     *
     * Copyright (c) 2015 - present Microsoft Corporation
     *
     * All rights reserved.
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    // Adapated from https://github.com/Microsoft/vscode/tree/master/extensions/lua
    // and Monaco's Lua grammar. Mostly a mish-mash of the two in order to get
    // auto-indents.
    const configuration = {
        comments: {
            lineComment: "--",
            blockComment: ["--[[", "]]"],
        },
        brackets: [
            ["{", "}"],
            ["[", "]"],
            ["(", ")"],
        ],
        autoClosingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: "'", close: "'" },
            { open: "\"", close: "\"" },
        ],
        surroundingPairs: [
            { open: "{", close: "}" },
            { open: "[", close: "]" },
            { open: "(", close: ")" },
            { open: "\"", close: "\"" },
            { open: "\"", close: "\"" },
        ],
        indentationRules: {
            increaseIndentPattern: /((\b(else|function|then|do|repeat)\b((?!\b(end|until)\b).)*)|(\{\s*))$/,
            decreaseIndentPattern: /^\s*((\b(elseif|else|end|until)\b)|(\})|(\)))/,
        },
    };
    const tokens = {
        defaultToken: "",
        tokenPostfix: ".lua",
        keywords: [
            "and", "break", "do", "else", "elseif",
            "end", "false", "for", "function", "goto", "if",
            "in", "local", "nil", "not", "or",
            "repeat", "return", "then", "true", "until",
            "while",
        ],
        brackets: [
            { token: "delimiter.bracket", open: "{", close: "}" },
            { token: "delimiter.array", open: "[", close: "]" },
            { token: "delimiter.parenthesis", open: "(", close: ")" },
        ],
        operators: [
            "+", "-", "*", "/", "%", "^", "#", "==", "~=", "<=", ">=", "<", ">", "=",
            ";", ":", ",", ".", "..", "...",
        ],
        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*/^%]+/,
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
        // The main tokenizer for our languages
        tokenizer: {
            root: [
                // identifiers and keywords
                [/[a-zA-Z_]\w*/, {
                        cases: {
                            "@keywords": { token: "keyword.$0" },
                            "@default": "identifier",
                        },
                    }],
                // whitespace
                { include: "@whitespace" },
                // keys
                [/(,)(\s*)([a-zA-Z_]\w*)(\s*)(:)(?!:)/, ["delimiter", "", "key", "", "delimiter"]],
                [/({)(\s*)([a-zA-Z_]\w*)(\s*)(:)(?!:)/, ["@brackets", "", "key", "", "delimiter"]],
                // delimiters and operators
                [/[{}()[\]]/, "@brackets"],
                [/@symbols/, {
                        cases: {
                            "@operators": "delimiter",
                            "@default": "",
                        },
                    }],
                // numbers
                [/\d*\.\d+([eE][-+]?\d+)?/, "number.float"],
                [/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/, "number.hex"],
                [/\d+?/, "number"],
                // delimiter: after number because of .\d floats
                [/[;,.]/, "delimiter"],
                // strings: recover on non-terminated strings
                [/"([^"\\]|\\.)*$/, "string.invalid"],
                [/"([^"\\]|\\.)*$/, "string.invalid"],
                [/'/, "string2", "@string.'"],
                [/"/, "string", "@string.\""],
            ],
            whitespace: [
                [/[ \t\r\n]+/, ""],
                [/--\[([=]*)\[/, "comment", "@comment.$1"],
                [/--.*$/, "comment"],
            ],
            comment: [
                [/[^\]]+/, "comment"],
                [/\]([=]*)\]/, {
                        cases: {
                            "$1==$S2": { token: "comment", next: "@pop" },
                            "@default": "comment",
                        },
                    }],
                [/./, "comment"],
            ],
            string: [
                [/[^\\"']+/, "string"],
                [/@escapes/, "string.escape"],
                [/\\./, "string.escape.invalid"],
                [/["']/, {
                        cases: {
                            "$#==$S2": { token: "string", next: "@pop" },
                            "@default": "string",
                        },
                    }],
            ],
        },
    }; // eslint-disable-line @typescript-eslint/no-explicit-any
    // The TS definition isn't up to date.
    monacoEditor.languages.register({
        id: "luax",
        aliases: ["LuaX", "LuaX", "luax"],
        extensions: [".lua"],
    });
    monacoEditor.languages.setLanguageConfiguration("luax", configuration);
    monacoEditor.languages.setMonarchTokensProvider("luax", tokens);

    Object.keys(monacoEditor).forEach(function (k) {
        if (k !== 'default') Object.defineProperty(exports, k, {
            enumerable: true,
            get: function () {
                return monacoEditor[k];
            }
        });
    });

});
