interface Term{
    identifier?: string;
    value?: number;
    insideBrackets?: Term;
    minus?: string;
    term?: Term;
    termInParen?: Term;
    termInParenL?: Term;
    termL?: Term;
    termR?: Term;
    maths?: string;
}

export function handleTerm(term: Term): string {
    if (term.value) {
        return String(term.value);
    }
    else if (term.identifier && term.insideBrackets) {
        return term.identifier + '[' + handleTerm(term.insideBrackets) + ']';
    }
    else if (term.identifier) {
        return term.identifier
    }
    else if (term.minus && term.term) {
        return term.minus + handleTerm(term.term);
    }
    else if(term.term){
        return handleTerm(term.term);
    }
    else if (term.termInParen) {
        return '(' + handleTerm(term.termInParen) + ')'
    }
    else if (term.termL && term.maths && term.termR) {
        return handleTerm(term.termL) + term.maths + handleTerm(term.termR);
    }
    else if (term.termInParenL && term.maths && term.termR) {
        return '(' + handleTerm(term.termInParenL) + ')' + term.maths + handleTerm(term.termR);
    }
    throw Error(`uploadUtils: Input ${term} is not a valid term`);
}



