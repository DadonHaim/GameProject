function IsLoginType(obj) {
    return (obj.$username != undefined &&
        obj.$password != undefined &&
        obj.$rememberMe != undefined &&
        Object.keys(obj).length == 3);
}
//# sourceMappingURL=loginType.js.map