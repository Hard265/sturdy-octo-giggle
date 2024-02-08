import dayjs from "dayjs";

import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import _ from "lodash";
import { Message, MessageSection } from "../types/chat";

const organizeMessages = (messages: Message[]): MessageSection[] => {
    // Sort messages by timestamp in ascending order
    const sortedMessages = _.sortBy(messages, ['timestamp']);

    // Group messages by timestamp
    const groupedMessages = _.groupBy(sortedMessages, (item) => organizeMessageTimestamp(item.timestamp));

    // Transform groupedMessages into the desired format
    const sections: MessageSection[] = _.map(groupedMessages, (messages, timestamp) => ({
        title: timestamp,
        data: messages,
    }));

    return sections;
};

const organizeMessageTimestamp = (timestamp: string) => {
    dayjs.extend(isToday);
    dayjs.extend(isYesterday);

    const date = dayjs(timestamp);
    if (date.isToday()) return "today"
    else if (date.isYesterday()) return "yesterday"
    else return date.format("MMM D, YYYY")

}
export { organizeMessages }