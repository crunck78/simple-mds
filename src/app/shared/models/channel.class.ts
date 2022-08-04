export interface Channel {
    name: string,
    description: string,
    closed: boolean,
    customIdName?: string,
    messages: string[],
    members: string[],
}

export class ChannelFactory {
    name: string;
    description: string;
    closed: boolean;
    customIdName: string;
    messages: string[];
    members: string[];

    constructor(channelObj?: Channel) {
        this.name = channelObj && !!channelObj.name ? channelObj.name : "";
        this.description = channelObj && !!channelObj.description ? channelObj.description : "";
        this.messages = channelObj && !!channelObj.messages ? channelObj.messages : [];
        this.members = channelObj && !!channelObj.members ? channelObj.members : [];
        this.customIdName = channelObj && !!channelObj.customIdName ? channelObj.customIdName : "";
        this.closed = channelObj && !!channelObj.closed ? channelObj.closed : false;
    }

    toJson() {
        return {
            name: this.name,
            description: this.description,
            closed: this.closed,
            messages: this.messages,
            members: this.members
        }
    }
}