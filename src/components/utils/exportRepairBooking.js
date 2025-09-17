// src/utils/exportRepairBooking.js
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as XLSX from "xlsx";

const exportRepairBooking = {
	async toWord(repairBooking) {
		const doc = new Document({
			sections: [
				{
					properties: {
						page: {
							margin: { top: 720, bottom: 720, left: 720, right: 720 }
						}
					},
					children: [
						// THÔNG TIN CHUNG
						new Paragraph({
							children: [
								new TextRun({ text: "THÔNG TIN ĐẶT LỊCH SỬA CHỮA", bold: true, size: 32, color: "000000" }),
							],
						}),
						new Paragraph(" "),
						new Paragraph(`Mã đặt lịch: ${repairBooking.booking_id}`),
						new Paragraph(`Ngày đặt: ${repairBooking.booking_date} - ${repairBooking.booking_time}`),
						new Paragraph(`Trạng thái: ${repairBooking.status}`),
						new Paragraph(`Thời gian tạo: ${new Date(repairBooking.createdAt).toLocaleString('vi-VN')}`),
						new Paragraph(`Cập nhật lần cuối: ${new Date(repairBooking.updatedAt).toLocaleString('vi-VN')}`),
						new Paragraph(" "),

						// THIẾT BỊ
						new Paragraph({
							children: [
								new TextRun({ text: "THÔNG TIN THIẾT BỊ", bold: true, size: 24, color: "0000FF" }),
							],
						}),
						new Paragraph(" "),
						new Paragraph(`Loại thiết bị: ${repairBooking.device_type || 'Chưa xác định'}`),
						new Paragraph(`Thương hiệu: ${repairBooking.brand || 'Chưa xác định'}`),
						new Paragraph(`Model: ${repairBooking.model || 'Chưa xác định'}`),
						new Paragraph(`Mô tả sự cố: ${repairBooking.issue_description}`),
						new Paragraph(`Hình ảnh sự cố: ${repairBooking.issue_image || 'Không có'}`),
						new Paragraph(" "),

						// KHÁCH HÀNG
						new Paragraph({
							children: [
								new TextRun({ text: "THÔNG TIN KHÁCH HÀNG", bold: true, size: 24, color: "0000FF" }),
							],
						}),
						new Paragraph(" "),
						new Paragraph(`Tên khách hàng: ${repairBooking.Customer.User.name}`),
						new Paragraph(`Điện thoại: ${repairBooking.Customer.User.phone}`),
						new Paragraph(`Email: ${repairBooking.Customer.User.email}`),
						new Paragraph(`Địa chỉ: ${repairBooking.Customer.address || 'Chưa cập nhật'}`),
						new Paragraph(`Ngày sinh: ${repairBooking.Customer.date_of_birth || 'Chưa cập nhật'}`),
						new Paragraph(`Phương thức liên hệ ưu tiên: ${repairBooking.Customer.preferred_contact}`),
						new Paragraph(`Điểm tích lũy: ${repairBooking.Customer.loyalty_points}`),
						new Paragraph(" "),

						// KỸ THUẬT VIÊN
						new Paragraph({
							children: [
								new TextRun({ text: "THÔNG TIN KỸ THUẬT VIÊN", bold: true, size: 24, color: "0000FF" }),
							],
						}),
						new Paragraph(" "),
						new Paragraph(`Tên KTV: ${repairBooking.WorkSchedule.Technician.User.name}`),
						new Paragraph(`Điện thoại KTV: ${repairBooking.WorkSchedule.Technician.User.phone}`),
						new Paragraph(`Email KTV: ${repairBooking.WorkSchedule.Technician.User.email}`),
						new Paragraph(" "),

						// CHI NHÁNH
						new Paragraph({
							children: [
								new TextRun({ text: "THÔNG TIN CHI NHÁNH", bold: true, size: 24, color: "0000FF" }),
							],
						}),
						new Paragraph(" "),
						new Paragraph(`Tên chi nhánh: ${repairBooking.WorkSchedule.Technician.Store.name}`),
						new Paragraph(`Địa chỉ: ${repairBooking.WorkSchedule.Technician.Store.address}`),
						new Paragraph(`Số điện thoại: ${repairBooking.WorkSchedule.Technician.Store.phone}`),
						new Paragraph(`Lịch làm việc: ${repairBooking.WorkSchedule.work_date} - Ca ${repairBooking.WorkSchedule.shift}`),
						new Paragraph(`Số lượng tối đa: ${repairBooking.WorkSchedule.max_number}`),
						new Paragraph(`Số lượng hiện tại: ${repairBooking.WorkSchedule.current_number}`),
					],
				},
			],
		});

		const buffer = await Packer.toBlob(doc);
		saveAs(buffer, `repair-booking-${repairBooking.booking_id}-detail.docx`);
	},

	async toExcel(repairBooking) {
        const data = [
            { "THÔNG TIN ĐẶT LỊCH SỬA CHỮA": "" },
            { "Nhóm": "Thông tin Chung", "Trường": "Mã đặt lịch", "Giá trị": repairBooking.booking_id },
            { "Nhóm": "", "Trường": "Ngày đặt", "Giá trị": repairBooking.booking_date },
            { "Nhóm": "", "Trường": "Giờ đặt", "Giá trị": repairBooking.booking_time },
            { "Nhóm": "", "Trường": "Trạng thái", "Giá trị": repairBooking.status },
            { "Nhóm": "", "Trường": "Thời gian tạo", "Giá trị": new Date(repairBooking.createdAt).toLocaleString('vi-VN') },
            { "Nhóm": "", "Trường": "Cập nhật lần cuối", "Giá trị": new Date(repairBooking.updatedAt).toLocaleString('vi-VN') },
            { "Nhóm": "Thông tin Thiết bị", "Trường": "Loại thiết bị", "Giá trị": repairBooking.device_type || 'Chưa xác định' },
            { "Nhóm": "", "Trường": "Thương hiệu", "Giá trị": repairBooking.brand || 'Chưa xác định' },
            { "Nhóm": "", "Trường": "Model", "Giá trị": repairBooking.model || 'Chưa xác định' },
            { "Nhóm": "", "Trường": "Mô tả sự cố", "Giá trị": repairBooking.issue_description },
            { "Nhóm": "", "Trường": "Hình ảnh sự cố", "Giá trị": repairBooking.issue_image || 'Không có' },
            { "Nhóm": "Thông tin Khách hàng", "Trường": "Tên khách hàng", "Giá trị": repairBooking.Customer.User.name },
            { "Nhóm": "", "Trường": "Điện thoại", "Giá trị": repairBooking.Customer.User.phone },
            { "Nhóm": "", "Trường": "Email", "Giá trị": repairBooking.Customer.User.email },
            { "Nhóm": "", "Trường": "Địa chỉ", "Giá trị": repairBooking.Customer.address || 'Chưa cập nhật' },
            { "Nhóm": "", "Trường": "Ngày sinh", "Giá trị": repairBooking.Customer.date_of_birth || 'Chưa cập nhật' },
            { "Nhóm": "", "Trường": "Phương thức liên hệ", "Giá trị": repairBooking.Customer.preferred_contact },
            { "Nhóm": "", "Trường": "Điểm tích lũy", "Giá trị": repairBooking.Customer.loyalty_points },
            { "Nhóm": "Thông tin Kỹ thuật viên", "Trường": "Tên KTV", "Giá trị": repairBooking.WorkSchedule.Technician.User.name },
            { "Nhóm": "", "Trường": "Điện thoại KTV", "Giá trị": repairBooking.WorkSchedule.Technician.User.phone },
            { "Nhóm": "", "Trường": "Email KTV", "Giá trị": repairBooking.WorkSchedule.Technician.User.email },
            { "Nhóm": "Thông tin Chi nhánh", "Trường": "Tên chi nhánh", "Giá trị": repairBooking.WorkSchedule.Technician.Store.name },
            { "Nhóm": "", "Trường": "Địa chỉ", "Giá trị": repairBooking.WorkSchedule.Technician.Store.address },
            { "Nhóm": "", "Trường": "Số điện thoại", "Giá trị": repairBooking.WorkSchedule.Technician.Store.phone },
            { "Nhóm": "", "Trường": "Lịch làm việc", "Giá trị": `${repairBooking.WorkSchedule.work_date} - Ca ${repairBooking.WorkSchedule.shift}` },
            { "Nhóm": "", "Trường": "Số lượng tối đa", "Giá trị": repairBooking.WorkSchedule.max_number },
            { "Nhóm": "", "Trường": "Số lượng hiện tại", "Giá trị": repairBooking.WorkSchedule.current_number },
        ];

        const ws = XLSX.utils.json_to_sheet(data, { header: ["Nhóm", "Trường", "Giá trị"] });

        // Định dạng cột
        ws['!cols'] = [
            { wch: 30 }, // Cột Nhóm
            { wch: 25 }, // Cột Trường
            { wch: 40 }, // Cột Giá trị
        ];

        // Định dạng tiêu đề
        ws['A1'] = { v: "THÔNG TIN ĐẶT LỊCH SỬA CHỮA", t: "s", s: {
            font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4CAF50" } },
            alignment: { horizontal: "center", vertical: "center" },
        }};

        // Định dạng các dòng tiêu đề nhóm
        data.forEach((row, index) => {
            if (row["Nhóm"]) {
            const rowIndex = index + 2; // Bắt đầu từ dòng 2 vì dòng 1 là tiêu đề
            ws[`A${rowIndex}`] = { ...ws[`A${rowIndex}`], s: {
                font: { bold: true, color: { rgb: "000000" } },
                fill: { fgColor: { rgb: "E0E0E0" } },
            }};
            }
        });

        // Gộp ô cho tiêu đề chính
        ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }];

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Booking_Detail");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), `repair-booking-${repairBooking.booking_id}-detail.xlsx`);
        },
};

export default exportRepairBooking;