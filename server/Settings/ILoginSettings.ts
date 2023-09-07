import randomString from "@Functions/randomString"

export const ILoginSettings = {
    username    :{unique:true,  require:true,   min: 4, max:14},
    password    :{unique:false, require:true,   min: 6, max:30},
}


export const ILoginTest = {
    username    :{unique:true,  require:true, min: ILoginSettings.username .min, max:ILoginSettings.username .max, value: "Testusername"},
    password    :{unique:false, require:true, min: ILoginSettings.password .min, max:ILoginSettings.password .max, value: "Testpassword"},
}