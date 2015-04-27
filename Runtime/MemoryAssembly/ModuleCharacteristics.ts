module CIL.Runtime.MemoryAssembly
{
	"use strict";

	export enum ModuleCharacteristics
	{
		HighEntropyVA = 0x0020,
		DynamicBase = 0x0040,
		NoSEH = 0x0400,
		NXCompat = 0x0100,
		AppContainer = 0x1000,
		TerminalServerAware = 0x8000
	}
} 