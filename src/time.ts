interface ITimes {
  format: Function;
}

class Times implements ITimes {
  private _date: Date;
  constructor () {
    this._date = new Date();
  }
  format () {
  }
}

export default new Times();