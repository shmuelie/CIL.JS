module CIL.Cecil
{
	import ElementType = Metadata.ElementType;

	export enum MetadataType {
		Void = <number>ElementType.Void,
		Boolean = <number>ElementType.Boolean,
		Char = <number>ElementType.Char,
		SByte = <number>ElementType.I1,
		Byte = <number>ElementType.U1,
		Int16 = <number>ElementType.I2,
		UInt16 = <number>ElementType.U2,
		Int32 = <number>ElementType.I4,
		UInt32 = <number>ElementType.U4,
		Int64 = <number>ElementType.I8,
		UInt64 = <number>ElementType.U8,
		Single = <number>ElementType.R4,
		Double = <number>ElementType.R8,
		String = <number>ElementType.String,
		Pointer = <number>ElementType.Ptr,
		ByReference = <number>ElementType.ByRef,
		ValueType = <number>ElementType.ValueType,
		Class = <number>ElementType.Class,
		Var = <number>ElementType.Var,
		Array = <number>ElementType.Array,
		GenericInstance = <number>ElementType.GenericInst,
		TypedByReference = <number>ElementType.TypedByRef,
		IntPtr = <number>ElementType.I,
		UIntPtr = <number>ElementType.U,
		FunctionPointer = <number>ElementType.FnPtr,
		Object = <number>ElementType.Object,
		MVar = <number>ElementType.MVar,
		RequiredModifier = <number>ElementType.CModReqD,
		OptionalModifier = <number>ElementType.CModOpt,
		Sentinel = <number>ElementType.Sentinel,
		Pinned = <number>ElementType.Pinned,
	}

	export class TypeReference extends MemberReference implements IGenericParameterProvider, IGenericContext
	{
		private _module: ModuleDefinition = null;
        private _fullName: string;
        private _namespace: string;
        private _genericParameters: GenericParameter[];
        valueType: boolean;

        name(name: string): void
        name(): string
        name(): string
        {
            if (arguments.length === 1)
            {
                super.name(arguments[0]);
                this._fullName = null;
            }
            return super.name();
        }

        namespace(ns: string): void
        namespace(): string
        namespace(): string
        {
            if (arguments.length === 1)
            {
                this._namespace = arguments[0];
                this._fullName = null;
            }
            return this._namespace;
        }

		module(): ModuleDefinition
		{
			if (this._module != null)
			{
				return this._module;
			}

			var declaringType = this.declaringType();
			if (declaringType != null)
			{
				return declaringType.module();
			}
			return null;
        }

        type(): IGenericParameterProvider
        {
            return this;
        }

        method(): IGenericParameterProvider
        {
            return null;
        }

        genericParameterType(): GenericParameterType
        {
            return GenericParameterType.Type;
        }

        hasGenericParameters(): boolean
        {
            return this._genericParameters === null || this._genericParameters === undefined || this._genericParameters.length === 0;
        }

		fullName(): string
		{
			//TODO: !
		}
	}
}