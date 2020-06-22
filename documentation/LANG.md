HyperMarkdown Language Spec
===========================

- Tristan Hilbert
- June 17th 2020

# Introduction
The **HyperMarkdown** language specifies a native-front end description. This is typically achieved through a
Document Object Model. However, HTML and XML models use a series of tags to define these structures. This is not
very readable especially when styled incorrectly. It does not futureproof the code. Additionally, some programs do
not allow definitions of tags within the code. Templates, attributes, and constructions become harder to use.


Thus, **HyperMarkdown** aims to help in these endeavors. The code itself remains easy to write with little
memorization outside of the project. It uses abstract terminologies to remain futureproof through the
rapid generation of browsing technologies. This way, code should not have to be repurposed or packaged
to be engineered, extended, or used.

This also coordinates all design, code, and work into a singular language. This will still allow piplines
for stylesheets and scripts, but **HyperMarkdown** simplifies the integration process through its code creation.
In this sense, **HyperMarkdown** remains a language which defines a static output rather than a scripting or imperative
language. It seeks to create a document/poster/website/interface. It hopes to do this in an understandable way.

# Table of Contents
* [Syntax of Markup Text](#Syntax%20of%20Markup%20Text)
* [Module Reference](#Module%20Reference)

* [Stylesheet Scoping](#Stylesheet%20Scoping)

* [Intermediate Representation](#Intermediate%20Representation)

* [Backend Generation](#Backend%20Generation)

* [Parser API](#Parser%20API)

* [Contributing To This Document](#Contributing%20To%20This%20Document)

* [Summary](#Summary)

* [Notes](#Notes)

# Syntax of Markup Text

## Inline Markup
Inline Markup should still be allowed. This means one could write inline HTML, XML, or XAML as needed. Thus pairs of
angle brackets will be ignored in compilation.

### Example
```html
<a>
    <p> Derp Derp </p>
</a>
```

## Line Breaks
A set of 2 new line characters with a series of whitespaces will be considered a newline in the output. Consider
`<br />` in HTML

### Example
```
This message ends ...


... this message begins
```

## Headers
A Series of hashtags or an underlined phrase will be a header in the output. Consider
`<h1></h1>` in HTML. Underlines must consist of at least 3 dashes or equal signs.

### Example
```
### This is a level 3 header

This is a level 1 header
-----

This is a level 2 header
========================
```


## Blockquotes
A line starting with a right anglebracket must be considered part of a blockquote in the output. Consider
`<blockquote></blockquote>` in HTML. Series of lines starting with anglebrackets will be apart of the same
blockquote.

### Example
```
> This is
> Blockquote 1
> Hello

> This is Blockquote 2
```

## Lists
A line starting with a dash or astricks will be considered a part of an unordered list. Consider
`<ul></ul>` in HTML. There were additional pieces for blocking, but those are ignored. New lines between these
lists will be considered seperate lists.

### Example
```
* This is list 1
* I am also in list 1
* Oh it's nice to be in list 1

- I am list 2

* I am list 3

* I am list 4
* but I am also in list 4
```

## Code Blocks
A tilde will be used for code block segments. These can be done inline with a pair of tildes or in a block
with a pair of trios. These will be verbatim put into the output of whatever language. Within outputs like HTML,
these pieces need to have the correct text to be shown correctly. I.E. "&" becomes "&amp" in HTML.

### Example
```
`This is an inline piece of code`

```js
console.log("Hello World");
console.log("Yay!!!);

let it = "go";
```

## Horizontal Rules
Underlines with a leading newline are considered Horizontal Rules. Consider `<hr>` in HTML. This includes the characters, '-', '=', and '*'. However '-' and '=' conflict with Headers.
```
* * *

-------------
```

## Links
Square brackets followed by parenthesis or square brackets will become links or "anchors" in HTML. If followed by
a set of parenthesis, then the header reference and the title may be given. Otherwise with brackets you may
reference the link later on. If the id used to reference a link is not defined then other references with different
casing should be checked.

### Example
```
[This is a link with an inline URL](https://www.urlhere.something/ "This is a title")
[Later Defined Link][id]
[Later Defined Link] [id]
[id]: https://www.urlhere.something/ "This is a title"
```

## Emphasis
Single astricks and underscores will be considered italics or `<emph>` in HTML while pairs of double astricks and underscores
will be considered bold or `<strong>` in HTML.

### Example
```
_this is italicised_

**THIS IS BOLD**
```

## Backslash
Anything backslashed including itself will push the next character straight into the output.

### Example
```
\\
\*
\d
```

## Images
Exclamation marks followed by a pair of brackets will be an image. Consider an `<img>` tag in HTML these
can be reference similarly to the [Links](#Links)

### Example
```
![Alt Text](imageURL "title")
![Alt Text] [id]
[id]: imageURL "title"
```

## Automatic URIs
URI type strings within anglebrackets will be changed to links. Consider `<a>` in HTML.

### Example
```
<scheme://domain/path?query#fragment>
```

## Checklist Forms
Groups of lines starting with pairs of square brackets with or without an "x" character will be considered
an unordered checklist form in the final product. Consider `<input type="checkbox">`

### Example
```
[ ] Item 1
[ ]
[x] Checked Item
```

# Module Reference
TBD

# Stylesheet Scoping
TBD

# Intermediate Representation
TBD

# Backend Generation
TBD

# Parser API
TBD

# Contributing To This Document
TBD

# Summary
TBD

# Notes
TBD