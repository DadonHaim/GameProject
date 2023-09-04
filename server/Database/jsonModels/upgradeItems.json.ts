export default class UpgradeItems{
    public leven1   :_upgradeItems;
    public leven2   :_upgradeItems;
    public leven3   :_upgradeItems;
    public leven4   :_upgradeItems;
    public leven5   :_upgradeItems;
    public leven6   :_upgradeItems;
    constructor(jsonText:string){}

}

class _upgradeItems{
    public hp            :number;
    public energy        :number;
    public refillEnergy  :number;
    public exp           :number;
    public silver        :number;
    public gold          :number;
    public diamond       :number;
    public redPowder     :number;
}