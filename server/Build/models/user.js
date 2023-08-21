const Database = require("../Database/connection");
const { RegisterValid } = require("../validation/registerValidation");
class User extends Database {
    constructor() {
        super();
        this.isExist = false;
        this.GetId = () => this.id;
        this.GetUsername = () => this.username;
        this.GetEmail = () => this.email;
        this.GetFirstname = () => this.firstName;
        this.GetLastName = () => this.lastName;
        this.GetBirthday = () => this.birthday;
        this.IsBanned = () => this.banned;
        this.IsFreeze = () => this.freeze;
        this.GetRegisterDate = () => this.register_date;
        this.GetAllAvatars = () => this.avatars;
        this.IsExist = () => this.isExist;
        this.SetEmail = (val) => { this.email = val; };
        this.SetFirstname = (val) => { this.firstName = val; };
        this.SetLastName = (val) => { this.lastName = val; };
        this.SetBirthday = (val) => { this.birthday = val; };
    }
    Login(username, password) {
        this.Query(`SELECT * FROM users WHERE username='${username}' and password='${password}'`)
            .then(rows => {
            this.id = rows[0].user_id;
            this.username = rows[0].username;
            this.email = rows[0].email;
            this.firstName = rows[0].firstName;
            this.lastName = rows[0].lastName;
            this.birthday = rows[0].birthday;
            this.register_date = rows[0].register_date;
            this.banned = rows[0].banned;
            this.freeze = rows[0].freeze;
            this.token = rows[0].token;
            this.avatars = Avatar.GetAllAvatars(this.id);
            this.isExist = true;
        })
            .catch(err => { this.id = null; });
        return this;
    }
    Register(obj) {
        let validation = RegisterValid(obj);
        if (validation.isValid) {
            this.Query(`Insert Into users (username,email,firstName,lastName,birthday) Values ('${obj.username}','${obj.email}','${obj.firstName}','${obj.lastName}','${obj.birthday}')`)
                .then();
        }
        else {
        }
        return this;
    }
    CreateNewAvatar(obj) {
        if (this.avatars.length >= new Setting().GetAvatarsPerUser()) {
            const tempAvatar = new Avatar();
            const check = tempAvatar.create(obj);
            if (tempAvatar.IsExist())
                return new Result({ Messages: LangValid.createAvatarSuccess, Valid: true });
            else
                return new Result({ Messages: check.Messages, Valid: false });
        }
        else
            return new Result({ Messages: LangError.TooMuchAvatars, Valid: false });
    }
    ForgetPassword() { }
    static GetUsersLength() { }
    static GetAllUsers() { }
}
//# sourceMappingURL=user.js.map