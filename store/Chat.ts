import { action, makeObservable, observable } from "mobx";

type chat = {
    address: string;
}

class Store {
    chats: chat[] | undefined

    constructor(){
        makeObservable(this,{
            chats: observable,
            push: action
        })
    }

    push(chat: chat){
        this.chats?.push(chat)
    }

    *fetch() {
        const response = yield fetch('https://api.example.com/chats');
        this.chats =  response.json();
        return this.chats;
    }
}
