export class User {
    constructor(
        public uid: string,
        public fName: string,
        public lName: string,
        public email: string,
        public password: string,
        public profilePic: string,
        public role: string,
        public location: string,
        public skills: string,
        public projects: string,
        public githubAcc: string,
        public linkedinAcc: string,
        public twitterAcc: string
        ) {}

  static createBlank(): User {
    return new User('', '', '', '', '', '', '', '', '', '', '', '', '');
    }
}