class Setting extends Database{

    private nameGame        : string;
    private description     : string;
    private enablePVP       : boolean;
    private avatarsPerUser  : number;
    private maxUpgradeItems : number;
    

    public GetNameOfGame      = ():string  => this.nameGame;
    public GetDescription     = ():string  => this.description;
    public IsEnablePVP        = ():boolean => this.enablePVP;
    public GetAvatarsPerUser  = ():number  => this.avatarsPerUser;
    public GetMaxUpgradeItem  = ():number  => this.maxUpgradeItems;

    constructor(){
        super();
        this.Query("Select * from Global_setting")
        .then(data=>{
            this.nameGame        = data[0].game_name;
            this.description     = data[0].description;
            this.enablePVP       = data[0].enable_PVP;
            this.avatarPerUser   = data[0].avatars_per_user;
            this.maxUpgradeItems = data[0].max_upgrade;
        })
        .catch(err=>{console.log(err)})
    }
}