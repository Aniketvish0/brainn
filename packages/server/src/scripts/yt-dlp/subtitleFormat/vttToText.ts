import { parseVttToJson } from "./vttToJson";

export function parseVttToPlainText(vttContent: string): string {
    const jsonTranscript = parseVttToJson(vttContent);
    return jsonTranscript.map(item => item.text).join(' ');
}