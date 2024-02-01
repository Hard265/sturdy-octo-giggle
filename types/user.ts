interface User {
  address: string;
  publicKey: string;
}

interface AdminUser extends User {
  privateKey: string;
}

class User {
  address: User["address"];
  publicKey: User["publicKey"];

  constructor({ address, publicKey }: User) {
    this.address = address;
    this.publicKey = publicKey;
  }
}

class AdminUser extends User {
    privateKey: AdminUser["privateKey"];

    constructor({ address, publicKey, privateKey }: AdminUser) {
        super({ address, publicKey});
        this.privateKey = privateKey;
    }
}

export { User, AdminUser };
