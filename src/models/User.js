class User {
  constructor() {
    this.name = "";
    this.city = "";
    this.image = null;
  }

  fromData(data) {
    this.name = data.name;
    this.city = data.city;
    this.image = data.image;
  }
}

export default User;
