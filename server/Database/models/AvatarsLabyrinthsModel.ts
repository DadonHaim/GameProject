class AvatarsLabyrinthsModel{
    public id?              :number;
    public labyrinthData?   :string;
    public activeMissionID? :number;
    public labyrinthID?     :number;

    public static type : "id"|"labyrinthData"|"activeMissionID"|"labyrinthID";

}