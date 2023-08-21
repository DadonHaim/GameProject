class Setting extends Database {
    constructor() {
        super();
        this.GetNameOfGame = () => this.nameGame;
        this.GetDescription = () => this.description;
        this.IsEnablePVP = () => this.enablePVP;
        this.GetAvatarsPerUser = () => this.avatarsPerUser;
        this.GetMaxUpgradeItem = () => this.maxUpgradeItems;
        this.Query("Select * from Global_setting")
            .then(data => {
            this.nameGame = data[0].game_name;
            this.description = data[0].description;
            this.enablePVP = data[0].enable_PVP;
            this.avatarPerUser = data[0].avatars_per_user;
            this.maxUpgradeItems = data[0].max_upgrade;
        })
            .catch(err => { console.log(err); });
    }
}
//# sourceMappingURL=setting.js.map