import { Controller, Post, Res, Body } from '@nestjs/common';
import { PDFService } from '../services/pdf.service';
import { ZohoESignService } from '../services/zoho-esign.service';
import { Response } from 'express';

//Get has removed from import

@Controller('pdf')
export class PDFController {
  constructor(
    private readonly pdfService: PDFService,
    private readonly zohoESignService: ZohoESignService,
  ) {}

  @Post('create')
  async createPDF(@Res() res: Response) {
    const pdfPath = await this.pdfService.createPDFWithTags();
    res.download(pdfPath);
  }

  @Post('add-esign-tags')
  async addEsignTags(@Body('pdfPath') pdfPath: string) {
    return this.zohoESignService.addEsignTags(pdfPath);
  }

  @Post('submit')
  async submitForSign(@Body('documentId') documentId: string) {
    return this.zohoESignService.submitForSign(documentId);
  }

  @Post('preview')
  async previewPDF(@Res() res: Response, @Body('pdfPath') pdfPath: string) {
    const pdfBuffer = this.pdfService.getPDF(pdfPath);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  }
}
