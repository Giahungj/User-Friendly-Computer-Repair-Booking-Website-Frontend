import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun } from "docx";

const exportStatisticsToWord = async (summary, chartImage, tableData) => {
	const byteArray = chartImage
		? Uint8Array.from(atob(chartImage.split(",")[1]), (c) => c.charCodeAt(0))
		: null;

	const doc = new Document({
		sections: [
			{
				children: [
					new Paragraph({
						children: [new TextRun({ text: "BÁO CÁO THỐNG KÊ", bold: true, size: 32 })],
					}),
					new Table({
						rows: [
							new TableRow({
								children: [
									new TableCell({
										children: [
											new Paragraph(`Tổng số đơn: ${summary.total}`),
											new Paragraph(`Đang xử lý: ${summary.pending}`),
											new Paragraph(`Hoàn thành: ${summary.completed}`),
											new Paragraph(`Đã hủy: ${summary.cancelled}`),
										],
									}),
									new TableCell({
										children: [
											byteArray
												? new Paragraph({
														children: [
															new ImageRun({
																data: byteArray,
																transformation: { width: 300, height: 200 },
															}),
														],
												  })
												: new Paragraph("Không có biểu đồ"),
										],
									}),
								],
							}),
						],
					}),
					new Paragraph(""),
					new Table({
						rows: [
							new TableRow({
								children: Object.keys(tableData[0] || {}).map(
									(key) => new TableCell({ children: [new Paragraph(key)] })
								),
							}),
							...tableData.map(
								(row) =>
									new TableRow({
										children: Object.values(row).map(
											(val) => new TableCell({ children: [new Paragraph(String(val))] })
										),
									})
							),
						],
					}),
				],
			},
		],
	});

	const blob = await Packer.toBlob(doc);
	saveAs(blob, "statistics-report.docx");
};

const exportStatisticsToExcel = (summary, tableData) => {
	const summarySheet = [
		["BÁO CÁO THỐNG KÊ"],
		[],
		["Tổng số đơn", summary.total],
		["Đang xử lý", summary.pending],
		["Hoàn thành", summary.completed],
		["Đã hủy", summary.cancelled],
	];

	const tableSheet = [
		Object.keys(tableData[0] || {}),
		...tableData.map((row) => Object.values(row)),
	];

	const wb = XLSX.utils.book_new();
	const wsSummary = XLSX.utils.aoa_to_sheet(summarySheet);
	const wsTable = XLSX.utils.aoa_to_sheet(tableSheet);

	XLSX.utils.book_append_sheet(wb, wsSummary, "Tổng Quan");
	XLSX.utils.book_append_sheet(wb, wsTable, "Danh Sách");

	const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
	saveAs(new Blob([wbout], { type: "application/octet-stream" }), "statistics-report.xlsx");
};

export default { exportStatisticsToWord, exportStatisticsToExcel };
