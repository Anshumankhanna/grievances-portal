// components/ExportPDFButton.tsx
"use client";

import React from 'react';
import { jsPDF } from 'jspdf';

export default function Page() {
    const data = [
        { Name: 'John Doe', Age: 30, Occupation: 'Developer' },
        { Name: 'Jane Smith', Age: 25, Occupation: 'Designer' },
        { Name: 'Alice Johnson', Age: 28, Occupation: 'Manager' },
    ];

    const generatePDF = () => {
        const pdf = new jsPDF();

        // Set title
        pdf.setFontSize(18);
        pdf.text('State Admin Dashboard', 14, 20);
        
        // Add a line break
        pdf.setFontSize(12);
        pdf.text('Generated on: ' + new Date().toLocaleDateString(), 14, 30);
        pdf.line(10, 35, 200, 35); // Draw a line

        // Table headers
        const headers = ['Name', 'Age', 'Occupation'];
        const startY = 40;
        const cellWidth = 60; // Width of each cell
        const rowHeight = 10; // Height of each row

        // Draw table headers
        pdf.setFontSize(12);
        pdf.setTextColor(255, 255, 255); // White text for header
        pdf.setFillColor(0, 102, 204); // Blue background for header
        pdf.rect(10, startY, cellWidth * headers.length, rowHeight, 'F'); // Header background

        headers.forEach((header, index) => {
            pdf.text(header, 10 + cellWidth * index + 5, startY + 7); // Add header text
        });

        // Draw table rows
        pdf.setTextColor(0, 0, 0); // Reset text color to black
        let yPos = startY + rowHeight; // Start position for rows

        data.forEach((row) => {
            pdf.rect(10, yPos, cellWidth * headers.length, rowHeight); // Draw cell border
            pdf.text(row.Name, 10 + 5, yPos + 7); // Name
            pdf.text(row.Age.toString(), 10 + cellWidth + 5, yPos + 7); // Age
            pdf.text(row.Occupation, 10 + cellWidth * 2 + 5, yPos + 7); // Occupation
            yPos += rowHeight; // Move down for the next row
        });

        // Save the PDF
        pdf.save('State_Admin_Dashboard.pdf');
    };

    return (
        <button onClick={generatePDF} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Export to PDF
        </button>
    );
};