export default class GlobalSettiongModel{
    public  gameName?        :string;
    public  description?     :string;
    public  enablePvp?       :boolean;
    public  avatarPerUser?   :number;
    public  maxUpgrade?      :number; 

    public static type : "gameName"|"description"|"enablePvp"|"avatarPerUser"|"maxUpgrade";

}