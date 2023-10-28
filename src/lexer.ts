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