
%lex

%options case-sensitive

%%

"!" return "FAC"
"^" return "POW";
"log" return "LOG";
"ln" return "LN";
"π" return "PI";
"ans" return "ANS";
"sin" return "SIN";
"cos" return "COS";
"tan" return "TAN";
"√" return "SQRT";
"e" return "E";
"(" return "LPAREN";
")" return "RPAREN";
"÷" return "DIVIDE";
"×" return "TIMES";
"+" return "PLUS";
"-" return "MINUS";

0|[1-9][0-9]*(\.\d+)?\b return "NUMBER"

/* espacios en blanco y saltos de linea */
[ \r\t]+ {}
\n {}

<<EOF>> return "EOF"

. { console.error(`Error lexico: ${yytext}, linea: ${yylloc.first_line}, columna: ${yylloc.first_column}`); }

/lex

/* Imports */
%{
	let ans;

	exports.last = function getAns(value) {
		ans = new Number(value);
	}

	function factorial(number) {
		if(number < 0) {
			throw new Error('factorial operation for a negative number is undefined: ' + number);
		}

		if(number <= 1) {
			return 1;
		} else {
			return number * factorial(number - 1);
		}
	}
%}

%start ini

%% /* Definicion de la gramatica */

ini
	: a EOF { return $$; }
	;

a
	: a PLUS b { $$ = $1 + $3 }
	| a MINUS b { $$ = $1 - $3; }
	| b { $$ = $1; }
	;

b
	: b TIMES c { $$ = $1 * $3; }
	| b DIVIDE c { $$ = $1 / $3; }
	| c { $$ = $1; }
	;

c
	: d POW c { $$ = Math.pow($1, $3); }
	| d { $$ = $1; }
	;

d
	: MINUS e { $$ = $2 * -1; }
	| e { $$ = $1; }
	;

e
	: f FAC { $$ = factorial($1); }
	| f { $$ = $1; }
	;

f
	: NUMBER { $$ = new Number($1); }
	| PI { $$ = Math.PI; }
	| E { $$ = Math.E; }
	| ANS { $$ = ans; }
	| SIN LPAREN a RPAREN { $$ = Math.sin($3); }
	| COS LPAREN a RPAREN { $$ = Math.cos($3); }
	| TAN LPAREN a RPAREN { $$ = Math.tan($3); }
	| LOG LPAREN a RPAREN { $$ = Math.log10($3); }
	| LN LPAREN a RPAREN { $$ = Math.log($3); }
	| SQRT LPAREN a RPAREN { $$ = Math.sqrt($3); }
	| LPAREN a RPAREN { $$ = $2; }
	;
