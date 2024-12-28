import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

export async function generatePDF(invoice) {
  // Crear un nuevo documento PDF
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
    font: 'Helvetica' // Usar una fuente incorporada
  });

  // Array para almacenar los chunks del PDF
  const chunks = [];

  // Manejar los chunks de datos
  doc.on('data', (chunk) => chunks.push(chunk));

  // Promesa que se resolverá cuando el PDF esté completo
  const pdfPromise = new Promise((resolve) => {
    doc.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
  });

  try {
    // Header
    doc.fontSize(24)
       .text('FACTURA', { align: 'right' })
       .fontSize(12)
       .text(`Nº ${invoice.invoiceNumber}`, { align: 'right' })
       .moveDown();

    // Información del cliente
    doc.fontSize(14)
       .text('Detalles del Cliente:', { underline: true })
       .fontSize(12)
       .text(invoice.customerDetails.name)
       .text(invoice.customerDetails.address)
       .text(invoice.customerDetails.email)
       .text(invoice.customerDetails.phone)
       .moveDown();

    // Fechas
    doc.text(`Fecha de emisión: ${new Date(invoice.date).toLocaleDateString()}`)
       .text(`Fecha de vencimiento: ${new Date(invoice.dueDate).toLocaleDateString()}`)
       .moveDown();

    // Tabla de items
    const tableTop = doc.y;
    const descriptionX = 50;
    const quantityX = 350;
    const priceX = 400;
    const amountX = 500;

    // Encabezados de la tabla
    doc.fontSize(10)
       .text('Descripción', descriptionX, tableTop)
       .text('Cant.', quantityX, tableTop)
       .text('Precio', priceX, tableTop)
       .text('Total', amountX, tableTop)
       .moveDown();

    // Línea separadora
    doc.moveTo(50, doc.y)
       .lineTo(550, doc.y)
       .stroke();

    let y = doc.y + 10;

    // Items
    invoice.items.forEach(item => {
      doc.fontSize(10)
         .text(item.description, descriptionX, y)
         .text(item.quantity.toString(), quantityX, y)
         .text(`$${item.unitPrice.toFixed(2)}`, priceX, y)
         .text(`$${item.total.toFixed(2)}`, amountX, y);
      y += 20;
    });

    // Línea separadora
    doc.moveTo(50, y)
       .lineTo(550, y)
       .stroke();

    y += 20;

    // Totales
    doc.fontSize(10)
       .text(`Subtotal: $${invoice.subtotal.toFixed(2)}`, 400, y)
       .text(`IVA (10%): $${invoice.tax.toFixed(2)}`, 400, y + 20)
       .fontSize(12)
       .text(`Total: $${invoice.total.toFixed(2)}`, 400, y + 40, { bold: true });

    // Generar QR code
    const qrCodeData = await QRCode.toDataURL(JSON.stringify({
      invoiceNumber: invoice.invoiceNumber,
      total: invoice.total,
      date: invoice.date
    }));

    // QR Code
    doc.image(qrCodeData, 50, y, { width: 100 });

    // Notas
    if (invoice.notes) {
      doc.moveDown(2)
         .fontSize(10)
         .text(invoice.notes, 50, doc.y, { width: 500 });
    }

    // Pie de página
    const bottomY = doc.page.height - 50;
    doc.fontSize(8)
       .text('Este documento es una representación digital de una factura.', 50, bottomY, {
         width: 500,
         align: 'center',
         color: 'gray'
       });

  } catch (error) {
    console.error('Error generando el PDF:', error);
    throw error;
  }

  // Finalizar el documento
  doc.end();

  return pdfPromise;
}
