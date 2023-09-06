import randomString from "@Functions/randomString"

export const IRegisterSettings = {
    username    :{unique:true,  require:true,   min: 4, max:14},
    email       :{unique:true,  require:true,   min: 6, max:50},
    password    :{unique:false, require:true,   min: 6, max:30},
    firstName   :{unique:false, require:false,  min: 2, max:12},
    lastName    :{unique:false, require:false,  min: 2, max:12}
}

export const IRegisterTest = {
    username    :{unique:true,  require:true, min: IRegisterSettings.username .min, max:IRegisterSettings.username .max, value: "Test"+randomString(6)},
    password    :{unique:false, require:true, min: IRegisterSettings.email    .min, max:IRegisterSettings.email    .max, value: "Test"+randomString(6)},
    email       :{unique:true,  require:true, min: IRegisterSettings.password .min, max:IRegisterSettings.password .max, value: "Test"+randomString(6)},
    firstName   :{unique:false, require:true, min: IRegisterSettings.firstName.min, max:IRegisterSettings.firstName.max, value: "Test"+randomString(6)},
    lastName    :{unique:false, require:true, min: IRegisterSettings.lastName .min, max:IRegisterSettings.lastName .max, value: "Test"+randomString(6)}
}