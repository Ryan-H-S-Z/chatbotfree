export default class Message {
    constructor(type, content, targetUser = null) {
        this.type = type;
        this.content = content;
        this.targetuser = null;
        this.timestamp = new Date().getTime();
    }

    toJSON() {
        return JSON.stringify({
            type: this.type,
            content: this.content,
            targetUser: this.targetuser,
            timestamp: this.timestamp,
        });
    }
}