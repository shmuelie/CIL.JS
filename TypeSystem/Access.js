var CIL;
(function (CIL) {
    (function (TypeSystem) {
        "use strict";

        (function (Access) {
            Access[Access["Private"] = 0] = "Private";
            Access[Access["Public"] = 1] = "Public";
            Access[Access["FamilyOrAssembly"] = 2] = "FamilyOrAssembly";
            Access[Access["Family"] = 3] = "Family";
            Access[Access["FamilyAndAssembly"] = 4] = "FamilyAndAssembly";
            Access[Access["Asssembly"] = 5] = "Asssembly";
            Access[Access["NestedPrivate"] = 6] = "NestedPrivate";
            Access[Access["NestedPublic"] = 7] = "NestedPublic";
            Access[Access["NestedFamilyOrAssembly"] = 8] = "NestedFamilyOrAssembly";
            Access[Access["NestedFamily"] = 9] = "NestedFamily";
            Access[Access["NestedFamilyAndAssembly"] = 10] = "NestedFamilyAndAssembly";
            Access[Access["NestedAsssembly"] = 11] = "NestedAsssembly";
        })(TypeSystem.Access || (TypeSystem.Access = {}));
        var Access = TypeSystem.Access;
    })(CIL.TypeSystem || (CIL.TypeSystem = {}));
    var TypeSystem = CIL.TypeSystem;
})(CIL || (CIL = {}));
//# sourceMappingURL=Access.js.map
