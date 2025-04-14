package com.examly.springapp.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import com.examly.springapp.model.Order;
import com.examly.springapp.model.OrderItem;

import java.io.ByteArrayOutputStream;

public class PdfGeneratorUtil {

    public static byte[] generateInvoicePdf(Order order) throws Exception {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.setFont(PDType1Font.HELVETICA, 12);
                contentStream.beginText();
                contentStream.setLeading(14.5f);
                contentStream.newLineAtOffset(50, 700);

                // Invoice content
                contentStream.showText("Invoice");
                contentStream.newLine();
                contentStream.showText("Order ID: " + order.getOrderId());
                contentStream.newLine();
                contentStream.showText("Customer Name: " + order.getUser().getUsername());
                contentStream.newLine();
                contentStream.showText("Products:");
                contentStream.newLine();

                for (OrderItem item : order.getOrderItems()) {
                    contentStream.showText("- " + item.getProduct().getProductName() + ": " +
                            item.getQuantity() + " x " + item.getProduct().getPrice());
                    contentStream.newLine();
                }

                contentStream.showText("Total Amount: " + order.getTotalAmount());
                contentStream.newLine();

                contentStream.endText();
            }

            // Return the PDF content as a byte array
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            document.save(byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        }
    }
}

