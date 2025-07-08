import { EventEmitter } from "events";

export const chatEventBus = new EventEmitter();

export function publishStepMessage(sessionId: string, message: any) {
  chatEventBus.emit(sessionId, message);
}

export function subscribeStepMessages(
  sessionId: string,
  callback: (msg: any) => void,
) {
  chatEventBus.on(sessionId, callback);
  return () => chatEventBus.off(sessionId, callback);
}
