import React from "react";
import { Button } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportPdfButtonProps {
  elementId: string;
}

const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({ elementId }) => {
  const handleExportAsPDF = async () => {
    const input = document.getElementById(elementId);

    if (input) {
      const canvas = await html2canvas(input, {
        useCORS: true, 
        scale: 3, 
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [canvas.width+10, canvas.height+10], // Ensures the PDF size matches the canvas size
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("chart-export.pdf");
    }
  };

  return (
    <Button  className=" mt-2 !bg-red-500 !text-white rounded-lg hover:scale-110" onClick={handleExportAsPDF}>
      Export Visualization as PDF
    </Button>
  );
};

export default ExportPdfButton;
