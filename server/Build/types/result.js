class Result {
    constructor({ Messages, Valid }) {
        if (Messages == null || Messages == undefined)
            this.ExistMessage = true;
        this.Messages = Messages;
        this.Valid = Valid;
    }
}
//# sourceMappingURL=result.js.map