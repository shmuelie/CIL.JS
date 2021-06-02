namespace CIL.TypeSystem.TextIL.ILReader
{
    "use strict";

    type MetadataNme = ".assembly" | ".class" | ".method";

    abstract class Metadata
    {
        name: MetadataNme;

        constructor(name: MetadataNme)
        {
            this.name = name;
        }

        abstract parse(il: string, parseLocation: number): number;
    }

    class AssemblyMetadata extends Metadata
    {
        constructor()
        {
            super(".assembly");
        }

        parse(il: string, parserLocation: number): number
        {
            parserLocation += 10;
            var isExtern: boolean = false;
            if (il.indexOf("extern", parserLocation) === 0)
            {
                isExtern = true;
                parserLocation += 7;
            }
            var openingBraceIndex = il.indexOf("{", parserLocation);

        }
    }

    var metadatas: Metadata[] = [new AssemblyMetadata() ];

    export function ReadIL(il: string): void
    {
        var parserLocation: number = 0;

        function ILIndexOf(str: string): number
        {
            return il.indexOf(str, parserLocation);
        }

        parserLoop: while (parserLocation < il.length)
        {
            if (ILIndexOf("//") === 0 || ILIndexOf("\n") === 0 || ILIndexOf("\r\n") === 0)
            {
                parserLocation = ILIndexOf("\n") + 1;
                continue;
            }

            var metadatasLength: number = metadatas.length;
            for (var metadataIndex: number = 0; metadataIndex < metadatasLength; metadataIndex++)
            {
                var metadata: Metadata = metadatas[metadataIndex];
                if (ILIndexOf(metadata.name) === 0)
                {
                    parserLocation = metadata.parse(il, parserLocation);
                    continue parserLoop;
                }
            }

            parserLocation++;
        }
    }
}