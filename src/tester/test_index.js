/*
 * Tristan Hilbert
 * 6/22/2020
 * Automated Tester that uses the test directory.
 * 
 */

const fs = require("fs");
var { lex } = require("../scanner/scanner");
var parser = require("../parser/parser");

parser.lexer = lex;

var data = fs.readFileSync("tests/page1.md");

console.log(parser.parse(data.toString()));

