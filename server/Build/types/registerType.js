global.IsRegisterType = function (obj) {
    return (obj.$username != undefined &&
        obj.$password != undefined &&
        obj.$email != undefined &&
        obj.$firstName != undefined &&
        obj.$lastName != undefined &&
        obj.$lastName != undefined &&
        Object.keys(obj).length == 6);
};
//# sourceMappingURL=registerType.js.map