/*
 * Tristan Hilbert
 * 6/22/2020
 * HyperMarkdown Bison Parser Generator
 * 
 * Entry Point
 */


const jison = require("jison");
const { tokens } = require("../scanner/scanner");

// Represents all of the possible tokens from the Scanner
//console.log(tokens);


// Rules:
var rules = {};

// Site: All Modules
rules["site"] = [
    ["document", "return $$;"]
]

// Document : Single Module
rules["document"] = [
    ["line document", "$$ = $1 + $2;"], 
    [tokens["EOF"], "$$ = '';"]
]

// Line: General Purpose
rules["line"] = [
    [tokens["LINE_BREAK"], "$$ = '<br/>\\n'"],
    [tokens["HEADER"], "$$ = parser.parse.resHeader($1);"],
    [tokens["BLOCK_QUOTE"], "$$ = $1;"],
    [tokens["LIST"], "$$ = $1;"],
    [tokens["CODE_BLOCK"], "$$ = $1;"],
    [tokens["CODE_BLOCK_LANG"], "$$ = $1;"],
    [tokens["HORIZONTAL_RULE"], "$$ = $1;"],
    [tokens["LINK_TITLE"], "$$ = $1;"],
    [tokens["LINK"], "$$ = $1;"],
    [tokens["LINK_ID"], "$$ = $1;"],
    [tokens["ID_TITLE"], "$$ = $1;"],
    [tokens["ID"], "$$ = $1;"],
    [tokens["EMPH"], "$$ = $1;"],
    [tokens["STRONG"], "$$ = $1;"],
    [tokens["BACKSLASH"], "$$ = $1;"],
    [tokens["IMAGE_TITLE"], "$$ = $1;"],
    [tokens["IMAGE"], "$$ = $1;"],
    [tokens["IMAGE_ID"], "$$ = $1;"],
    [tokens["URI"], "$$ = $1;"],
    [tokens["CHECKLIST_FORM"], "$$ = $1;"],
    [tokens["IGNORED"], "$$ = $1;"],
]


var grammar = {
    "bnf": rules
};

grammar.helper = {};

var parser = new jison.Parser(grammar);

// Resolution Functions

function resHeader(text){
    var firstIndexOfHash = text.indexOf("#");
    var lastIndexOfHash = text.lastIndexOf("#");
    
    var level = lastIndexOfHash - firstIndexOfHash + 1;
    level = level > 6 ? 6 : level;
    var tag = "h" + level;

    text = text.slice(lastIndexOfHash + 1);

    return "<" + tag + ">" + text + "</" + tag + ">\n\n";
}

parser.parse.resHeader = resHeader;


module.exports = parser;