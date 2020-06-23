/*
 * Tristan Hilbert
 * Scanner Entry File
 * 
 */

const Lexer = require("lex");

var lex = new Lexer;

/*
 * token :: String
 * Adds string to an enumeration. Consider tokens
 * the object representing all possible tokens. It
 * then defines each string to a number.
 * 
 */


/* 
 * TODO
 * CARRIAGE RETURNS MUST BE HANDLED FOR CRLF
 * Every line must end in NewLine or ENDOFFILE
 * 
 */



var tokens = {};
var tokens_size = 0;

// Keep a running list of used tokens
function tokenize(token){
    if(tokens[token] === undefined){
        tokens[token] = token
    }

    return tokens[token];
}

// INLINE HTML
// Should be ignored by default

// LINE BREAKS
tokenize("LINE_BREAK");
lex.addRule(/\s*\n/, function(){
    console.log("LINE_BREAK");
    return tokens["LINE_BREAK"]
});

// HEADERS
tokenize("HEADER");
lex.addRule(/#+.*\n/, function(lexeme){
    console.log("HEADER");
    this.yytext = lexeme;
    return tokens["HEADER"];
});

lex.addRule(/[^\s]*\n=+[ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]*\n/, function(lexeme){
    console.log("HEADER");
    // Make yytext same as above with 2 hashtags
    var just_text = 
        lexeme.substring(0, lexeme.indexOf("\n") + 1);

    this.yytext = "#" + just_text;
    return tokens["HEADER"];
});

lex.addRule(/[^\s]*\n-+[ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]*\n/, function(lexeme){
    console.log("HEADER");
    var just_text = 
        lexeme.substring(0, lexeme.indexOf("\n") + 1);

    this.yytext = "##" + just_text;
    return tokens["HEADER"];
});

// BLOCK QUOTES
tokenize("BLOCK_QUOTE");
lex.addRule(/(>[^\n]*\n)+/, function(lexeme){
    console.log("BLOCK_QUOTE");
    for(var i = 0; i < lexeme.length; i ++){
        if(lexeme[i] === ">"){
            lexeme[i] = " ";
        }
    }

    this.yytext = lexeme;
    return tokens["BLOCK_QUOTE"];
});

// LISTS
tokenize("LIST");
lex.addRule(/(\*\s[^\n]*\n)+/, function(lexeme){
    console.log("LIST");
    this.yytext = lexeme;
    return tokens["LIST"];
});

lex.addRule(/(-\s[^\n]*\n)+/, function(lexeme){
    console.log("LIST");
    this.yytext = lexeme;
    return tokens["LIST"];
});

lex.addRule(/-\s[^\n]*\n/, function(lexeme){
    console.log("HERE");
    this.yytext = lexeme;
    return tokens["LIST"];
});

// CODE BLOCKs
tokenize("CODE_BLOCKS");
lex.addRule(/```(``[^`]|`[^`]|[^`])*```\s*\n/, function(lexeme){
    console.log("CODE_BLOCKS");
    this.yytext = lexeme;
    return tokens["CODE_BLOCKS"];
});

lex.addRule(/`[^`]`/, function(lexeme){
    console.log("CODE_BLOCKS");
    this.yytext = lexeme;
    return tokens["CODE_BLOCKS"];
});

// HORIZONTAL RULES
tokenize("HORIZONTAL_RULE");
lex.addRule(/(\*|\* ){3,}\s*\n/, function(){
    console.log("HORIZONTAL_RULE");
    return tokens["HORIZONTAL_RULE"];
});

// TODO - May want to exclude new-lines and character returns in previous line.
lex.addRule(/\s*\n((-|- ){3,}|(=|= ){3,})\s*\n/, function(){
    console.log("HORIZONTAL_RULE");
    return tokens["HORIZONTAL_RULE"];
});


// LINKS
// Link: No ID and Title
tokenize("LINK_TITLE");
lex.addRule(/\[[^\]\n]*\]\([^\)\s][ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]+"[^"\n]*"\)/, 
    function(lexeme){
        console.log("LINK_TITLE");
        this.yytext = lexeme;
        return tokens["LINK_TITLE"];
});

// Link: No ID and No Title
tokenize("LINK");
lex.addRule(/\[[^\]\n]*\]\([^\)\s][ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]*\)/, 
    function(lexeme){
        console.log("LINK");
        this.yytext = lexeme;
        return tokens["LINK"];
});

// Link: ID
tokenize("LINK_ID");
lex.addRule(/\[[^\]\n]*\]\[\w+\][ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]*/, function(lexeme){
    console.log("LINK_ID");
    this.yytext = lexeme;
    return tokens["LINK_ID"];
});

// ID REF with TITLE
tokenize("ID_TITLE");
lex.addRule(/\[\w+\]\: [^ ]+ "[^"\n]*"\n/, function(lexeme){
    console.log("ID_TITLE");
    this.yytext = lexeme;
    return tokens["ID_TITLE"];
});

// ID REF with NO TITLE
tokenize("ID");
lex.addRule(/\[\w+\]\: [^\n]+\n/, function(lexeme){
    console.log("ID");
    this.yytext = lexeme;
    return tokens["ID"];
});


// EMPHASIS
tokenize("EMPH");
lex.addRule(/(_[^\n_]_)|(\*[^\n*]\*)/, function(lexeme){
    console.log("EMPH");
    this.yytext = lexeme;
    return tokens["EMPH"];
});

tokenize("STRONG");
lex.addRule(/(__[^\n_]__)|(\*\*[^\n*]\*\*)/, function(lexeme){
    console.log("STRONG");
    this.yytext = lexeme;
    return tokens["STRONG"];
});

// BACKSLASH
tokenize("BACKSLASH");
lex.addRule(/\\./, function(lexeme){
    console.log("BACKSLASH");
    this.yytext = lexeme;
    return tokens["BACKSLASH"];
});

// IMAGES
// Image: No ID and Title
tokenize("IMAGE_TITLE");
lex.addRule(/!\[[^\]\n]*\]\([^\)\s][ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]+"[^"\n]*"\)/, 
    function(lexeme){
        console.log("IMAGE_TITLE");
        this.yytext = lexeme;
        return tokens["IMAGE_TITLE"];
});

// Image: No ID and No Title
tokenize("IMAGE");
lex.addRule(/!\[[^\]\n]*\]\([^\)\s][ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]*\)/, 
    function(lexeme){
        console.log("IMAGE");
        this.yytext = lexeme;
        return tokens["IMAGE"];
});

// Image: ID
tokenize("IMAGE_ID");
lex.addRule(/!\[[^\]\n]*\]\[\w+\][ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]*/, function(lexeme){
    console.log("IMAGE_ID");
    this.yytext = lexeme;
    return tokens["IMAGE_ID"];
});

// AUTOMATIC URIs
//https://urlregex.com/
tokenize("URI");
lex.addRule(/<((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)>/,
    function(lexeme){
        console.log("URI");
        this.yytext = lexeme;
        return tokens["URI"];
});

// CHECKLIST FORMS
tokenize("CHECKLIST_FORM");
lex.addRule(/((\[ \])|(\[\W\]) [^\n]*\n)+/, function(lexeme){
    console.log("CHECKLIST_FORM");
    this.yytext = lexeme;
    return tokens["CHECKLIST_FORM"];
});

// IGNORED LINE
// TODO ... Should be non-whitespaced line in my opinion due to LINE_BREAK
tokenize("IGNORED");
lex.addRule(/.*\n/, function(lexeme){
    console.log("IGNORED");
    this.yytext = lexeme;
    return tokens["IGNORED"];
});

// END OF FILE
tokenize("EOF");
lex.addRule(/$/, function(){
    console.log("EOF\n--\n\n");
    return tokens["EOF"];
});


module.exports = {
    lex,
    tokens
}