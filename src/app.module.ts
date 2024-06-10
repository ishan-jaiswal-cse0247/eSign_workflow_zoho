import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PDFService } from './infrastructure/services/pdf.service';
import { ZohoESignService } from './infrastructure/services/zoho-esign.service';
import { PDFController } from './infrastructure/controllers/pdf.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [PDFController],
  providers: [PDFService, ZohoESignService],
})
export class AppModule {}
