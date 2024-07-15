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
"committed"                  %{ return 'TOK_COMMIT' %}
"urgent"                    %{ return 'TOK_URGENT' %}
"provided"                  %{ return 'TOK_PROV' %}
"do"                        %{ return 'TOK_DO' %}
"if"                        %{ return 'TOK_IF' %}
"while"                     %{ return 'TOK_WHILE' %}
"nop"                       %{ return 'TOK_NOP' %}
"local"                     %{ return 'TOK_LOCAL' %}
[0-9]+                      %{ return 'TOK_INTEGER' %}'
[a-zA-Z]([a-zA-Z0-9_])*     %{ return 'TOK_ID' %}
":"                         %{ return 'TOK_COLON' %}       
"@"                         %{ return 'TOK_AT' %}
"!"                         %{ return 'TOK_EXMARK' %}
"?"                         %{ return 'TOK_QMARK' %}
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
"("                         %{ return 'TOK_LBRACKET' %}
")"                         %{ return 'TOK_RBRACKET' %}
";"                         %{ return 'TOK_SEMICOLON' %}
<<EOF>>                     %{ return 'TOK_EOF' %} 
/lex


%start file

%%

file
 : taSystem TOK_EOF {return $1;}
 ;

taSystem
 : systemDef items {$$ = {$1, $2};}
 ;

items
 : item {$$ = $1;}
 | item items {$$ = {$1, $2};}
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
 : TOK_SYSTEM TOK_COLON TOK_ID attributeList { $$ = {type: $1, name: $3, attr: $4};}
 | TOK_SYSTEM TOK_COLON TOK_ID { $$ = {type: $1, name: $3};}
 ;

processDef
 : TOK_PROCESS TOK_COLON TOK_ID attributeList { $$ = {type: $1, name: $3, attr: $4};}
 | TOK_PROCESS TOK_COLON TOK_ID { $$ = {type: $1, name: $3};}
 ;

eventDef
 : TOK_EVENT TOK_COLON TOK_ID attributeList { $$ = {type: $1, name: $3, attr: $4};}
 | TOK_EVENT TOK_COLON TOK_ID { $$ = {type: $1, name: $3};}
 ;

clockDef
 : TOK_CLOCK TOK_COLON TOK_INTEGER TOK_COLON TOK_ID attributeList { $$ = {type: $1, amount: Number($3), name: $5, attr: $6};}
 | TOK_CLOCK TOK_COLON TOK_INTEGER TOK_COLON TOK_ID { $$ = {type: $1, amount: $3, name: $5};}
 ;

intDef
 : TOK_INT TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_ID attributeList { $$ = {type: $1, size: Number($3), min: Number($5), max: Number($7), init: Number($9), name: $11, attr: $12};}
 | TOK_INT TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_ID { $$ = {type: $1, size: $3, min: $5, max: $7, init: $9, init: $11};}
 ;

locationDef
 : TOK_LOCATION TOK_COLON TOK_ID TOK_COLON TOK_ID attributeList { $$ = { type: $1, processName: $3, name: $5, attr: $6};}
 | TOK_LOCATION TOK_COLON TOK_ID TOK_COLON TOK_ID { $$ = { type: $1, processName: $3, name: $5};}
 ;


edgeDef
 : TOK_EDGE TOK_COLON TOK_ID TOK_COLON TOK_ID TOK_COLON TOK_ID TOK_COLON TOK_ID attributeList { $$ = { type: $1, processName: $3, source: $5, target: $7, event: $9, attr: $10};}
 | TOK_EDGE TOK_COLON TOK_ID TOK_COLON TOK_ID TOK_COLON TOK_ID TOK_COLON TOK_ID { $$ = { type: $1, processName: $3, source: $5, target: $7, event: $9};}
 ;

syncDef
 : TOK_SYNC TOK_COLON syncConstraints attributeList { $$ = { type: $1, syncConstr: $3, attr: $4};}
 | TOK_SYNC TOK_COLON syncConstraints { $$ = { type: $1, syncConstr: $3};}
 ;

syncConstraints
 : syncConstraint TOK_COLON syncConstraint1 { $$ = $1 + $3;}
 ;

syncConstraints1
 : syncConstraint { $$ = $1;}
 | syncConstraints1 TOK_COLON syncConstraint { $$ = $1 + $3;}
 ;

syncConstraint
 : TOK_ID TOK_AT TOK_ID { $$ = $1 + $2 + $3;}
 | TOK_PROCESS TOK_AT TOK_ID TOK_QMARK { $$ = $1 + $2 + $3 + $4;}
 ;

attributeList
 : TOK_LBRACE attributes TOK_RBRACE {$$ = $2;}
 | TOK_LBRACE TOK_RBRACE
 ;

attributes
 : attribute {$$ = $1;}
 | attribute TOK_COLON attributes {$$ = $1 + $3;}
 ;

attribute
 : TOK_INIT TOK_COLON {$$ = $1;}
 | TOK_LABELS TOK_COLON labelsList {$$ = $1 + $3;}
 | TOK_INVAR TOK_COLON constraints {$$ = $1 + $3;}
 | TOK_COMMIT TOK_COLON {$$ = $1;}
 | TOK_URGENT TOK_COLON {$$ = $1;}
 | TOK_PROV TOK_COLON constraints {$$ = $1 + $3;}
 | TOK_DO TOK_COLON doSomething {$$ = $1 + $3;}
 ;

labelsList
 : TOK_ID {$$ = $1;}
 | TOK_ID TOK_COMMA labelsList {$$ = $1 + $3;}
 ;

constraints
 : constraint {$$ = $1;}
 | constraint TOK_AND constraints {$$ = $1 + $3;}
 ;

constraint
 : TOK_ID cmp formula {$$ = $1 + $2 + $3;}
 | formula cmp TOK_ID cmp formula {$$ = $1 + $2 + $3 + $4;}
 ;

formula
 : TOK_INTEGER {$$ = $1;}
 | TOK_INTEGER maths formula {$$ = $1 + $2 + $3;}
 ;

doSomething
 : TOK_ID TOK_SET TOK_INTEGER {$$ = $1 + $2 + $3;}
 | TOK_ID TOK_SET TOK_INTEGER TOK_SEMICOLON doSomething {$$ = $1 + $2 + $3 + $4 + $5;}
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
