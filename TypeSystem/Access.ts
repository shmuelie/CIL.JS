module CIL.TypeSystem
{
    "use strict";

    export enum Access
    {
        Private,
        Public,
        FamilyOrAssembly,
        Family,
        FamilyAndAssembly,
        Asssembly,
        NestedPrivate,
        NestedPublic,
        NestedFamilyOrAssembly,
        NestedFamily,
        NestedFamilyAndAssembly,
        NestedAsssembly
    }
} 