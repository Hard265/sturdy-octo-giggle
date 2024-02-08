import _ from "lodash";
import { User } from "./user";
import { action, makeObservable, observable } from "mobx";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  beneficiary: string;
}

type MessageSection = {
  title: string;
  data: Message[];
}

interface Chat {
  user: User;
  messages: Message[];
}

class Message {
  constructor({ id, content, sender, timestamp, beneficiary }: Message) {
    this.id = id;
    this.content = content;
    this.sender = sender;
    this.timestamp = timestamp;
    this.beneficiary = beneficiary;
  }
}

class Chat {
  user: User;
  messages: Message[];
  selected: string[] = [];

  constructor({ user, messages = [] }: Chat) {
    makeObservable(this, {
      user: observable,
      messages: observable,
      last: action,
      search: action,
    });
    this.user = user;
    this.messages = messages;
  }

  switchSelet(id: string) {
    this.selected.splice(
      0,
      _.size(this.selected),
      ..._.xor(this.selected, [id])
    );
  }

  last() {
    return _.last(_.sortBy(this.messages, (message) => message.timestamp));
  }

  search(query: string) {
    return _.filter(this.messages, (message) =>
      message.content.includes(query)
    );
  }
}

export { Message, Chat, MessageSection };
