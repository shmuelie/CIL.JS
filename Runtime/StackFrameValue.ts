module CIL.Runtime
{
    "use strict";

    export class StackFrameValue
    {
        type: StackFrameValueType;
        value: any;

        constructor(type: StackFrameValueType, value: any)
        {
            this.type = type;
            this.value = value;
        }
    }
} 