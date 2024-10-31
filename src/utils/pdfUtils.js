const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const fontPath = path.resolve(
  __dirname,
  "../fonts/FiraCodeNerdFont-Medium.ttf",
);

const generatePdfDocument = (userData, tasks, comments, boards, res) => {
  const formattedName = userData.fullname.replace(/\s+/g, "_");
  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="GDPR_REPORT_${formattedName}"`,
  );

  doc.pipe(res);

  doc
    .font(fontPath)
    .fontSize(20)
    .text("GDPR Request Report", { align: "center" })
    .moveDown();

  doc.fontSize(16).text("Account Information:");
  doc.fontSize(12).text(`ID: ${userData.id}`);
  doc.text(`Email: ${userData.email}`);
  doc.text(`Full Name: ${userData.fullname}`).moveDown();

  doc.fontSize(16).text("Boards:");
  boards.forEach((board, index) => {
    doc.fontSize(12).text(`Board ${index + 1}:`);
    doc.text(`  ID: ${board.id}`);
    doc.text(`  Board ID: ${board.board_id}`);
    doc.text(`  User ID: ${board.user_id}`);
    doc.text(`  Role: ${board.role}`);
    doc.moveDown();
  });

  doc.fontSize(16).text("Tasks:");
  tasks.forEach((task, index) => {
    doc.fontSize(12).text(`Task ${index + 1}:`);
    doc.text(`  ID: ${task.id}`);
    doc.text(`  Board ID: ${task.board_id}`);
    doc.text(`  Title: ${task.title}`);
    doc.text(`  Description: ${task.description}`);
    doc.text(`  Assigned To: ${task.assigned_to}`);
    doc.text(`  Created By: ${task.created_by}`);
    doc.text(`  Created At: ${task.created_at}`);
    doc.text(`  Status: ${task.status}`);
    doc.moveDown();
  });

  doc.fontSize(16).text("Task Comments:");
  comments.forEach((comment, index) => {
    doc.fontSize(12).text(`Comment ${index + 1}:`);
    doc.text(`  ID: ${comment.id}`);
    doc.text(`  Task ID: ${comment.task_id}`);
    doc.text(`  Comment: ${comment.comment}`);
    doc.text(`  User ID: ${comment.user_id}`);
    doc.text(`  Created At: ${comment.created_at}`);
    doc.moveDown();
  });

  doc.fontSize(16).text("End of document.");
  doc.fontSize(14).text("Best regards from the I-Organize Dev Team!");

  doc.end();
};

module.exports = generatePdfDocument;
