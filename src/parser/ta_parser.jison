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
"identifier"                %{ return 'TOK_ID' %}
"int"                       %{ return 'TOK_INT' %}
"location"                  %{ return 'TOK_LOCATION' %}
"process"                   %{ return 'TOK_PROCESS' %}
"sync"                      %{ return 'TOK_SYNC' %}
"system"                    %{ return 'TOK_SYSTEM' %}
[a-zA-Z]([a-zA-Z0-9_])*     %{ return 'TOK_TEXT' %}
[0-9]+                      %{ return 'TOK_INTEGER' %}'
":"                         %{ return 'TOK_COLON' %}       
"@"                         %{ return 'TOK_AT' %}
"?"                         %{ return 'TOK_QMARK' %}
"{"                         %{ return 'TOK_LBRACE' %}
"}"                         %{ return 'TOK_RBRACE' %}
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
 : TOK_SYSTEM TOK_COLON TOK_TEXT attributeList
 | TOK_SYSTEM TOK_COLON TOK_TEXT
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
 ;

locationDef
 : TOK_LOCATION TOK_COLON TOK_PROCESS TOK_COLON TOK_ID attributeList
 | TOK_LOCATION TOK_COLON TOK_PROCESS TOK_COLON TOK_ID
 ;

edgeDef
 : TOK_EDGE TOK_COLON TOK_PROCESS TOK_COLON TOK_LOCATION TOK_COLON TOK_LOCATION TOK_COLON TOK_EVENT attributeList
 | TOK_EDGE TOK_COLON TOK_PROCESS TOK_COLON TOK_LOCATION TOK_COLON TOK_LOCATION TOK_COLON TOK_EVENT
 ;

syncDef
 : TOK_SYNC TOK_COLON syncConstraints attributeList
 | TOK_SYNC TOK_COLON syncConstraints
 ;


attributeList
 : TOK_LBRACE attributes TOK_RBRACE
 | TOK_LBRACE TOK_RBRACE
 ;

attributes
 : attribute
 | attribute TOK_COLON attributes
 ;

/* value of attribute can be empty */
attribute
 : TOK_TEXT TOK_COLON TOK_TEXT
 | TOK_TEXT TOK_COLON
 ;

/* weil mindestens zwei sync constraints */
syncConstraints
 : syncConstraint TOK_COLON syncConstraint1
 ;

syncConstraints1
 : syncConstraint
 | syncConstraints1 TOK_COLON syncConstraint
 ;

syncConstraint
 : TOK_PROCESS TOK_AT TOK_EVENT
 | TOK_PROCESS TOK_AT TOK_EVENT TOK_QMARK
 ;