module CIL.Cecil.Metadata
{
    "use strict";

    export class MetadataToken
    {
        private token: number;

        getRID(): number
        {
            return this.token & 0x00ffffff;
        }

        getTokenType(): TokenType
        {
            return <TokenType>(this.token & 0xff000000);
        }

        constructor(type: TokenType, rid: number)
        constructor(type: TokenType)
        constructor(type: TokenType)
        {
            var rid: number = 0;
            if (arguments.length === 2)
            {
                rid = arguments[1];
            }
            this.token = type | rid;
        }

        toNumber(): number
        {
            return this.token;
        }

        equals(obj: Object): boolean
        {
            if (obj instanceof MetadataToken)
            {
                var other: MetadataToken = <MetadataToken>obj;
                return other.token === this.token;
            }

            return false;
        }

        static zero: MetadataToken = new MetadataToken(0);
    }
} 