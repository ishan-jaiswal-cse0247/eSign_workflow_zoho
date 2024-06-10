import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PDFService {
  private readonly storagePath: string;

  constructor(private configService: ConfigService) {
    this.storagePath = this.configService.get<string>('PDF_STORAGE_PATH');
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }
  }

  async createPDFWithTags(): Promise<string> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText('Sign here', { x: 50, y: 350 });

    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(this.storagePath, `document_${Date.now()}.pdf`);
    fs.writeFileSync(filePath, pdfBytes);

    return filePath;
  }

  getPDF(filePath: string): Buffer {
    return fs.readFileSync(filePath);
  }
}
