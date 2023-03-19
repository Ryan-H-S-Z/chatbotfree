export default class ContactMail {
    constructor(email, suggestion) {
        this.email = email;
        this.suggestion = suggestion;
        this.timestamp = new Date().getTime();
    }

    toJSON() {
        return JSON.stringify({
            email : this.email,
            suggestion : this.suggestion,
            timestamp: this.timestamp,
        });
    }
}