export interface DirectMessage {
    customIdName?: string,
    messages: string[],
    members: string[],
}

export class DirectMessageFactory {
    customIdName: string;
    messages: string[];
    members: string[];

    constructor(directMessageObj?: DirectMessage) {
        this.messages = directMessageObj && !!directMessageObj.messages ? directMessageObj.messages : [];
        this.members = directMessageObj && !!directMessageObj.members ? directMessageObj.members : [];
        this.customIdName = directMessageObj && !!directMessageObj.customIdName ? directMessageObj.customIdName : "";
    }

    toJson() {
        return {
            messages: this.messages,
            members: this.members
        }
    }
}