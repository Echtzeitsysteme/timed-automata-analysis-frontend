/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var timedAutomata = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,15],$V1=[1,16],$V2=[1,17],$V3=[1,18],$V4=[1,19],$V5=[1,20],$V6=[1,21],$V7=[5,20,21,22,24,25,26,27],$V8=[1,40],$V9=[20,21,22,24,25,26,27],$Va=[1,42],$Vb=[5,17,20,21,22,24,25,26,27,32],$Vc=[1,55],$Vd=[1,56],$Ve=[1,57],$Vf=[1,58],$Vg=[1,59],$Vh=[1,60],$Vi=[1,61],$Vj=[1,62],$Vk=[17,34],$Vl=[1,96],$Vm=[1,95],$Vn=[1,94],$Vo=[1,89],$Vp=[1,91],$Vq=[1,109],$Vr=[1,101],$Vs=[1,106],$Vt=[1,107],$Vu=[1,108],$Vv=[1,111],$Vw=[1,112],$Vx=[17,34,48],$Vy=[1,116],$Vz=[17,34,51],$VA=[17,34,51,53],$VB=[2,51],$VC=[1,121],$VD=[2,53],$VE=[1,124],$VF=[1,125],$VG=[1,126],$VH=[1,127],$VI=[1,128],$VJ=[1,129],$VK=[17,34,44,51,53,61,63,69,72,73,74,75,77,78,79,80,81,82],$VL=[1,132],$VM=[1,131],$VN=[1,133],$VO=[1,134],$VP=[1,135],$VQ=[17,34,44,49,51,53,61,63,69,72,73,74,75,77,78,79,80,81,82,83,84,85,86],$VR=[17,34,63],$VS=[1,151],$VT=[1,152],$VU=[18,23,49,52],$VV=[2,49];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"file":3,"taSystem":4,"TOK_EOF":5,"systemDef":6,"items":7,"item":8,"processDef":9,"eventDef":10,"clockDef":11,"intDef":12,"locationDef":13,"edgeDef":14,"syncDef":15,"TOK_SYSTEM":16,"TOK_COLON":17,"TOK_ID":18,"attributeList":19,"TOK_PROCESS":20,"TOK_EVENT":21,"TOK_CLOCK":22,"TOK_INTEGER":23,"TOK_INT":24,"TOK_LOCATION":25,"TOK_EDGE":26,"TOK_SYNC":27,"syncConstraints":28,"syncConstraint":29,"TOK_AT":30,"TOK_QMARK":31,"TOK_LBRACE":32,"attributes":33,"TOK_RBRACE":34,"attribute":35,"TOK_INIT":36,"TOK_LABELS":37,"labelsList":38,"TOK_INVAR":39,"constraints":40,"TOK_COMMIT":41,"TOK_URGENT":42,"TOK_PROV":43,"TOK_DO":44,"statements":45,"TOK_LAYOUT":46,"coordinate":47,"TOK_COMMA":48,"TOK_MINUS":49,"constraint":50,"TOK_AND":51,"TOK_LPARENTHESES":52,"TOK_RPARENTHESES":53,"compare_term":54,"TOK_EXMARK":55,"term":56,"cmp":57,"atomic_term":58,"maths":59,"TOK_LBRACKET":60,"TOK_RBRACKET":61,"statement":62,"TOK_SEMICOLON":63,"do_term":64,"TOK_NOP":65,"local_statement":66,"if_statement":67,"while_statement":68,"TOK_SET":69,"TOK_LOCAL":70,"TOK_IF":71,"TOK_THEN":72,"end":73,"TOK_ELSE":74,"TOK_END":75,"TOK_WHILE":76,"TOK_EQ":77,"TOK_LT":78,"TOK_LEQ":79,"TOK_GEQ":80,"TOK_GT":81,"TOK_NEQ":82,"TOK_PLUS":83,"TOK_MUL":84,"TOK_DIV":85,"TOK_PERCENT":86,"$accept":0,"$end":1},
terminals_: {2:"error",5:"TOK_EOF",16:"TOK_SYSTEM",17:"TOK_COLON",18:"TOK_ID",20:"TOK_PROCESS",21:"TOK_EVENT",22:"TOK_CLOCK",23:"TOK_INTEGER",24:"TOK_INT",25:"TOK_LOCATION",26:"TOK_EDGE",27:"TOK_SYNC",30:"TOK_AT",31:"TOK_QMARK",32:"TOK_LBRACE",34:"TOK_RBRACE",36:"TOK_INIT",37:"TOK_LABELS",39:"TOK_INVAR",41:"TOK_COMMIT",42:"TOK_URGENT",43:"TOK_PROV",44:"TOK_DO",46:"TOK_LAYOUT",48:"TOK_COMMA",49:"TOK_MINUS",51:"TOK_AND",52:"TOK_LPARENTHESES",53:"TOK_RPARENTHESES",55:"TOK_EXMARK",60:"TOK_LBRACKET",61:"TOK_RBRACKET",63:"TOK_SEMICOLON",65:"TOK_NOP",69:"TOK_SET",70:"TOK_LOCAL",71:"TOK_IF",72:"TOK_THEN",73:"end",74:"TOK_ELSE",75:"TOK_END",76:"TOK_WHILE",77:"TOK_EQ",78:"TOK_LT",79:"TOK_LEQ",80:"TOK_GEQ",81:"TOK_GT",82:"TOK_NEQ",83:"TOK_PLUS",84:"TOK_MUL",85:"TOK_DIV",86:"TOK_PERCENT"},
productions_: [0,[3,2],[4,2],[7,2],[7,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[6,4],[6,3],[9,4],[9,3],[10,4],[10,3],[11,6],[11,5],[12,12],[12,11],[13,6],[13,5],[14,10],[14,9],[15,4],[15,3],[28,1],[28,3],[29,3],[29,4],[19,3],[19,2],[33,1],[33,3],[35,2],[35,3],[35,3],[35,2],[35,2],[35,3],[35,3],[35,5],[47,1],[47,2],[38,1],[38,3],[40,1],[40,3],[40,5],[50,1],[50,2],[50,1],[54,3],[54,5],[54,3],[56,1],[56,2],[56,3],[56,5],[56,3],[58,1],[58,1],[58,4],[45,1],[45,3],[62,1],[62,1],[62,1],[62,1],[62,1],[64,3],[66,2],[66,5],[66,4],[67,5],[67,7],[68,5],[57,1],[57,1],[57,1],[57,1],[57,1],[57,1],[59,1],[59,1],[59,1],[59,1],[59,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2:
this.$ = {system: $$[$0-1], items: $$[$0]};
break;
case 3:
$$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 4: case 28:
 this.$ = [$$[$0]];
break;
case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 44: case 79: case 80: case 81: case 82: case 83: case 84: case 85: case 86: case 87: case 88: case 89:
this.$ = $$[$0];
break;
case 12: case 14: case 16:
 this.$ = {type: $$[$0-3], name: $$[$0-1], attributes: $$[$0]};
break;
case 13: case 15: case 17:
 this.$ = {type: $$[$0-2], name: $$[$0]};
break;
case 18:
 this.$ = {type: $$[$0-5], amount: $$[$0-3], name: $$[$0-1], attributes: $$[$0]};
break;
case 19:
 this.$ = {type: $$[$0-4], amount: $$[$0-2], name: $$[$0]};
break;
case 20:
 this.$ = {type: $$[$0-11], size: $$[$0-9], min: $$[$0-7], max: $$[$0-5], init: $$[$0-3], name: $$[$0-1], attributes: $$[$0]};
break;
case 21:
 this.$ = {type: $$[$0-10], size: $$[$0-8], min: $$[$0-6], max: $$[$0-4], init: $$[$0-2], name: $$[$0]};
break;
case 22:
 this.$ = { type: $$[$0-5], processName: $$[$0-3], name: $$[$0-1], attributes: $$[$0]};
break;
case 23:
 this.$ = { type: $$[$0-4], processName: $$[$0-2], name: $$[$0]};
break;
case 24:
 this.$ = { type: $$[$0-9], processName: $$[$0-7], source: $$[$0-5], target: $$[$0-3], event: $$[$0-1], attributes: $$[$0]};
break;
case 25:
 this.$ = { type: $$[$0-8], processName: $$[$0-6], source: $$[$0-4], target: $$[$0-2], event: $$[$0]};
break;
case 26:
 this.$ = { type: $$[$0-3], syncConstr: $$[$0-1], attributes: $$[$0]};
break;
case 27:
 this.$ = { type: $$[$0-2], syncConstr: $$[$0]};
break;
case 29: case 35: case 47: case 49: case 66:
$$[$0-2].push($$[$0]); this.$ = $$[$0-2];
break;
case 30:
 this.$ = {process:$$[$0-2], event: $$[$0]};
break;
case 31:
 this.$ = {process:$$[$0-3], event: $$[$0-1], weakSync: $$[$0]};
break;
case 32: case 54:
this.$ = $$[$0-1];
break;
case 33:
 this.$ = [];
break;
case 34: case 46: case 48: case 65:
this.$ = [$$[$0]];
break;
case 36:
this.$ = {initial: $$[$0-1]};
break;
case 37:
this.$ = {labels: $$[$0-2], labelList: $$[$0]};
break;
case 38:
this.$ = {invariant: $$[$0-2], constraint: $$[$0]};
break;
case 39:
this.$ = {committed: $$[$0-1]};
break;
case 40:
this.$ = {urgent: $$[$0-1]};
break;
case 41:
this.$ = {provided: $$[$0-2], constraint: $$[$0]};
break;
case 42:
this.$ = {do: $$[$0-2], maths: $$[$0]};
break;
case 43:
this.$ = {layout: $$[$0-4], x: $$[$0-2], y: $$[$0]};
break;
case 45:
this.$ = $$[$0-1] + $$[$0];
break;
case 50:
$$[$0-3].push($$[$0-1]); this.$ = $$[$0-3];
break;
case 51:
this.$ = {cmpterm: $$[$0]};
break;
case 52:
this.$ = {not: $$[$0-1], cmpterm: $$[$0]};
break;
case 53:
this.$ = {constterm: $$[$0]};
break;
case 55:
this.$ = {lhs: $$[$0-4], comparatorL: $$[$0-3], mhs: $$[$0-2], comparatorR: $$[$0-1], rhs: $$[$0]};
break;
case 56:
this.$ = {lhs: $$[$0-2], comparator: $$[$0-1], rhs: $$[$0]};
break;
case 57:
this.$ = {term: $$[$0]};
break;
case 58:
this.$ = {minus: $$[$0-1], term: $$[$0]};
break;
case 59:
this.$ = {termInParen: $$[$0-1]};
break;
case 60:
this.$ = {termInParenL: $$[$0-3], maths: $$[$0-1], termR: $$[$0]};
break;
case 61:
this.$ = {termL: $$[$0-2], maths: $$[$0-1], termR: $$[$0]};
break;
case 62:
this.$ = {value: $$[$0]};
break;
case 63:
this.$ = {identifier: $$[$0]};
break;
case 64:
this.$ = {identifier: $$[$0-3], insideBrackets: $$[$0-1]};
break;
case 67:
this.$ = {doTerm: $$[$0]};
break;
case 68:
this.$ = {nop: $$[$0]};
break;
case 69:
this.$ = {localStatement: $$[$0]};
break;
case 70:
this.$ = {ifStatement: $$[$0]};
break;
case 71:
this.$ = {whileStatement: $$[$0]};
break;
case 72:
this.$ = {lhs: $$[$0-2], set: $$[$0-1], rhs: $$[$0]};
break;
case 73:
this.$ = {local: $$[$0-1], identifier: $$[$0]};
break;
case 74:
this.$ = {local: $$[$0-4], identifier: $$[$0-3], insideBrackets: $$[$0-1]};
break;
case 75:
this.$ = {local: $$[$0-3], identifier: $$[$0-2], set: $$[$0-1], term: 4};
break;
case 76:
this.$ = {if: $$[$0-4], ifTerm: $$[$0-3], then: $$[$0-2], thenTerm: $$[$0-1], end: $$[$0]};
break;
case 77:
this.$ = {if: $$[$0-6], ifTerm: $$[$0-5], then: $$[$0-4], thenTerm: $$[$0-3], else: $$[$0-2], elseTerm: $$[$0-1], end: $$[$0]};
break;
case 78:
this.$ = {while: $$[$0-4], whileTerm: $$[$0-3], do: $$[$0-2], doTerm: $$[$0-1], end: $$[$0]};
break;
}
},
table: [{3:1,4:2,6:3,16:[1,4]},{1:[3]},{5:[1,5]},{7:6,8:7,9:8,10:9,11:10,12:11,13:12,14:13,15:14,20:$V0,21:$V1,22:$V2,24:$V3,25:$V4,26:$V5,27:$V6},{17:[1,22]},{1:[2,1]},{5:[2,2],8:23,9:8,10:9,11:10,12:11,13:12,14:13,15:14,20:$V0,21:$V1,22:$V2,24:$V3,25:$V4,26:$V5,27:$V6},o($V7,[2,4]),o($V7,[2,5]),o($V7,[2,6]),o($V7,[2,7]),o($V7,[2,8]),o($V7,[2,9]),o($V7,[2,10]),o($V7,[2,11]),{17:[1,24]},{17:[1,25]},{17:[1,26]},{17:[1,27]},{17:[1,28]},{17:[1,29]},{17:[1,30]},{18:[1,31]},o($V7,[2,3]),{18:[1,32]},{18:[1,33]},{23:[1,34]},{23:[1,35]},{18:[1,36]},{18:[1,37]},{18:$V8,28:38,29:39},o($V9,[2,13],{19:41,32:$Va}),o($V7,[2,15],{19:43,32:$Va}),o($V7,[2,17],{19:44,32:$Va}),{17:[1,45]},{17:[1,46]},{17:[1,47]},{17:[1,48]},o($V7,[2,27],{19:49,17:[1,50],32:$Va}),o($Vb,[2,28]),{30:[1,51]},o($V9,[2,12]),{33:52,34:[1,53],35:54,36:$Vc,37:$Vd,39:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,46:$Vj},o($V7,[2,14]),o($V7,[2,16]),{18:[1,63]},{23:[1,64]},{18:[1,65]},{18:[1,66]},o($V7,[2,26]),{18:$V8,29:67},{18:[1,68]},{17:[1,70],34:[1,69]},o($V7,[2,33]),o($Vk,[2,34]),{17:[1,71]},{17:[1,72]},{17:[1,73]},{17:[1,74]},{17:[1,75]},{17:[1,76]},{17:[1,77]},{17:[1,78]},o($V7,[2,19],{19:79,32:$Va}),{17:[1,80]},o($V7,[2,23],{19:81,32:$Va}),{17:[1,82]},o($Vb,[2,29]),o($Vb,[2,30],{31:[1,83]}),o($V7,[2,32]),{35:84,36:$Vc,37:$Vd,39:$Ve,41:$Vf,42:$Vg,43:$Vh,44:$Vi,46:$Vj},o($Vk,[2,36]),{18:[1,86],38:85},{18:$Vl,23:$Vm,40:87,49:$Vn,50:88,52:$Vo,54:90,55:$Vp,56:92,58:93},o($Vk,[2,39]),o($Vk,[2,40]),{18:$Vl,23:$Vm,40:97,49:$Vn,50:88,52:$Vo,54:90,55:$Vp,56:92,58:93},{18:$Vl,23:$Vm,45:98,49:$Vn,52:$Vq,56:105,58:93,62:99,64:100,65:$Vr,66:102,67:103,68:104,70:$Vs,71:$Vt,76:$Vu},{23:$Vv,47:110,49:$Vw},o($V7,[2,18]),{23:[1,113]},o($V7,[2,22]),{18:[1,114]},o($Vb,[2,31]),o($Vk,[2,35]),o($Vk,[2,37],{48:[1,115]}),o($Vx,[2,46]),o($Vk,[2,38],{51:$Vy}),o($Vz,[2,48]),{18:$Vl,23:$Vm,40:117,49:$Vn,50:88,52:$Vo,54:118,55:$Vp,56:119,58:93},o($VA,$VB),{18:$Vl,23:$Vm,49:$Vn,52:$VC,54:120,56:122,58:93},o($VA,$VD,{57:123,77:$VE,78:$VF,79:$VG,80:$VH,81:$VI,82:$VJ}),o($VK,[2,57],{59:130,49:$VL,83:$VM,84:$VN,85:$VO,86:$VP}),{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:136,58:93},o($VQ,[2,62]),o($VQ,[2,63],{60:[1,137]}),o($Vk,[2,41],{51:$Vy}),o($Vk,[2,42],{63:[1,138]}),o($VR,[2,65]),o($VR,[2,67]),o($VR,[2,68]),o($VR,[2,69]),o($VR,[2,70]),o($VR,[2,71]),{69:[1,139]},{18:[1,140]},{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:141,58:93},{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:142,58:93},{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:143,58:93},{48:[1,144]},o($Vx,[2,44]),{23:[1,145]},{17:[1,146]},{17:[1,147]},{18:[1,148]},{18:$Vl,23:$Vm,49:$Vn,50:149,52:$VC,54:90,55:$Vp,56:92,58:93},{51:[1,150]},{51:$VB,53:$VS},{51:$VD,53:$VT,57:123,77:$VE,78:$VF,79:$VG,80:$VH,81:$VI,82:$VJ},o($VA,[2,52]),{18:$Vl,23:$Vm,49:$Vn,52:$VC,54:153,56:154,58:93},{57:123,77:$VE,78:$VF,79:$VG,80:$VH,81:$VI,82:$VJ},{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:155,58:93},o($VU,[2,79]),o($VU,[2,80]),o($VU,[2,81]),o($VU,[2,82]),o($VU,[2,83]),o($VU,[2,84]),{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:156,58:93},o($VU,[2,85]),o($VU,[2,86]),o($VU,[2,87]),o($VU,[2,88]),o($VU,[2,89]),o($VK,[2,58]),{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:157,58:93},{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:105,58:93,62:158,64:100,65:$Vr,66:102,67:103,68:104,70:$Vs,71:$Vt,76:$Vu},{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:159,58:93},o($VR,[2,73],{60:[1,160],69:[1,161]}),{72:[1,162]},{44:[1,163]},{53:$VT},{23:$Vv,47:164,49:$Vw},o($Vx,[2,45]),{23:[1,165]},{18:[1,166]},o($Vx,[2,47]),o($Vz,$VV),{18:$Vl,23:$Vm,49:$Vn,50:167,52:$VC,54:90,55:$Vp,56:92,58:93},o($VA,[2,54]),o($VK,[2,59],{59:168,49:$VL,83:$VM,84:$VN,85:$VO,86:$VP}),{53:$VS},{53:$VT,57:123,77:$VE,78:$VF,79:$VG,80:$VH,81:$VI,82:$VJ},o($VA,[2,56],{57:169,77:$VE,78:$VF,79:$VG,80:$VH,81:$VI,82:$VJ}),o($VK,[2,61]),{61:[1,170]},o($VR,[2,66]),o($VR,[2,72]),{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:171,58:93},{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:172,58:93},{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:173,58:93},{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:174,58:93},o($Vk,[2,43]),{17:[1,175]},o($V7,[2,25],{19:176,32:$Va}),{51:$VV,53:[1,177]},{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:178,58:93},{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:179,58:93},o($VQ,[2,64]),{61:[1,180]},o($VR,[2,75]),{73:[1,181],74:[1,182]},{73:[1,183]},{18:[1,184]},o($V7,[2,24]),o($Vz,[2,50]),o($VK,[2,60]),o($VA,[2,55]),o($VR,[2,74]),o($VR,[2,76]),{18:$Vl,23:$Vm,49:$Vn,52:$Vq,56:185,58:93},o($VR,[2,78]),o($V7,[2,21],{19:186,32:$Va}),{75:[1,187]},o($V7,[2,20]),o($VR,[2,77])],
defaultActions: {5:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-sensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0: /* skip whitespace */ 
break;
case 1: /* skip comments */ 
break;
case 2: return 'TOK_EOL' 
break;
case 3: return 22 
break;
case 4: return 26 
break;
case 5: return 21 
break;
case 6: return 24 
break;
case 7: return 25 
break;
case 8: return 20 
break;
case 9: return 27 
break;
case 10: return 16 
break;
case 11: return 36 
break;
case 12: return 37 
break;
case 13: return 39 
break;
case 14: return 41 
break;
case 15: return 42 
break;
case 16: return 43 
break;
case 17: return 44 
break;
case 18: return 71 
break;
case 19: return 76 
break;
case 20: return 65 
break;
case 21: return 72 
break;
case 22: return 75 
break;
case 23: return 74 
break;
case 24: return 70 
break;
case 25: return 46 
break;
case 26: return 23 
break;
case 27: return 18 
break;
case 28: return 17 
break;
case 29: return 30 
break;
case 30: return 32 
break;
case 31: return 34 
break;
case 32: return 48 
break;
case 33: return 51 
break;
case 34: return 83 
break;
case 35: return 49 
break;
case 36: return 84 
break;
case 37: return 85 
break;
case 38: return 86 
break;
case 39: return 77 
break;
case 40: return 82 
break;
case 41: return 79 
break;
case 42: return 80 
break;
case 43: return 78 
break;
case 44: return 81 
break;
case 45: return 69 
break;
case 46: return 60 
break;
case 47: return 61 
break;
case 48: return 52 
break;
case 49: return 53 
break;
case 50: return 55 
break;
case 51: return 31 
break;
case 52: return 63 
break;
case 53: return 5 
break;
}
},
rules: [/^(?:\s+)/,/^(?:#[^\n]*)/,/^(?:\n)/,/^(?:clock\b)/,/^(?:edge\b)/,/^(?:event\b)/,/^(?:int\b)/,/^(?:location\b)/,/^(?:process\b)/,/^(?:sync\b)/,/^(?:system\b)/,/^(?:initial\b)/,/^(?:labels\b)/,/^(?:invariant\b)/,/^(?:committed\b)/,/^(?:urgent\b)/,/^(?:provided\b)/,/^(?:do\b)/,/^(?:if\b)/,/^(?:while\b)/,/^(?:nop\b)/,/^(?:then\b)/,/^(?:end\b)/,/^(?:else\b)/,/^(?:local\b)/,/^(?:layout\b)/,/^(?:[0-9]+)/,/^(?:[a-zA-Z_]([a-zA-Z0-9_.])*)/,/^(?::)/,/^(?:@)/,/^(?:\{)/,/^(?:\})/,/^(?:,)/,/^(?:&&)/,/^(?:\+)/,/^(?:-)/,/^(?:\*)/,/^(?:\/)/,/^(?:%)/,/^(?:==)/,/^(?:!=)/,/^(?:<=)/,/^(?:>=)/,/^(?:<)/,/^(?:>)/,/^(?:=)/,/^(?:\[)/,/^(?:\])/,/^(?:\()/,/^(?:\))/,/^(?:!)/,/^(?:\?)/,/^(?:;)/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = timedAutomata;
exports.Parser = timedAutomata.Parser;
exports.parse = function () { return timedAutomata.parse.apply(timedAutomata, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}

export default timedAutomata;