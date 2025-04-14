package com.examly.springapp.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import com.examly.springapp.model.Order;
import com.examly.springapp.model.OrderItem;

import java.io.ByteArrayOutputStream;

public class PdfGeneratorUtil {

    public static byte[] generateInvoicePdfWithGST(Order order) throws Exception {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                contentStream.setFont(PDType1Font.HELVETICA, 12);

                // Header for the Invoice
                contentStream.beginText();
                contentStream.newLineAtOffset(50, 700);
                contentStream.setLeading(14.5f);
                contentStream.showText("Invoice");
                contentStream.newLine();
                contentStream.showText("Order ID: " + order.getOrderId());
                contentStream.newLine();
                contentStream.showText("Customer Name: " + order.getUser().getUsername());
                contentStream.newLine();
                contentStream.endText();

                // Table Header
                float yPosition = 650; // Starting Y position
                contentStream.beginText();
                contentStream.newLineAtOffset(50, yPosition);
                contentStream.showText("Product Name");
                contentStream.newLineAtOffset(150, 0);
                contentStream.showText("Quantity");
                contentStream.newLineAtOffset(100, 0);
                contentStream.showText("Price per Piece");
                contentStream.newLineAtOffset(100, 0);
                contentStream.showText("Total Price");
                contentStream.endText();

                // Horizontal line under the header
                contentStream.moveTo(50, yPosition - 10);
                contentStream.lineTo(500, yPosition - 10);
                contentStream.stroke();

                // Table rows for Order Items
                yPosition -= 30; // Move down for first row
                double totalPriceBeforeGST = 0;

                for (OrderItem item : order.getOrderItems()) {
                    double itemTotalPrice = item.getQuantity() * item.getProduct().getPrice();
                    totalPriceBeforeGST += itemTotalPrice;

                    contentStream.beginText();
                    contentStream.newLineAtOffset(50, yPosition);
                    contentStream.showText(item.getProduct().getProductName()); // Product Name
                    contentStream.newLineAtOffset(150, 0);
                    contentStream.showText(String.valueOf(item.getQuantity())); // Quantity
                    contentStream.newLineAtOffset(100, 0);
                    contentStream.showText(String.format("%.2f", item.getProduct().getPrice())); // Price per Piece
                    contentStream.newLineAtOffset(100, 0);
                    contentStream.showText(String.format("%.2f", itemTotalPrice)); // Total Price
                    contentStream.endText();

                    yPosition -= 20; // Move down for next row
                }

                // Horizontal line before the totals
                contentStream.moveTo(50, yPosition - 10);
                contentStream.lineTo(500, yPosition - 10);
                contentStream.stroke();

                // Calculations for GST
                double gstAmount = totalPriceBeforeGST * 0.18;
                double totalPriceAfterGST = totalPriceBeforeGST + gstAmount;

                // Display total price, GST, and final amount
                yPosition -= 40; // Adjust position
                contentStream.beginText();
                contentStream.newLineAtOffset(50, yPosition);
                contentStream.showText(String.format("Total Price (Before GST): %.2f", totalPriceBeforeGST));
                contentStream.newLine();
                contentStream.showText(String.format("GST (18%%): %.2f", gstAmount));
                contentStream.newLine();
                contentStream.showText(String.format("Total Price (After GST): %.2f", totalPriceAfterGST));
                contentStream.endText();
            }

            // Return the PDF content as a byte array
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            document.save(byteArrayOutputStream);
            return byteArrayOutputStream.toByteArray();
        }
    }
}
