module CIL.Cecil
{
    "use strict";

    export const enum ModuleKind
    {
        Dll,
        Console,
        Windows,
        NetModule
    }

    export const enum TargetArchitecture
    {
        I386,
        AMD64,
        IA64,
        ARMv7
    }

    export const enum ModuleAttributes
    {
        ILOnly = 1,
        Require32Bit = 2,
        StrongNameSigned = 8,
        Preferred32Bit = 0x00020000
    }

    export const enum ModuleCharacteristics
    {
        HighEntropyVA = 0x0020,
        DynamicBase = 0x0040,
        NoSEH = 0x0400,
        NXCompat = 0x0100,
        AppContainer = 0x1000,
        TerminalServerAware = 0x8000,
    }
}