/* description: transforms a .tck-File into a parse tree with grammar in BNF */
/* TODO: parser cant read certain complex formulas yet, see train_gate_3.tck file and the official documentation on valid input files */

/* lexical grammar */
%lex
%options case-sensitive
%%
\s+                         %{ /* skip whitespace */ %}
"#"[^\n]*                   %{ /* skip comments */ %}
\n                          %{ return 'TOK_EOL' %}
"clock"                     %{ return 'TOK_CLOCK' %}
"edge"                      %{ return 'TOK_EDGE' %}
"event"                     %{ return 'TOK_EVENT' %}
"int"                       %{ return 'TOK_INT' %}
"location"                  %{ return 'TOK_LOCATION' %}
"process"                   %{ return 'TOK_PROCESS' %}
"sync"                      %{ return 'TOK_SYNC' %}
"system"                    %{ return 'TOK_SYSTEM' %}
"initial"                   %{ return 'TOK_INIT' %}
"labels"                    %{ return 'TOK_LABELS' %}
"invariant"                 %{ return 'TOK_INVAR' %}
"committed"                 %{ return 'TOK_COMMIT' %}
"urgent"                    %{ return 'TOK_URGENT' %}
"provided"                  %{ return 'TOK_PROV' %}
"do"                        %{ return 'TOK_DO' %}
"if"                        %{ return 'TOK_IF' %}
"while"                     %{ return 'TOK_WHILE' %}
"nop"                       %{ return 'TOK_NOP' %}
"local"                     %{ return 'TOK_LOCAL' %}
"layout"                    %{ return 'TOK_LAYOUT' %}
[0-9]+                      %{ return 'TOK_INTEGER' %}
[a-zA-Z]([a-zA-Z0-9_])*     %{ return 'TOK_ID' %}
":"                         %{ return 'TOK_COLON' %}       
"@"                         %{ return 'TOK_AT' %}
"{"                         %{ return 'TOK_LBRACE' %}
"}"                         %{ return 'TOK_RBRACE' %}
","                         %{ return 'TOK_COMMA' %}
"&&"                        %{ return 'TOK_AND' %}
"+"                         %{ return 'TOK_PLUS' %}
"-"                         %{ return 'TOK_MINUS' %}
"*"                         %{ return 'TOK_MUL' %}
"/"                         %{ return 'TOK_DIV' %}
"%"                         %{ return 'TOK_PERCENT' %}
"=="                        %{ return 'TOK_EQ' %}
"!="                        %{ return 'TOK_NEQ' %}
"<="                        %{ return 'TOK_LEQ' %}
">="                        %{ return 'TOK_GEQ' %}
"<"                         %{ return 'TOK_LT' %}
">"                         %{ return 'TOK_GT' %}
"="                         %{ return 'TOK_SET' %}
"["                         %{ return 'TOK_LBRACKET' %}
"]"                         %{ return 'TOK_RBRACKET' %}
"("                         %{ return 'TOK_LPARENTHESES' %}
")"                         %{ return 'TOK_RPARENTHESES' %}
"!"                         %{ return 'TOK_EXMARK' %}
"?"                         %{ return 'TOK_QMARK' %}
";"                         %{ return 'TOK_SEMICOLON' %}
<<EOF>>                     %{ return 'TOK_EOF' %} 
/lex


%start file

%%

file
 : taSystem TOK_EOF {return $1;}
 ;

taSystem
 : systemDef items {$$ = {system: $1, items: $2};}
 ;

items
 : items item {$1.push($2); $$ = $1;}
 | item { $$ = [$1];}
 ;

item
 : processDef {$$ = $1;}
 | eventDef {$$ = $1;}
 | clockDef {$$ = $1;}
 | intDef {$$ = $1;}
 | locationDef {$$ = $1;}
 | edgeDef {$$ = $1;}
 | syncDef {$$ = $1;}
 ;


systemDef
 : TOK_SYSTEM TOK_COLON TOK_ID attributeList { $$ = {type: $1, name: $3, attributes: $4};}
 | TOK_SYSTEM TOK_COLON TOK_ID { $$ = {type: $1, name: $3};}
 ;

processDef
 : TOK_PROCESS TOK_COLON TOK_ID attributeList { $$ = {type: $1, name: $3, attributes: $4};}
 | TOK_PROCESS TOK_COLON TOK_ID { $$ = {type: $1, name: $3};}
 ;

eventDef
 : TOK_EVENT TOK_COLON TOK_ID attributeList { $$ = {type: $1, name: $3, attributes: $4};}
 | TOK_EVENT TOK_COLON TOK_ID { $$ = {type: $1, name: $3};}
 ;

clockDef
 : TOK_CLOCK TOK_COLON TOK_INTEGER TOK_COLON TOK_ID attributeList { $$ = {type: $1, amount: $3, name: $5, attributes: $6};}
 | TOK_CLOCK TOK_COLON TOK_INTEGER TOK_COLON TOK_ID { $$ = {type: $1, amount: $3, name: $5};}
 ;

intDef
 : TOK_INT TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_ID attributeList { $$ = {type: $1, size: $3, min: $5, max: $7, init: $9, name: $11, attributes: $12};}
 | TOK_INT TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_ID { $$ = {type: $1, size: $3, min: $5, max: $7, init: $9, name: $11};}
 ;

locationDef
 : TOK_LOCATION TOK_COLON TOK_ID TOK_COLON TOK_ID attributeList { $$ = { type: $1, processName: $3, name: $5, attributes: $6};}
 | TOK_LOCATION TOK_COLON TOK_ID TOK_COLON TOK_ID { $$ = { type: $1, processName: $3, name: $5};}
 ;


edgeDef
 : TOK_EDGE TOK_COLON TOK_ID TOK_COLON TOK_ID TOK_COLON TOK_ID TOK_COLON TOK_ID attributeList { $$ = { type: $1, processName: $3, source: $5, target: $7, event: $9, attributes: $10};}
 | TOK_EDGE TOK_COLON TOK_ID TOK_COLON TOK_ID TOK_COLON TOK_ID TOK_COLON TOK_ID { $$ = { type: $1, processName: $3, source: $5, target: $7, event: $9};}
 ;

syncDef
 : TOK_SYNC TOK_COLON syncConstraints attributeList { $$ = { type: $1, syncConstr: $3, attributes: $4};}
 | TOK_SYNC TOK_COLON syncConstraints { $$ = { type: $1, syncConstr: $3};}
 ;

syncConstraints
 : syncConstraint { $$ = [$1];}
 | syncConstraints TOK_COLON syncConstraint {$1.push($3); $$ = $1;}
 ;

syncConstraint
 : TOK_ID TOK_AT TOK_ID { $$ = $1 + $2 + $3;}
 | TOK_PROCESS TOK_AT TOK_ID TOK_QMARK { $$ = $1 + $2 + $3 + $4;}
 ;

attributeList
 : TOK_LBRACE attributes TOK_RBRACE {$$ = $2;}
 | TOK_LBRACE TOK_RBRACE { $$ = [];}
 ;

attributes
 : attribute {$$ = [$1];}
 | attributes TOK_COLON attribute {$1.push($3); $$ = $1;}
 ;

attribute
 : TOK_INIT TOK_COLON {$$ = {initial: $1};}
 | TOK_LABELS TOK_COLON labelsList {$$ = {labels: $1, labelList: $3};}
 | TOK_INVAR TOK_COLON constraints {$$ = {invariant: $1, constraint: $3};}
 | TOK_COMMIT TOK_COLON {$$ = {commit: $1};}
 | TOK_URGENT TOK_COLON {$$ = {urgent: $1};}
 | TOK_PROV TOK_COLON constraints {$$ = {provided: $1, constraint: $3};}
 | TOK_DO TOK_COLON statements {$$ = {do: $1, maths: $3};}
 | TOK_LAYOUT TOK_COLON coordinate TOK_COMMA coordinate {$$ = {layout: $1, x: $3, y: $5};}
 ;


coordinate
 : TOK_INTEGER {$$ = $1;}
 | TOK_MINUS TOK_INTEGER {$$ = $1 + $2;}
 ;

labelsList
 : TOK_ID {$$ = [$1];}
 | labelsList TOK_COMMA TOK_ID {$1.push($3); $$ = $1;}
 ;

constraints
 : constraint {$$ = [$1];}
 | constraints TOK_AND constraint {$1.push($3); $$ = $1;}
 ;

constraint
 : TOK_LPARENTHESES constraint TOK_RPARENTHESES {$$ = $1;}
 | compare_term {$$ = $1;}
 ;


compare_term
 : term cmp term cmp term {$$ = {lhs: $1, comparatorL: $2, mhs: $3, comparatorR: $4, rhs: $5};}
 | term cmp term {$$ = {lhs: $1, comparator: $2, rhs: $3};}
 ;

term
 : atomic_term {$$ = {term: $1};}
 | TOK_MINUS term {$$ = {minus: $1, value: $2};}
 | TOK_LPARENTHESES term TOK_RPARENTHESES {$$ = {term: $2};}
 | TOK_LPARENTHESES term TOK_RPARENTHESES maths term {$$ = {termL: $2, maths: $4, termR: $5};}
 | atomic_term maths term {$$ = {termL: $1, maths: $2, termR: $3};}
 ;

atomic_term
 : TOK_INTEGER {$$ = {value: $1};}
 | TOK_ID {$$ = {identifier: $1};}
 | TOK_ID TOK_LBRACKET term TOK_RBRACKET {$$ = {identifier: $1, insideBrackets: $3};}
 ;

statements
 : statement {$$ = [$1];}
 | statements TOK_SEMICOLON statement {$1.push($3); $$ = $1;}
 ;

statement
 : term TOK_SET term {$$ = {lhs: $1, set: $2, rhs: $3};}
 ;

cmp
 : TOK_EQ {$$ = $1;}
 | TOK_LT {$$ = $1;}
 | TOK_LEQ {$$ = $1;}
 | TOK_GEQ {$$ = $1;}
 | TOK_GT {$$ = $1;}
 | TOK_NEQ {$$ = $1;}
 ;

maths
 : TOK_PLUS {$$ = $1;}
 | TOK_MINUS {$$ = $1;}
 | TOK_MUL {$$ = $1;}
 | TOK_DIV {$$ = $1;}
 | TOK_PERCENT {$$ = $1;}
 ;
