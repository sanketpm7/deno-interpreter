enum TokenType {
    Number,         //0
    Identifier,     //1
    Let,            //2
    Equals,         //3
    BinaryOperator, //4
    OpenParen,      //5
    CloseParen,     //6
    EOF             //7
}

interface Token {
    value: string;
    type: TokenType
}

function isNumber(str: string): boolean {
    const c = str.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]);
}

function isSkipable(s: string): boolean {
    return s === ' ' || s === '\n' || s === '\t';
}

function isAlpha(s: string): boolean {
    const ch = s.charCodeAt(0);
    const lowerCaseBound = ['a'.charCodeAt(0), 'z'.charCodeAt(0)];
    const upperCaseBound = ['A'.charCodeAt(0), 'Z'.charCodeAt(0)];

    return (ch >= lowerCaseBound[0] && ch <= lowerCaseBound[1]) 
            || (ch >= upperCaseBound[0] && ch <= upperCaseBound[1])
}

function createToken(value = "", type: TokenType): Token {
    return { value, type };
}

function tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split('');

    while (src.length > 0) {
        const ch = src.shift()!;
        if (isSkipable(ch)) {
            continue
        }
        else if (ch == '(') {
            tokens.push(createToken(ch, TokenType.OpenParen));
        }
        else if (ch == ')') {
            tokens.push(createToken(ch, TokenType.CloseParen));
        }
        else if (ch === '+' 
            || ch === '-' 
            || ch === '*' 
            || ch === '/'
            || ch === '%') {
            tokens.push(createToken(ch, TokenType.BinaryOperator));
        }
        else if (ch === '=') {
            tokens.push(createToken(ch, TokenType.Equals));
        }
        else if (isNumber(ch)) {
            let num = ch;

            while (src.length > 0 && isNumber(src[0])) {
                num += src[0];
                src.shift();
            }
            tokens.push(createToken(ch, TokenType.Number));
        }
        else if (isAlpha(ch)) {
            let ident = ch;

            while (src.length > 0 && isAlpha(src[0])) {
                ident += src[0];
                src.shift()
            }
            if (ident === "let") {
                tokens.push(createToken(ch, TokenType.Let));
            } else {
                tokens.push(createToken(ch, TokenType.Identifier));
            }
        }
        else {
            console.error('Invalid character found: ', ch);
            Deno.exit(1);
        }
    }
    tokens.push(createToken('EndOfFile', TokenType.EOF));
    return tokens;
}

async function getSourceCode(): Promise<string> {
    try {
        const fileData = await Deno.readTextFile('code/source_code.txt');
        return fileData;
    } catch (e) {
        console.log('File Not found or Incorrect path: \n', e);
    }
    return '';
}

const data = await getSourceCode();
const tokens = tokenize(data);
console.log(tokens);