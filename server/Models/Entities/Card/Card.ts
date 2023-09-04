import Magic        from "@Categories/Magic";
import Database     from "@Database/Connection";
import DB           from "@Database/DB";
import cardsModel   from "@Database/DbModels/cardsModel";
import Attack       from "@Database/JsonModels/attack.json";
import Move         from "@Database/JsonModels/move.json";
import Price        from "@Database/JsonModels/price.json";
import UpgradeCards from "@Database/JsonModels/upgradeCards.json";

export default class Card extends DB<TCards>{

    private name            :string;
    private description     :string;
    private type            :string;
    private price           :Price;
    private move            :Move;
    private attack          :Attack;
    private delay           :number;
    private minAvatarLevel  :number;
    private upgrade         :UpgradeCards;
    private freeze          :boolean;
    private isExist         :boolean;
    private magic           :Magic;


    public GetId             = ():number       => this.id            ;
    public GetName           = ():string       => this.name          ;
    public GetDescription    = ():string       => this.description   ;
    public GetType           = ():string       => this.type          ;
    public GetPrice          = ():Price        => this.price         ;
    public GetMove           = ():Move         => this.move          ;
    public GetAttack         = ():Attack       => this.attack        ;
    public GetDelay          = ():number       => this.delay         ;
    public GetMinAvatarLevel = ():number       => this.minAvatarLevel;
    public GetUpgrade        = ():UpgradeCards => this.upgrade       ;
    public IsFreeze          = ():boolean      => this.freeze        ;
    public IsExist           = ():boolean      => this.isExist       ;
    public GetMagic          = ():Magic        => this.magic         ;

    public GetRank():number{return 0}

    public constructor(obj?:cardsModel){
        super({tableName:"cards"})
        if(obj){
            this.name           = (obj.name            )? obj.name                            : null;
            this.description    = (obj.description     )? obj.description                     : null;
            this.type           = (obj.type            )? obj.type                            : null;
            this.delay          = (obj.delay           )? obj.delay                           : null;
            this.freeze         = (obj.freeze          )? obj.freeze                          : null;
            this.minAvatarLevel = (obj.minAvatarLevel  )? obj.minAvatarLevel                  : null;
            this.price          = (obj.price           )? new Price(obj.price)                : null;
            this.move           = (obj.move            )? new Move(obj.move)                  : null;
            this.attack         = (obj.attack          )? new Attack(obj.attack)              : null;
            this.upgrade        = (obj.upgrade         )? new UpgradeCards(obj.upgrade)       : null;
            this.magic          = (obj.magicID         )? Magic.GetMagicById(obj.magicID)     : null;
            this.isExist        = (this.id && this.name)? true                                : false;
        }           
    }

    



    public static GetCardById(cardID:number):Card{
        let card: Card = null;
        Database.SelectSync<TCards>({
            Fields:["id","name","description","freeze","attack","delay","magicID","move","price","type","upgrade"],
            from: 'cards',
            where :`id = ${cardID}`
        })
        .ValidDB<cardsModel[]>(data => card = new Card(data[0]))
        return card;
    }
    public static GetCardByName():Card{
        return null
    }
    public static GetCardsByAvatar(sync?:boolean):Card[]{
        return null
    }
    public static GetCardsByMinAvatarLeven(sync?:boolean):Card[]{
        return null
    }
    public static GetCardsByMagic(sync?:boolean):Card[]{
        return null
    }
    public static GetCardsByType(sync?:boolean):Card[]{
        return null
    }
}