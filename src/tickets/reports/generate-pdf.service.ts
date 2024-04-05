import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { format } from 'date-fns';

@Injectable()
export class GeneratePdfService {
  async generateTablePDF(ticketsData: any[]): Promise<void> {
    try {
      const currentDate = format(new Date(), 'yyyyMMdd_HHmmss');
      const pdfFileName = `pdfs/tickets_${currentDate}.pdf`;

      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Crear una página web con una tabla basada en los datos de los tickets
      const tableRows = ticketsData.map(ticket => `
        <tr>
          <td>${ticket._id}</td>
          <td>${ticket.worker}</td>
          <td>${ticket.client}</td>
          <td>${ticket.amount}</td>
          <td>${ticket.createdAt}</td>
          <td>${ticket.updatedAt}</td>
        </tr>
      `).join('');

      await page.setContent(`
        <html>
          <head>
            <title>Tabla PDF</title>
          </head>
          <body>
            <h1>Tabla de Datos</h1>
            <table border="1">
              <tr>
                <th>ID de Ticket</th>
                <th>ID del Trabajador</th>
                <th>ID del Cliente</th>
                <th>Monto Total</th>
                <th>Creado en</th>
                <th>Actualizado en</th>
              </tr>
              ${tableRows}
            </table>
          </body>
        </html>
      `);

      // Generar un PDF con el nombre adecuado
      await page.pdf({ path: pdfFileName, format: 'A4' });

      await browser.close();
      console.log(`PDF generado con éxito en: ${pdfFileName}`);

    } catch (error) {
      console.error('Error al generar el PDF:', error);
      throw new Error('Error al generar el PDF.');
    }
  }
}




