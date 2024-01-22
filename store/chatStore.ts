import { action, makeObservable, observable } from "mobx";

type Message = {
    id: string;
    content: string;
    sender: string;
}

class ChatStore {
    messages: Message[] = [
        {
            id: "dd",
            content: "Hey",
            sender: "ajkagujskhfue"
        },
        {
            id: "dxd",
            content: "Heyg",
            sender: "ajkagujskhfue"
        }
    ];

    constructor() {
        makeObservable(this, {
            messages: observable,
            addMessage: action,
        })
    }

    addMessage(message: Message) {
        this.messages.push(message)
    }
}


const chatStore = new ChatStore();
export { chatStore as default, Message };