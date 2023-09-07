import Magic        from "@Categories/Magic";
import Database     from "@Database/Connection";
import cardsModel   from "@Database/DbModels/CardsModel";
import Attack       from "@Database/JsonModels/attack.json";
import Move         from "@Database/JsonModels/move.json";
import Price        from "@Database/JsonModels/price.json";
import UpgradeCards from "@Database/JsonModels/upgradeCards.json";
import Avatar       from "@Entities/Avatar/Avatar";
import CardsModel   from "@Database/DbModels/CardsModel";

export default class Card extends Database<TCards>{

    private name            :string        |null = null;    
    private description     :string        |null = null;    
    private type            :string        |null = null;    
    private price           :Price         |null = null;    
    private move            :Move          |null = null;    
    private attack          :Attack        |null = null;    
    private delay           :number        |null = null;    
    private minAvatarLevel  :number        |null = null;    
    private rank            :number        |null = null;    
    private upgrade         :UpgradeCards  |null = null;            
    private freeze          :boolean       |null = null;        
    private isExist         :boolean       |null = null;        
    private magic           :Magic         |null = null;    
    private avatar          :Avatar        |null = null;    
    private maxUpgrade      :number        |null = null;    

    

    public GetId             = ():number       => this.id             ;
    public GetName           = ():string       => this.name           ;
    public GetDescription    = ():string       => this.description    ;
    public GetType           = ():string       => this.type           ;
    public GetPrice          = ():Price        => this.price          ;
    public GetMove           = ():Move         => this.move           ;
    public GetAttack         = ():Attack       => this.attack         ;
    public GetDelay          = ():number       => this.delay          ;
    public GetMinAvatarLevel = ():number       => this.minAvatarLevel ;
    public GetUpgrade        = ():UpgradeCards => this.upgrade        ;
    public IsFreeze          = ():boolean      => this.freeze         ;
    public IsExist           = ():boolean      => this.isExist        ;
    public GetMagic          = ():Magic        => this.magic          ;
    public GetRank           = ():number       => this.rank           ;
    public GetAvatar         = ():Attack       => this.avatar         ;
    public GetMaxUpgrade      = ():number      => this.maxUpgrade      ;




    public constructor(obj?:cardsModel , avatar?:Avatar){
        super({tableName:"cards"})
        if(obj){
            this.name           = (obj.name            )? obj.name                            : null;
            this.description    = (obj.description     )? obj.description                     : null;
            this.type           = (obj.type            )? obj.type                            : null;
            this.delay          = (obj.delay           )? obj.delay                           : null;
            this.freeze         = (obj.freeze          )? obj.freeze                          : null;
            this.minAvatarLevel = (obj.minAvatarLevel  )? obj.minAvatarLevel                  : null;
            this.maxUpgrade     = (obj.maxUpgrade      )? obj.maxUpgrade                      : null;
            this.price          = (obj.price           )? new Price(obj.price)                : null;
            this.move           = (obj.move            )? new Move(obj.move)                  : null;
            this.attack         = (obj.attack          )? new Attack(obj.attack)              : null;
            this.upgrade        = (obj.upgrade         )? new UpgradeCards(obj.upgrade)       : null;
            this.magic          = (obj.magicID         )? Magic.GetMagicById(obj.magicID)     : null;
            this.isExist        = (this.id && this.name)? true                                : false;
        }           
        if(avatar)
            this.SelectSync<TAvatarsCard>({
                Fields : ["rank"],
                from   : "avatars_cards",
                where  : `cardID = ${this.id} and avatarID=${avatar.GetId()}`
            })
            .ValidDB(data=>{
                this.avatar = avatar;
                this.rank = data[0].rank;
            })
            .NoValidDB(()=>{
                this.avatar = null;
            })
    }

    public RankUp(num:number = 1){
        if(!this.avatar||!this.id) return;
        if(this.rank < this.maxUpgrade){
            this.rank +=num;
            this.Update<AvatarsItemsModel>({
                update:{rank:this.rank},
                from:"avatars_cards",
                where:`cardID=${this.id} and avatarID=${this.avatar.GetId()}`
            })
        }
    }

   
    public static GetAllcardsByAvatar(avatar:Avatar) : Promise<Card[]>{
        return new Promise((resolve,reject)=>{
            let cards : Card[] = [];
            new Database().SelectSync<TCards>({
                Fields : ["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
                And    : ["active"],
                from   : "cards",
                where  : `id = ${avatar.GetId()}`,
                join   : "avatars_cards",
                on     : `avatars_cards.avatarID = ${avatar.GetId()} and avatars_cards.CardID = cards.id`
            })
            .ValidDB<CardsModel[]>(data=>{
                data.forEach(card =>cards.push(new Card(card)));
                resolve(cards)
            })
        })
    }
    public static GetCardById(CardID:number):Card{
        let cards: Card = null;
        new Database().SelectSync<TCards>({
            Fields:["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from: 'cards',
            where :`id = ${CardID}`
        })
        .ValidDB<CardsModel[]>(data => cards= new Card(data[0]))
        return cards;
    }
    public static GetCardByName(CardName:string):Card{
        let cards: Card = null;
        new Database().SelectSync<TCards>({
            Fields:["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from: 'cards',
            where :`name = ${CardName}`
        })
        .ValidDB<CardsModel[]>(data => cards= new Card(data[0]))
        return cards;
    }
    public static GetCardsByAvatar(avatar:Avatar):Promise<Card[]>{
        return new Promise((resolve,reject)=>{
            let cards :Card[] =[];
            new Database().SelectSync<TCards>({ 
                Fields:["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
                from:"cards",
                join:"avatars_cards",
                on: `avatar_cards.avatarID = ${avatar.GetId()}`,
            }).ValidDB<CardsModel[]>(data=>{
                data.forEach(card=> cards.push(new Card(card)))
                resolve(cards)
            })
        })
    }
    public static GetCardsByAvatarSync(avatar:Avatar):Card[]{
        let cards :Card[] = [];
        new Database().SelectSync<TCards>({
            Fields:["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from:"cards",
            join:"avatars_cards",
            on: `avatar_cards.avatarID = ${avatar.GetId()}`,
        })
        .ValidDB<CardsModel[]>(data=>{
            data.forEach(i => cards.push(new Card(i)))
        })
        return cards;
    }
    public static GetCardsByMagic(magic:Magic):Promise<Card[]>{
        return new Promise((resolve,reject)=>{
            let cards :Card[] = [];
            new Database().SelectSync<TCards>({
                Fields:["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
                from:"cards",
                where:`magicID=${magic.GetId()}`
            })
            .ValidDB<CardsModel[]>(data=>{
                data.forEach(i => cards.push(new Card(i)))
                resolve(cards)
            })
        })
    }
    public static GetCardsByMagicSync(magic:Magic):Card[]{
        let cards :Card[] = [];
        new Database().SelectSync<TCards>({
            Fields:["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from:"cards",
            where:`magicID=${magic.GetId()}`
        })
        .ValidDB<CardsModel[]>(data=>{
            data.forEach(i => cards.push(new Card(i)))
        })
        return cards;
    }
    public static GetCardsByType(type:string):Promise<Card[]>{
        return new Promise((resolve,reject)=>{
            let cards :Card[] = [];
            new Database().SelectSync<TCards>({
                Fields:["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
                from:"cards",
                where:`type=${type}`
            })
            .ValidDB<CardsModel[]>(data=>{
                data.forEach(i => cards.push(new Card(i)))
                resolve(cards)
            })
        })
    }
    public static GetCardsByTypeSync(type:string):Card[]{
        let cards :Card[] = [];
        new Database().SelectSync<TCards>({
            Fields:["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from:"cards",
            where:`type=${type}`
        })
        .ValidDB<CardsModel[]>(data=>{
            data.forEach(i => cards.push(new Card(i)))
        })
        return cards;
    }


}