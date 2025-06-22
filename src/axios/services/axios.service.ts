import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { config } from "dotenv";
config();

const QA_HOST = process.env.QA_HOST;

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) { }

  async callQaService(question: string): Promise<any> {
    const url = `http://${QA_HOST}:8087/cosmetics-answer`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, { question })
      );
      return response.data;
    } catch (error) {
      console.error('Failed to call other service:', error.message);
      throw error;
    }
  }
}
