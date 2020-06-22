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

var tokens = {};
var tokens_size = 0;
function tokenize(token){
    if(tokens.token === undefined){
        tokens.token = tokens_size;
        tokens_side ++;
    }

    return tokens.token;
}


// Markdown is going to avoid a lot of text, so this is for
// pieces of text that need to be inlined
var inlineText = "";

// INLINE HTML


// LINE BREAKS
lex.addRule(/\s*\n/, function(){
    return tokenize("LINE_BREAK");
});

// HEADERS
lex.addRule(/#+.*\n/, function(lexeme){
    this.yytext = lexeme;
    return tokenize("HEADER");
});

lex.addRule(/[^\s]*\n=+[ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]*\n/, function(lexeme){
    // Make yytext same as above with 2 hashtags
    var just_text = 
        lexeme.substring(0, lexeme.indexOf("\n") + 1);

    this.yytext = "#" + just_text;
    return tokenize("HEADER");
});

lex.addRule(/[^\s]*\n-+[ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]*\n/, function(lexeme){
    var just_text = 
        lexeme.substring(0, lexeme.indexOf("\n") + 1);

    this.yytext = "##" + just_text;
    return tokenize("HEADER");
});

// BLOCK QUOTES
lex.addRule(/(>[^\n]*\n)+/, function(lexeme){
    for(var i = 0; i < lexeme.length; i ++){
        if(lexeme[i] === ">"){
            lexeme[i] = " ";
        }
    }

    this.yytext = lexeme;
    return tokenize("BLOCK_QUOTE");
});

// LISTS
lex.addRule(/(\*\s[^\n]*\n)+/, function(lexeme){
    this.yytext = lexeme;
    return tokenize("LIST");
});

lex.addRule(/(-\s[^\n]*\n)+/, function(lexeme){
    this.yytext = lexeme;
    return tokenize("LIST");
});

// CODE BLOCKs
lex.addRule(/```(``[^`]|`[^`]|[^`])*```\s*\n/, function(lexeme){
    this.yytext = lexeme;
    return tokenize("CODE_BLOCKS");
});

lex.addRule(/`[^`]`/, function(lexeme){
    this.yytext = lexeme;
    return tokenize("CODE_BLOCKS");
});

// HORIZONTAL RULES
lex.addRule(/(\*|\* ){3,}\s*\n/, function(){
    return tokenize("HORIZONTAL_RULE");
});

// TODO - May want to exclude new-lines and character returns in previous line.
lex.addRule(/\s*\n((-|- ){3,}|(=|= ){3,})\s*\n/, function(){
    return tokenize("HORIZONTAL_RULE");
});


// LINKS
// Link: No ID and Title
lex.addRule(/\[[^\]\n]*\]\([^\)\s][ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]+"[^"\n]*"\)/, 
    function(lexeme){
        this.yytext = lexeme;
        return tokenize("LINK_TITLE");
});

// Link: No ID and No Title
lex.addRule(/\[[^\]\n]*\]\([^\)\s][ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]*\)/, 
    function(lexeme){
        this.yytext = lexeme;
        return tokenize("LINK");
});

// Link: ID
lex.addRule(/\[[^\]\n]*\]\[\w+\][ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]*/, function(lexeme){
    this.yytext = lexeme;
    return tokenize("LINK_ID");
});

// ID REF with TITLE
lex.addRule(/\[\w+\]\: [^ ]+ "[^"\n]*"\n/, function(lexeme){
    this.yytext = lexeme;
    return tokenize("ID_TITLE");
});

// ID REF with NO TITLE
lex.addRule(/\[\w+\]\: [^\n]+\n/, function(lexeme){
    this.yytext = lexeme;
    return tokenize("ID");
});


// EMPHASIS
lex.addRule(/(_[^\n_]_)|(\*[^\n*]\*)/, function(lexeme){
    this.yytext = lexeme;
    return tokenize("EMPH")
});

lex.addRule(/(__[^\n_]__)|(\*\*[^\n*]\*\*)/, function(lexeme){
    this.yytext = lexeme;
    return tokenize("STRONG")
});

// BACKSLASH
lex.addRule(/\\./, function(lexeme){
    this.yytext = lexeme;
    return tokenize("BACKSLASH");
});

// IMAGES
// Image: No ID and Title
lex.addRule(/!\[[^\]\n]*\]\([^\)\s][ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]+"[^"\n]*"\)/, 
    function(lexeme){
        this.yytext = lexeme;
        return tokenize("IMAGE_TITLE");
});

// Image: No ID and No Title
lex.addRule(/!\[[^\]\n]*\]\([^\)\s][ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]*\)/, 
    function(lexeme){
        this.yytext = lexeme;
        return tokenize("IMAGE");
});

// Image: ID
lex.addRule(/!\[[^\]\n]*\]\[\w+\][ \t\v\u00a0\u1680\u2000-\u200a\u2029\u202f\u205f\u3000\ufeff]*/, function(lexeme){
    this.yytext = lexeme;
    return tokenize("IMAGE_ID");
});

// AUTOMATIC URIs
//https://urlregex.com/
lex.addRule(/<((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)>/,
    function(lexeme){
        this.yytext = lexeme;
        return tokenize("URI");
});

// CHECKLIST FORMS
lex.addRule(/((\[ \])|(\[\W\]) [^\n]*\n)+/, function(lexeme){
    this.yytext = lexeme;
    return tokenize("CHECKLIST_FORM");
});

// IGNORED LINE
lex.addRule(/[^\s]*\n/, function(){
    return tokenize("IGNORED");
});

// END OF FILE
lex.addRule(/$/, function(){
    return "EOF";
});