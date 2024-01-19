import * as Clipboard from 'expo-clipboard';

export const copyToClipboard = async () => {
    await Clipboard.setStringAsync('hello world');
};


export function getIconColor(scheme: {}) {
    // @ts-ignore
    return scheme.colorScheme === 'dark' ? '#fff' : '#000';
}