export class User {
    private username: string = '';
    private password: string = '';
    constructor(u: string, p: string) {
        this.username = u;
        this.password = p;
    }
    getUserName() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
}
