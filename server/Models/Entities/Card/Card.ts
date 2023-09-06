import Magic        from "@Categories/Magic";
import Database     from "@Database/Connection";
import DB           from "@Database/DB";
import cardsModel   from "@Database/DbModels/CardsModel";
import Attack       from "@Database/JsonModels/attack.json";
import Move         from "@Database/JsonModels/move.json";
import Price        from "@Database/JsonModels/price.json";
import UpgradeCards from "@Database/JsonModels/upgradeCards.json";
import Avatar       from "@Entities/Avatar/Avatar";
import CardsModel   from "@Database/DbModels/CardsModel";

export default class Card extends DB<TCards>{

    private name            :string;
    private description     :string;
    private type            :string;
    private price           :Price;
    private move            :Move;
    private attack          :Attack;
    private delay           :number;
    private minAvatarLevel  :number;
    private rank            :number;
    private upgrade         :UpgradeCards;
    private freeze          :boolean;
    private isExist         :boolean;
    private magic           :Magic;
    private avatar          :Avatar;
    private maxUpgrade      :number;

    

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
            this.maxUpgrade     = (obj.maxUpgrade      )? obj.maxUpgrade                     :null;
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
        if(!this.avatar || !this.id) return;
        if(this.rank<this.maxUpgrade){
            this.rank +=num;
            this.Query(`Update avatars_cards Set rank=${this.rank} Where cardID=${this.id} and avatarID=${this.avatar.GetId()}`);
        }
    }


    public static GetCardById(cardID:number):Card{
        let card: Card = null;
        Database.SelectSync<TCards>({
            Fields:["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade","maxUpgrade"],
            from: 'cards',
            where :`id = ${cardID}`
        })
        .ValidDB<cardsModel[]>(data => card = new Card(data[0]))
        return card;
    }
    public static GetCardByName(cardName :string):Card{
        let card: Card = null;
        Database.SelectSync<TCards>({
            Fields:["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from: 'cards',
            where :`name = '${cardName}'`
        })
        .ValidDB<cardsModel[]>(data => card = new Card(data[0]))
        return card;
    }
    public static GetCardsByAvatar(avatar:Avatar) :Promise<any>{

        let query:ISelect = {
            Fields  : ["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from    : "cards",
            join    : "avatars_cards",
            on      : `avatars_cards.avatarID = ${avatar.GetId()}`, 
        }
        return Database.Select(query);
    }

    public static GetCardsByAvatarSync(avatar:Avatar):Card[]{
        let cards :Card[] = [];
        let query:ISelect = {
            Fields  : ["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from    : "cards",
            join    : "avatars_cards",
            on      : `avatars_cards.avatarID = ${avatar.GetId()}`, 
        }
        Database.SelectSync(query).ValidDB<CardsModel[]>(data => data.forEach(c=>cards.push(new Card(c))));
        return cards;
    }
    public static GetCardsByMinAvatarLeven(magic:Magic):Promise<any>{
        return  Database.Select({
            Fields  : ["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from    : "cards",
            where   : `magicID=${magic.GetId()}`
        })
    }

    public static GetCardsByMagic(magic:Magic):Promise<any>{
        return Database.Select({
            Fields  : ["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from    : "cards",
            where   : `magicID=${magic.GetId()}`
        })  
    }
    public static GetCardsByMagicSync(magic:Magic):Card[]{
        let cards :Card[] = [];
        Database.SelectSync({
            Fields  : ["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from    : "cards",
            where   : `magicID=${magic.GetId()}`
        })
        .ValidDB<CardsModel[]>(data => data.forEach(c=>cards.push(new Card(c))));
        return cards;
    }

    public static GetCardsByType(type:string):Promise<any>{
        return Database.Select({
            Fields  : ["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from    : "cards",
            where   : `type='${type}'`
        })
    }
    public static GetCardsByTypeSync(type:string):Card[]{
        let cards :Card[] = [];
        Database.SelectSync({
            Fields  : ["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade","minAvatarLevel","maxUpgrade"],
            from    : "cards",
            where   : `type='${type}'`
        })
        .ValidDB<CardsModel[]>(data => data.forEach(c=>cards.push(new Card(c))));
        return cards;
    }
}