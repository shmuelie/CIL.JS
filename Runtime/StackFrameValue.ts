module CIL.Runtime
{
    "use strict";

    export class StackFrameValue
    {
        type: StackFrameValueType;
        pointer: number;
        float: number;
        signedInt: boolean[];
        unsignedInt: boolean[];
        methodPointer: TypeSystem.TypeMethod;

        constructor(type: StackFrameValueType, value: any)
        {
            this.type = type;
            switch (type)
            {
                case StackFrameValueType.Float:
                    this.float = value;
                    break;
                case StackFrameValueType.MethodPointer:
                    this.methodPointer = value;
                    break;
                case StackFrameValueType.Pointer:
                    this.pointer = value;
                    break;
                case StackFrameValueType.SignedInt:
                    this.signedInt = value;
                    break;
                case StackFrameValueType.UnsignedInt:
                    this.unsignedInt = value;
                    break;
            }
        }
    }
} 