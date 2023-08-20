class Avatar{
    private isExist :boolean = false;


    public IsExist = () => this.isExist;

    public create(obj:AvatarType):Result<void>{
        
        return new Result({Messages:"",Valid:false});
    }




    public static GetAllAvatars(id:Number):Avatar[]{

        return [new Avatar()];
    }
}