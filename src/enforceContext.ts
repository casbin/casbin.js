export class EnforceContext {
  public ptype: string;
  public rtype: string;
  public etype: string;
  public mtype: string;

  constructor(rType: string, pType: string, eType: string, mType: string) {
    this.ptype = pType;
    this.etype = eType;
    this.mtype = mType;
    this.rtype = rType;
  }
}
