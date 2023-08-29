class Avatar{

    //#region Fields
        private id          :number;    //{get;}
        private name        :number;    //{get;}
        private exp         :number;    //{get;}
        private silver      :number;    //{get;}
        private gold        :number;    //{get;}
        private redPowder   :number;    //{get;}
        private diamond     :number;    //{get;}
        private createdDate :string;    //{get;}
        private inventory   :any; //לערוך
    //#endregion

    //#region Flags
        private isExist          :boolean   = false;   
        private isSelectMission  :boolean   = false;           
        private isFreeze         :boolean   = false;       
        private inPage           :string    = 'home';   
    //#endregion

    //#region Refferences
        private user                :   any; //  User;       //{get;}   
        private activeMission       :   any; //  Mission;    //{get;}           
        private magicType           :   any; //  Magic;      //{get;}     
        private page                :   any; //  Page;       //{get;}   
    //#endregion

    //#region Gets      
        public getId            = ():number => this.id           ;
        public getName          = ():number => this.name         ;
        public getExp           = ():number => this.exp          ;
        public getSilver        = ():number => this.silver       ;
        public getGold          = ():number => this.gold         ;
        public getRedPowder     = ():number => this.redPowder    ;
        public getDiamond       = ():number => this.diamond      ;
        public getCreatedDate   = ():string => this.createdDate  ;
        public getInventory     = ()        => this.inventory    ;
        public getUser          = ()        => this.user         ;
        public getActiveMission = ()        => this.activeMission;
        public getMagicType     = ()        => this.magicType    ;
        public getPage          = ()        => this.page         ;
    //#endregion

    //#region Method
        
    //#endregion

    //#region statics

    //#endregion

 }