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