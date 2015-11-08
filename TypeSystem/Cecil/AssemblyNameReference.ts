module CIL.Cecil
{
    export class AssemblyNameReference implements IMetadataScope
    {
        private _name: string;
        private full_name: string;
        private _culture: string;
        private _version: Version;
        private _attributes: number;

        attributes: AssemblyAttributes;

        name(value: string): void
        name(): string
        name(): string
        {
            if (arguments.length === 1)
            {
                this._name = arguments[0];
                this.full_name = null;
                return;
            }
            return this._name;
        }

        culture(value: string): void
        culture(): string
        culture(): string
        {
            if (arguments.length === 1)
            {
                this._culture = arguments[0];
                this.full_name = null;
                return;
            }
            return this._culture;
        }

        version(value: Version): void
        version(): Version
        version(): Version
        {
            if (arguments.length === 1)
            {
                this._version = CheckVersion(arguments[0]);
                this.full_name = null;
                return;
            }
            return this._version;
        }

        attributes(value: AssemblyAttributes): void
        attributes(): AssemblyAttributes
        attributes(): AssemblyAttributes
        {
            if (arguments.length === 1)
            {
                this._attributes = arguments[0];
            }
            return this._attributes;
        }
    }

    function CheckVersion(value: Version): Version
    {
        var v: Version;
        if (value === null)
        {
            v = {
                major: 0,
                minor: 0,
                build: 0,
                revision: 0
            };
            return v;
        }
        if (value.build === -1)
        {
            v = {
                major: value.major,
                minor: value.minor,
                build: 0,
                revision: 0
            };
            return v;
        }
        if (value.revision === -1)
        {
            v = {
                major: value.major,
                minor: value.minor,
                build: value.build,
                revision: 0
            };
            return v;
        }
        return value;
    }
}