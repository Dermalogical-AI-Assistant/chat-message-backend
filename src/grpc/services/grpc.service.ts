import { Injectable, OnModuleInit } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';
import { ChatService, MessageResponse } from '../chat/chat.grpc.interface';

@Injectable()
export class GrpcClientService implements OnModuleInit {
  private chatService: ChatService;

  onModuleInit() {
    const packageDefinition = protoLoader.loadSync(

      path.join(process.cwd(), 'src/grpc/chat/chat.proto'),
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      }
    );

    // Type assertion to handle the dynamic nature of gRPC loading
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
    const protoDescriptorChat = protoDescriptor.chat as any;

    this.chatService = new protoDescriptorChat.ChatService(
      '20.12.241.29:50051',
      grpc.credentials.createInsecure()
    );
  }

  sendMessage(question: string): Promise<MessageResponse> {
    return new Promise((resolve, reject) => {
      this.chatService.sendMessage(
        { question },
        (error, response) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });
  }
}