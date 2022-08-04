export interface Answer {
    createdAt: number;
    input: string;
    messageId: string;
    customIdName?: string;
}

export class AnswerFactory {
    createdAt: number;
    input: string;
    messageId: string;
    customIdName?: string;

    constructor(answerObj?: Answer) {
        this.createdAt = answerObj && !!answerObj.createdAt ? answerObj.createdAt : 0;
        this.input = answerObj && !!answerObj.input ? answerObj.input : "";
        this.messageId = answerObj && !!answerObj.messageId ? answerObj.messageId : "";
        this.customIdName = answerObj && !!answerObj.customIdName ? answerObj.customIdName : "";
    }

    toJson() {
        return {
            createdAt: this.createdAt,
            input: this.input,
            messageId: this.messageId,
        }
    }
}