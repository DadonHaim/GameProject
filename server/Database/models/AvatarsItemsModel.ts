class AvatarsItemsModel{
    public id?              :number;
    public active?          :boolean;
    public level?           :number;
    public avatarID?        :number;
    public itemID?          :number;

    public static type : "id"|"active"|"level"|"avatarID"|"itemID";

}