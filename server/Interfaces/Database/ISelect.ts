interface ISelect<T=any>{
    Fields  : T[];
    And?    : string[];
    join?   : listAllTableType;
    on?     : string;
    where?  : string;
    from?   : listAllTableType
}

