module CIL.Runtime.MemoryAssembly
{
	"use strict";

	export enum ModuleAttributes
	{
		ILOnly = 1,
		Required32Bit = 2,
		StrongNameSigned = 8,
		Preferred32Bit = 0x00020000
	}
} 