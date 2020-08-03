export class User {
    constructor(
        public id: string,
        public role: string,
        public permission: string,
        public name: string,
        public email: string,
        public mobile: string,
        public password: string,
        public confirmPassword: string

    ) { }
}