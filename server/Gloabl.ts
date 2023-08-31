import User from "./Entities/user"

class Game implements IGame{
    public user : any;


    public constructor(){
        this.user = new User()
    }
}

export default new Game();

interface IGame{
    user?:User|any,
}