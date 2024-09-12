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

interface CmpTerm{
    lhs?: Term;
    mhs?: Term;
    rhs?: Term;
    comparatorL?: string;
    comparatorR?: string;
    comparator: string;
}

interface Constr{
    cmpterm?: CmpTerm;
    not?: string;
    constterm?: Term;
}

export function handleConstr(constr: Constr): string{
    let term = '';
    if(constr.cmpterm !== undefined) {
        if (constr.not !== undefined) {
            term += '!';
        }
        if (constr.cmpterm.lhs !== undefined) {
            term += handleTerm(constr.cmpterm.lhs);
        }
        if (constr.cmpterm.comparatorL !== undefined) {
            term += constr.cmpterm.comparatorL;
        }
        if (constr.cmpterm.mhs !== undefined) {
            term += handleTerm(constr.cmpterm.mhs);
        }
        if (constr.cmpterm.comparatorR !== undefined) {
            term += constr.cmpterm.comparatorR;
        }
        if (constr.cmpterm.comparator !== undefined) {
            term += constr.cmpterm.comparator;
        }
        if (constr.cmpterm.rhs !== undefined) {
            term += handleTerm(constr.cmpterm.rhs);
        }
    }
    if(constr.constterm !== undefined){
        term = handleTerm(constr.constterm);
    }
    return term;
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



