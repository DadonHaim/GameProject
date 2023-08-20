const login = require("../types/loginType");
const RegisterType = require("../types/registerType");
const Database = require("../Database/connection");
class User extends Database {
    constructor(obj) {
        super(obj);
        if (IsLoginType(obj))
            this.login(obj);
        // if(IsRegisterType(obj))
        //      this.register(obj);
        else
            this.emptyConstructor();
    }
    login(obj) {
        this.Query(`SELECT * FROM users WHERE username='${obj.$username}' and password='${obj.$password}'`)
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
        })
            .catch(err => {
            this.id = null;
        });
    }
    register(obj) {
    }
    emptyConstructor() {
    }
}
const user = new User({
    $username: "Haim",
    $password: "123123",
    $rememberMe: false
});
//# sourceMappingURL=user.js.map