---
layout: post
title: "// syntaxhighliter.jsx basic script for code displaying"
date: 2012-01-29T13:33:00+01:00
tags:
- code
tumblr_url: http://fabiantheblind.tumblr.com/post/16692594226/syntaxhighliter-jsx-basic-script-for-code-displaying
---
// syntaxhighliter.jsx
    // builds a par style withe nested char styles for syntaxhighliting
    // Copyright (C) 2012 Fabian “fabiantheblind” Morón Zirfas
    // http://www.the-moron.net
    // http://fabiantheblind.info/
    // info [at] the - moron . net

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see http://www.gnu.org/licenses/
var d = app.documents.add();

var par = build_code_paragraphStyle(d);

// this function could be optimized by writing less and using a loop
// right now i keep it that way
// based on 
function build_code_paragraphStyle(d){
var charStyles = new Array();
var keywords = d.characterStyles.add({name:"keywords",fillColor:d.swatches.item(5)});
var comments = d.characterStyles.add({name:"comments",fillColor:d.swatches.item(6)});
var operators = d.characterStyles.add({name:"operators",fillColor:d.swatches.item(7)});
var separators = d.characterStyles.add({name:"separators",fillColor:d.swatches.item(8)});
var numbers = d.characterStyles.add({name:"numbers",fillColor:d.swatches.item(9)});
var comment = d.characterStyles.add({name:"comment",fillColor:d.swatches.item(9)});
var string = d.characterStyles.add({name:"strings",fillColor:d.swatches.item(5)});


var code = d.paragraphStyles.add({name:"code",appliedFont:"DejaVu Sans Mono Book"});
//change language (only in the paragraphStyle) to get the right "" for the code
    code.appliedLanguage = app.languagesWithVendors.item("English: USA")
var grp = code.nestedGrepStyles.add();
    grp.appliedCharacterStyle = keywords;
    grp.grepExpression = "abstract|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var|void|volatile|while|with";

    grp = code.nestedGrepStyles.add();
    grp.appliedCharacterStyle = operators;
    grp.grepExpression = "is|new|sizeof|typeof";

    grp = code.nestedGrepStyles.add();
    grp.appliedCharacterStyle = operators;
    grp.grepExpression = "[-~\\[\\]!$%&*+/:<=>?^|]+";

    grp = code.nestedGrepStyles.add();
    grp.appliedCharacterStyle = separators;
    grp.grepExpression = "[(){},;\\s]+";

    grp = code.nestedGrepStyles.add();
    grp.appliedCharacterStyle = numbers;
    grp.grepExpression = "\\<[0-9]+(\\.[0-9]+)?([eE][-+]?[0-9]+)?";

    grp = code.nestedGrepStyles.add();
    grp.appliedCharacterStyle = comments;
    grp.grepExpression = "/\\*+[^*]*\\*+([^/*][^*]*\\*+)*/";        


    grp = code.nestedGrepStyles.add();
    grp.appliedCharacterStyle = comment;
    grp.grepExpression = "//.*";        

    grp = code.nestedGrepStyles.add();
    grp.appliedCharacterStyle = string;
    grp.grepExpression = "\".*?\"";           

return code;        
    }
