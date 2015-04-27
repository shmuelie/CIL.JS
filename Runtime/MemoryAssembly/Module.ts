module CIL.Runtime.MemoryAssembly
{
    "use strict";

    export class Module
    {
        kind: ModuleKind;
        characteristics: ModuleCharacteristics;
        attributes: ModuleAttributes;
        entryPointToken: number;
        resources: Section;
        strongName: Section;
        is64Bit: boolean;
        debug: Section;
    }
} 