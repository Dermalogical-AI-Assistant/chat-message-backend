import { Client, ClientUnaryCall, requestCallback } from '@grpc/grpc-js';

export interface ChatService extends Client {
  sendMessage: (
    request: MessageRequest,
    callback: requestCallback<MessageResponse>
  ) => ClientUnaryCall;
}

export interface MessageRequest {
  question: string;
}

export interface MessageResponse {
  success: boolean;
  answer: string;
  timestamp: string;
}