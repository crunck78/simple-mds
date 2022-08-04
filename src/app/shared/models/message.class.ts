export interface Message {
    createdAt: number;
    input: string;
    chatId: string;
    customIdName?: string;
}

export class MessageFactory {
    createdAt: number;
    input: string;
    chatId: string;
    customIdName?: string;

    constructor(messageObj?: Message) {
        this.createdAt = messageObj && !!messageObj.createdAt ? messageObj.createdAt : 0;
        this.input = messageObj && !!messageObj.input ? messageObj.input : "";
        this.chatId = messageObj && !!messageObj.chatId ? messageObj.chatId : "";
        this.customIdName = messageObj && !!messageObj.customIdName ? messageObj.customIdName : "";
    }

    toJson() {
        return {
            createdAt: this.createdAt,
            input: this.input,
            chatId: this.chatId,
        }
    }
}