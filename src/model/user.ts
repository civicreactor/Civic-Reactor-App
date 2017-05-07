export class User {
    constructor(
        public uid: string,
        public fName: string,
        public lName: string,
        public email: string,
        public password: string,
        public photoURL?: string) {}

  static createBlank(): User {
    return new User('', '', '', '', '', '');
    }
}