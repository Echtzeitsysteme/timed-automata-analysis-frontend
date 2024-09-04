
interface AtomicTerm{
    identifier?: string;
    value?: number;
    insideBrackets?: Term;
}

interface Term{
    atomicTerm?: AtomicTerm;
    minus?: string;
    term?: Term;
    termInParen?: Term;
    termInParenL?: Term;
    termL?: Term;
    termR?: Term;
    maths?: string;
}

export function handleTerm(term: Term): string {
    if (term.atomicTerm) {
        return handleAtomicTerm(term.atomicTerm);
    }
    if (term.minus && term.term) {
        return term.minus + handleTerm(term.term);
    }
    if (term.termInParen) {
        return '(' + handleTerm(term.termInParen) + ')'
    }
    if (term.termInParenL && term.maths && term.termR) {
        return '(' + handleTerm(term.termInParenL) + ')' + term.maths + handleTerm(term.termR);
    }
    if (term.termL && term.maths && term.termR) {
        return '(' + handleTerm(term.termL) + ')' + term.maths + handleTerm(term.termR);
    }
    throw Error(`uploadUtils: Input ${term} is not a valid term`);
}


function handleAtomicTerm(atomicTerm: AtomicTerm): string {
    if (atomicTerm.value) {
        return String(atomicTerm.value);
    }
    if (atomicTerm.identifier && atomicTerm.insideBrackets) {
        return atomicTerm.identifier + '[' + handleTerm(atomicTerm.insideBrackets) + ']';
    }
    if (atomicTerm.identifier) {
        return atomicTerm.identifier
    }
    throw Error(`uploadUtils: Input ${atomicTerm} is not a valid atomicTerm`);
}



