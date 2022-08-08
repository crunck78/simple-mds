export interface Answer {
    createdAt: number;
    input: string;
    messageId: string;
    customIdName?: string;
    author : string;
}

export class AnswerFactory {
    createdAt: number;
    input: string;
    messageId: string;
    customIdName?: string;
    author : string;

    constructor(answerObj?: Answer) {
        this.createdAt = answerObj && !!answerObj.createdAt ? answerObj.createdAt : 0;
        this.input = answerObj && !!answerObj.input ? answerObj.input : "";
        this.messageId = answerObj && !!answerObj.messageId ? answerObj.messageId : "";
        this.customIdName = answerObj && !!answerObj.customIdName ? answerObj.customIdName : "";
        this.author = answerObj && !!answerObj.author ? answerObj.author : "";
    }

    toJson() {
        return {
            createdAt: this.createdAt,
            input: this.input,
            messageId: this.messageId,
            author : this.author
        }
    }
}