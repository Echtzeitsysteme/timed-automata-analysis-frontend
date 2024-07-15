import { JisonParser, JisonParserApi, StateType, SymbolsType, TerminalsType, ProductionsType } from '@ts-jison/parser';
/**
 * parser generated by  @ts-jison/parser-generator 0.4.1-alpha.2
 * @returns Parser implementing JisonParserApi and a Lexer implementing JisonLexerApi.
 */
export class TsTckParser extends JisonParser implements JisonParserApi {
    $?: any;
    symbols_: SymbolsType = {"error":2,"file":3,"taSystem":4,"TOK_EOF":5,"systemDef":6,"items":7,"item":8,"processDef":9,"eventDef":10,"clockDef":11,"intDef":12,"locationDef":13,"edgeDef":14,"syncDef":15,"TOK_SYSTEM":16,"TOK_COLON":17,"TOK_ID":18,"attributeList":19,"TOK_PROCESS":20,"TOK_EVENT":21,"TOK_CLOCK":22,"TOK_INTEGER":23,"TOK_INT":24,"TOK_LOCATION":25,"TOK_EDGE":26,"TOK_SYNC":27,"syncConstraints":28,"syncConstraint":29,"syncConstraint1":30,"syncConstraints1":31,"TOK_AT":32,"TOK_QMARK":33,"TOK_LBRACE":34,"attributes":35,"TOK_RBRACE":36,"attribute":37,"TOK_INIT":38,"TOK_LABELS":39,"labelsList":40,"TOK_INVAR":41,"constraints":42,"TOK_COMMIT":43,"TOK_URGENT":44,"TOK_PROV":45,"TOK_DO":46,"doSomething":47,"TOK_COMMA":48,"constraint":49,"TOK_AND":50,"cmp":51,"formula":52,"maths":53,"TOK_SET":54,"TOK_SEMICOLON":55,"TOK_EQ":56,"TOK_LT":57,"TOK_LEQ":58,"TOK_GEQ":59,"TOK_GT":60,"TOK_NEQ":61,"TOK_PLUS":62,"TOK_MINUS":63,"TOK_MUL":64,"TOK_DIV":65,"TOK_PERCENT":66,"$accept":0,"$end":1};
    terminals_: TerminalsType = {2:"error",5:"TOK_EOF",16:"TOK_SYSTEM",17:"TOK_COLON",18:"TOK_ID",20:"TOK_PROCESS",21:"TOK_EVENT",22:"TOK_CLOCK",23:"TOK_INTEGER",24:"TOK_INT",25:"TOK_LOCATION",26:"TOK_EDGE",27:"TOK_SYNC",30:"syncConstraint1",32:"TOK_AT",33:"TOK_QMARK",34:"TOK_LBRACE",36:"TOK_RBRACE",38:"TOK_INIT",39:"TOK_LABELS",41:"TOK_INVAR",43:"TOK_COMMIT",44:"TOK_URGENT",45:"TOK_PROV",46:"TOK_DO",48:"TOK_COMMA",50:"TOK_AND",54:"TOK_SET",55:"TOK_SEMICOLON",56:"TOK_EQ",57:"TOK_LT",58:"TOK_LEQ",59:"TOK_GEQ",60:"TOK_GT",61:"TOK_NEQ",62:"TOK_PLUS",63:"TOK_MINUS",64:"TOK_MUL",65:"TOK_DIV",66:"TOK_PERCENT"};
    productions_: ProductionsType = [0,[3,2],[4,2],[7,1],[7,2],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[8,1],[6,4],[6,3],[9,4],[9,3],[10,4],[10,3],[11,6],[11,5],[12,12],[12,11],[13,6],[13,5],[14,10],[14,9],[15,4],[15,3],[28,3],[31,1],[31,3],[29,3],[29,4],[19,3],[19,2],[35,1],[35,3],[37,2],[37,3],[37,3],[37,2],[37,2],[37,3],[37,3],[40,1],[40,3],[42,1],[42,3],[49,3],[49,5],[52,1],[52,3],[47,3],[47,5],[51,1],[51,1],[51,1],[51,1],[51,1],[51,1],[53,1],[53,1],[53,1],[53,1],[53,1]];
    table: Array<StateType>;
    defaultActions: {[key:number]: any} = {5:[2,1],6:[2,2],23:[2,4],69:[2,31],84:[2,32],85:[2,36],109:[2,60],110:[2,61],111:[2,62],112:[2,63],113:[2,64]};

    constructor (yy = {}, lexer = new TsTckLexer(yy)) {
      super(yy, lexer);

      // shorten static method to just `o` for terse STATE_TABLE
      const $V0=[1,15],$V1=[1,16],$V2=[1,17],$V3=[1,18],$V4=[1,19],$V5=[1,20],$V6=[1,21],$V7=[5,20,21,22,24,25,26,27],$V8=[20,21,22,24,25,26,27],$V9=[1,43],$Va=[1,57],$Vb=[1,58],$Vc=[1,59],$Vd=[1,60],$Ve=[1,61],$Vf=[1,62],$Vg=[1,63],$Vh=[17,36],$Vi=[1,87],$Vj=[1,90],$Vk=[1,92],$Vl=[1,95],$Vm=[1,101],$Vn=[1,102],$Vo=[1,103],$Vp=[1,104],$Vq=[1,105],$Vr=[1,106],$Vs=[17,36,50,56,57,58,59,60,61],$Vt=[18,23],$Vu=[17,36,50];
      const o = JisonParser.expandParseTable;
      this.table = [{3:1,4:2,6:3,16:[1,4]},{1:[3]},{5:[1,5]},{7:6,8:7,9:8,10:9,11:10,12:11,13:12,14:13,15:14,20:$V0,21:$V1,22:$V2,24:$V3,25:$V4,26:$V5,27:$V6},{17:[1,22]},{1:[2,1]},{5:[2,2]},{5:[2,3],7:23,8:7,9:8,10:9,11:10,12:11,13:12,14:13,15:14,20:$V0,21:$V1,22:$V2,24:$V3,25:$V4,26:$V5,27:$V6},o($V7,[2,5]),o($V7,[2,6]),o($V7,[2,7]),o($V7,[2,8]),o($V7,[2,9]),o($V7,[2,10]),o($V7,[2,11]),{17:[1,24]},{17:[1,25]},{17:[1,26]},{17:[1,27]},{17:[1,28]},{17:[1,29]},{17:[1,30]},{18:[1,31]},{5:[2,4]},{18:[1,32]},{18:[1,33]},{23:[1,34]},{23:[1,35]},{18:[1,36]},{18:[1,37]},{18:[1,40],20:[1,41],28:38,29:39},o($V8,[2,13],{19:42,34:$V9}),o($V7,[2,15],{19:44,34:$V9}),o($V7,[2,17],{19:45,34:$V9}),{17:[1,46]},{17:[1,47]},{17:[1,48]},{17:[1,49]},o($V7,[2,27],{19:50,34:$V9}),{17:[1,51]},{32:[1,52]},{32:[1,53]},o($V8,[2,12]),{35:54,36:[1,55],37:56,38:$Va,39:$Vb,41:$Vc,43:$Vd,44:$Ve,45:$Vf,46:$Vg},o($V7,[2,14]),o($V7,[2,16]),{18:[1,64]},{23:[1,65]},{18:[1,66]},{18:[1,67]},o($V7,[2,26]),{30:[1,68]},{18:[1,69]},{18:[1,70]},{36:[1,71]},o($V7,[2,34]),{17:[1,72],36:[2,35]},{17:[1,73]},{17:[1,74]},{17:[1,75]},{17:[1,76]},{17:[1,77]},{17:[1,78]},{17:[1,79]},o($V7,[2,19],{19:80,34:$V9}),{17:[1,81]},o($V7,[2,23],{19:82,34:$V9}),{17:[1,83]},o([5,20,21,22,24,25,26,27,34],[2,28]),{17:[2,31]},{33:[1,84]},o($V7,[2,33]),{35:85,37:56,38:$Va,39:$Vb,41:$Vc,43:$Vd,44:$Ve,45:$Vf,46:$Vg},o($Vh,[2,37]),{18:$Vi,40:86},{18:$Vj,23:$Vk,42:88,49:89,52:91},o($Vh,[2,40]),o($Vh,[2,41]),{18:$Vj,23:$Vk,42:93,49:89,52:91},{18:$Vl,47:94},o($V7,[2,18]),{23:[1,96]},o($V7,[2,22]),{18:[1,97]},{17:[2,32]},{36:[2,36]},o($Vh,[2,38]),o($Vh,[2,44],{48:[1,98]}),o($Vh,[2,39]),o($Vh,[2,46],{50:[1,99]}),{51:100,56:$Vm,57:$Vn,58:$Vo,59:$Vp,60:$Vq,61:$Vr},{51:107,56:$Vm,57:$Vn,58:$Vo,59:$Vp,60:$Vq,61:$Vr},o($Vs,[2,50],{53:108,62:[1,109],63:[1,110],64:[1,111],65:[1,112],66:[1,113]}),o($Vh,[2,42]),o($Vh,[2,43]),{54:[1,114]},{17:[1,115]},{17:[1,116]},{18:$Vi,40:117},{18:$Vj,23:$Vk,42:118,49:89,52:91},{23:$Vk,52:119},o($Vt,[2,54]),o($Vt,[2,55]),o($Vt,[2,56]),o($Vt,[2,57]),o($Vt,[2,58]),o($Vt,[2,59]),{18:[1,120]},{23:$Vk,52:121},{23:[2,60]},{23:[2,61]},{23:[2,62]},{23:[2,63]},{23:[2,64]},{23:[1,122]},{23:[1,123]},{18:[1,124]},o($Vh,[2,45]),o($Vh,[2,47]),o($Vu,[2,48]),{51:125,56:$Vm,57:$Vn,58:$Vo,59:$Vp,60:$Vq,61:$Vr},o($Vs,[2,51]),o($Vh,[2,52],{55:[1,126]}),{17:[1,127]},o($V7,[2,25],{19:128,34:$V9}),{23:$Vk,52:129},{18:$Vl,47:130},{18:[1,131]},o($V7,[2,24]),o($Vu,[2,49]),o($Vh,[2,53]),o($V7,[2,21],{19:132,34:$V9}),o($V7,[2,20])];
    }

    performAction (yytext:string, yyleng:number, yylineno:number, yy:any, yystate:number /* action[1] */, $$:any /* vstack */, _$:any /* lstack */): any {
/* this == yyval */
          var $0 = $$.length - 1;
        switch (yystate) {
case 1:
return $$[$0-1];
break;
case 2: case 4:
this.$ = {$$[$0-1], $$[$0]};
break;
case 3: case 5: case 6: case 7: case 8: case 9: case 10: case 11: case 35: case 44: case 46: case 50: case 54: case 55: case 56: case 57: case 58: case 59: case 60: case 61: case 62: case 63: case 64:
this.$ = $$[$0];
break;
case 12: case 14: case 16:
 this.$ = {type: $$[$0-3], name: $$[$0-1], attr: $$[$0]};
break;
case 13: case 15: case 17:
 this.$ = {type: $$[$0-2], name: $$[$0]};
break;
case 18:
 this.$ = {type: $$[$0-5], amount: Number($$[$0-3]), name: $$[$0-1], attr: $$[$0]};
break;
case 19:
 this.$ = {type: $$[$0-4], amount: $$[$0-2], name: $$[$0]};
break;
case 20:
 this.$ = {type: $$[$0-11], size: Number($$[$0-9]), min: Number($$[$0-7]), max: Number($$[$0-5]), init: Number($$[$0-3]), name: $$[$0-1], attr: $$[$0]};
break;
case 21:
 this.$ = {type: $$[$0-10], size: $$[$0-8], min: $$[$0-6], max: $$[$0-4], init: $$[$0-2], init: $$[$0]};
break;
case 22:
 this.$ = { type: $$[$0-5], processName: $$[$0-3], name: $$[$0-1], attr: $$[$0]};
break;
case 23:
 this.$ = { type: $$[$0-4], processName: $$[$0-2], name: $$[$0]};
break;
case 24:
 this.$ = { type: $$[$0-9], processName: $$[$0-7], source: $$[$0-5], target: $$[$0-3], event: $$[$0-1], attr: $$[$0]};
break;
case 25:
 this.$ = { type: $$[$0-8], processName: $$[$0-6], source: $$[$0-4], target: $$[$0-2], event: $$[$0]};
break;
case 26:
 this.$ = { type: $$[$0-3], syncConstr: $$[$0-1], attr: $$[$0]};
break;
case 27:
 this.$ = { type: $$[$0-2], syncConstr: $$[$0]};
break;
case 28: case 30:
 this.$ = $$[$0-2] + $$[$0];
break;
case 29:
 this.$ = $$[$0];
break;
case 31:
 this.$ = $$[$0-2] + $$[$0-1] + $$[$0];
break;
case 32:
 this.$ = $$[$0-3] + $$[$0-2] + $$[$0-1] + $$[$0];
break;
case 33: case 37: case 40: case 41:
this.$ = $$[$0-1];
break;
case 36: case 38: case 39: case 42: case 43: case 45: case 47:
this.$ = $$[$0-2] + $$[$0];
break;
case 48: case 51: case 52:
this.$ = $$[$0-2] + $$[$0-1] + $$[$0];
break;
case 49:
this.$ = $$[$0-4] + $$[$0-3] + $$[$0-2] + $$[$0-1];
break;
case 53:
this.$ = $$[$0-4] + $$[$0-3] + $$[$0-2] + $$[$0-1] + $$[$0];
break;
        }
    }
}


/* generated by @ts-jison/lexer-generator 0.4.1-alpha.2 */
import { JisonLexer, JisonLexerApi } from '@ts-jison/lexer';

export class TsTckLexer extends JisonLexer implements JisonLexerApi {
    options: any = {"case-sensitive":true,"moduleName":"TsTck"};
    constructor (yy = {}) {
        super(yy);
    }

    rules: RegExp[] = [
        /^(?:\s+)/,
        /^(?:#[^\n]*)/,
        /^(?:\n)/,
        /^(?:clock\b)/,
        /^(?:edge\b)/,
        /^(?:event\b)/,
        /^(?:int\b)/,
        /^(?:location\b)/,
        /^(?:process\b)/,
        /^(?:sync\b)/,
        /^(?:system\b)/,
        /^(?:initial\b)/,
        /^(?:labels\b)/,
        /^(?:invariant\b)/,
        /^(?:committed\b)/,
        /^(?:urgent\b)/,
        /^(?:provided\b)/,
        /^(?:do\b)/,
        /^(?:if\b)/,
        /^(?:while\b)/,
        /^(?:nop\b)/,
        /^(?:local\b)/,
        /^(?:[0-9]+)/,
        /^(?:[a-zA-Z][a-zA-Z0-9_]*)/,
        /^(?::)/,
        /^(?:@)/,
        /^(?:!)/,
        /^(?:\?)/,
        /^(?:\{)/,
        /^(?:\})/,
        /^(?:,)/,
        /^(?:&&)/,
        /^(?:\+)/,
        /^(?:-)/,
        /^(?:\*)/,
        /^(?:\/)/,
        /^(?:%)/,
        /^(?:==)/,
        /^(?:!=)/,
        /^(?:<=)/,
        /^(?:>=)/,
        /^(?:<)/,
        /^(?:>)/,
        /^(?:=)/,
        /^(?:\()/,
        /^(?:\))/,
        /^(?:;)/,
        /^(?:$)/
    ];
    conditions: any = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47],"inclusive":true}}
    performAction (yy:any,yy_:any,$avoiding_name_collisions:any,YY_START:any): any {
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
    case 11: return 38 
      break;
    case 12: return 39 
      break;
    case 13: return 41 
      break;
    case 14: return 43 
      break;
    case 15: return 44 
      break;
    case 16: return 45 
      break;
    case 17: return 46 
      break;
    case 18: return 'TOK_IF' 
      break;
    case 19: return 'TOK_WHILE' 
      break;
    case 20: return 'TOK_NOP' 
      break;
    case 21: return 'TOK_LOCAL' 
      break;
    case 22: return 23 
      break;
    case 23: return 18 
      break;
    case 24: return 17 
      break;
    case 25: return 32 
      break;
    case 26: return 'TOK_EXMARK' 
      break;
    case 27: return 33 
      break;
    case 28: return 34 
      break;
    case 29: return 36 
      break;
    case 30: return 48 
      break;
    case 31: return 50 
      break;
    case 32: return 62 
      break;
    case 33: return 63 
      break;
    case 34: return 64 
      break;
    case 35: return 65 
      break;
    case 36: return 66 
      break;
    case 37: return 56 
      break;
    case 38: return 61 
      break;
    case 39: return 58 
      break;
    case 40: return 59 
      break;
    case 41: return 57 
      break;
    case 42: return 60 
      break;
    case 43: return 54 
      break;
    case 44: return 'TOK_LBRACKET' 
      break;
    case 45: return 'TOK_RBRACKET' 
      break;
    case 46: return 55 
      break;
    case 47: return 5 
      break;
        }
    }
}


