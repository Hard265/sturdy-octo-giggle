interface Message {
    id: string;
    content: string;
    sender: string;
    timestamp: string;
}

interface MessageSection {
    title: string;
    data: Message[];
}


export { Message, MessageSection }