import { Test, TestingModule } from '@nestjs/testing';
import { PDFService } from '../../infrastructure/services/pdf.service';
import * as fs from 'fs';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('PDFService', () => {
  let service: PDFService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [PDFService, ConfigService],
    }).compile();

    service = module.get<PDFService>(PDFService);
  });

  it('should create a PDF with tags', async () => {
    const pdfPath = await service.createPDFWithTags();
    expect(fs.existsSync(pdfPath)).toBe(true);
  });
});
