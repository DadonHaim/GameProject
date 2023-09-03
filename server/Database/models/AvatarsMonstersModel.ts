export default class AvatarsMonstersModel{
    public id?              :number;
    public avatarLog?       :string;
    public monsterLog?      :string;
    public avatarID?        :number;
    public itemID?          :number;

    public static type : "id"|"avatarLog"|"monsterLog"|"avatarID"|"itemID";

}