import { Injectable, HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as FormData from 'form-data';

@Injectable()
export class ZohoESignService {
  private readonly apiToken: string;

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiToken = this.configService.get<string>('ZOHO_API_TOKEN');
  }

  async addEsignTags(pdfPath: string): Promise<any> {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(pdfPath));

    const response = await this.httpService
      .post('https://api.zoho.com/esign/add_tags', formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${this.apiToken}`,
        },
      })
      .toPromise();

    return response.data;
  }

  async submitForSign(documentId: string): Promise<any> {
    const response = await this.httpService
      .post(
        'https://api.zoho.com/esign/submit',
        {
          document_id: documentId,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
          },
        },
      )
      .toPromise();

    return response.data;
  }
}
