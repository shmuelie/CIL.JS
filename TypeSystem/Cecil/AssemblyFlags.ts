module CIL.Cecil
{
    export const enum AssemblyAttributes
    {
        publicKey = 0x0001,
        sideBySideCompatible = 0x0000,
        retargetable = 0x0100,
        windowsRuntime = 0x0200,
        disableJITCompilerOptimizer = 0x4000,
        enableJITCompileTracking = 0x8000
    }
}