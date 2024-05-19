import { PDFDocument, PageSizes } from "pdf-lib";
import sharp from "sharp";
export const toPDF = async (data: File[]) => {
  console.log("toPDF Function");
  const pdfDoc = await PDFDocument.create();

  // แปลงเป็น ArrayBuffer

  const arrayBufferDataJPG = await Promise.all(
    data
      .filter((i) => {
        return i.type === "image/jpeg" ? true : false;
      })
      .map((i) => {
        return i.arrayBuffer();
      })
  );

  const arrayBufferDataPNG = await Promise.all(
    data
      .filter((i) => {
        return i.type === "image/png" ? true : false;
      })
      .map((i) => {
        return i.arrayBuffer();
      })
  );

  // Convert PNG to JPEG
  const pngTojpegArrayBuffer = await Promise.all(
    arrayBufferDataPNG.map((i) => {
      const pngBuffer = sharp(i).jpeg().toBuffer();
      return pngBuffer;
    })
  );

  const resultArrayBuffer = [...arrayBufferDataJPG, ...pngTojpegArrayBuffer];

  const pdfImage = await Promise.all(
    resultArrayBuffer.map((i) => {
      return pdfDoc.embedJpg(i);
    })
  );

  console.log(PageSizes.A4);

  pdfImage.forEach((i) => {
    const resize = i.scaleToFit(PageSizes.A4[0], PageSizes.A4[1]);
    const page = pdfDoc.addPage(PageSizes.A4);
    page.drawImage(i, {
      x: page.getWidth() / 2 - resize.width / 2,
      y: page.getHeight() / 2 - resize.height / 2,
      width: resize.width,
      height: resize.height,
    });
  });

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
};
