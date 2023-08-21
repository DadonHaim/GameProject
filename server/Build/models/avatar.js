class Avatar {
    constructor() {
        this.isExist = false;
        this.IsExist = () => this.isExist;
    }
    create(obj) {
        return new Result({ Messages: "", Valid: false });
    }
    static GetAllAvatars(id) {
        return [new Avatar()];
    }
}
//# sourceMappingURL=avatar.js.map