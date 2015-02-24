module CIL.Runtime
{
    "use strict";

    export class StackFrame
    {
        argPointers: number[];
        values: StackFrameValue[];
        this: number;
        method: TypeSystem.TypeMethod;

        constructor()
        {
            this.argPointers = [];
            this.values = [];
        }
    }
} 