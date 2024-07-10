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
 : taSystem TOK_EOF
 ;

taSystem
 : systemDef items
 ;

items
 : item
 | item items
 ;

item
 : processDef
 | eventDef
 | clockDef
 | intDef
 | locationDef
 | edgeDef
 | syncDef
 ;


systemDef
 : TOK_SYSTEM TOK_COLON TOK_ID attributeList
 | TOK_SYSTEM TOK_COLON TOK_ID
 ;

processDef
 : TOK_PROCESS TOK_COLON TOK_ID attributeList
 | TOK_PROCESS TOK_COLON TOK_ID
 ;

eventDef
 : TOK_EVENT TOK_COLON TOK_ID attributeList
 | TOK_EVENT TOK_COLON TOK_ID
 ;

clockDef
 : TOK_CLOCK TOK_COLON TOK_INTEGER TOK_COLON TOK_ID attributeList
 | TOK_CLOCK TOK_COLON TOK_INTEGER TOK_COLON TOK_ID
 ;

intDef
 : TOK_INT TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_ID attributeList
 | TOK_INT TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_INTEGER TOK_COLON TOK_ID
 ;

locationDef
 : TOK_LOCATION TOK_COLON TOK_ID TOK_COLON TOK_ID attributeList
 | TOK_LOCATION TOK_COLON TOK_ID TOK_COLON TOK_ID
 ;


edgeDef
 : TOK_EDGE TOK_COLON TOK_ID TOK_COLON TOK_ID TOK_COLON TOK_ID TOK_COLON TOK_ID attributeList
 | TOK_EDGE TOK_COLON TOK_ID TOK_COLON TOK_ID TOK_COLON TOK_ID TOK_COLON TOK_ID
 ;

syncDef
 : TOK_SYNC TOK_COLON syncConstraints attributeList
 | TOK_SYNC TOK_COLON syncConstraints
 ;

syncConstraints
 : syncConstraint TOK_COLON syncConstraint1
 ;

syncConstraints1
 : syncConstraint
 | syncConstraints1 TOK_COLON syncConstraint
 ;

syncConstraint
 : TOK_ID TOK_AT TOK_ID
 | TOK_PROCESS TOK_AT TOK_ID TOK_QMARK
 ;

attributeList
 : TOK_LBRACE attributes TOK_RBRACE
 | TOK_LBRACE TOK_RBRACE
 ;

attributes
 : attribute
 | attribute TOK_COLON attributes
 ;

attribute
 : TOK_INIT TOK_COLON
 | TOK_LABELS TOK_COLON labelsList
 | TOK_INVAR TOK_COLON constraints
 | TOK_COMMIT TOK_COLON
 | TOK_URGENT TOK_COLON
 | TOK_PROV TOK_COLON constraints
 | TOK_DO TOK_COLON reset
 ;

labelsList
 : TOK_ID
 | TOK_ID TOK_COMMA labelsList
 ;

constraints
 : constraint
 | constraint TOK_AND constraints
 ;

constraint
 : TOK_ID cmp formula
 | formula cmp TOK_ID cmp formula
 ;

formula
 : TOK_INTEGER
 | TOK_INTEGER maths formula
 ;

reset
 : TOK_ID TOK_SET TOK_INTEGER
 | TOK_ID TOK_SET TOK_INTEGER TOK_SEMICOLON reset
 ;

cmp
 : TOK_EQ
 | TOK_LT
 | TOK_LEQ
 | TOK_GEQ
 | TOK_GT
 | TOK_NEQ
 ;

maths
 : TOK_PLUS
 | TOK_MINUS
 | TOK_MUL
 | TOK_DIV
 | TOK_PERCENT
 ;
