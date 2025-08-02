📦 Quy tắc đặt tên hàm Service
🔧 Thao tác với CSDL (CRUD)
Mục đích	Tên hàm gợi ý
Thêm mới	create (tên đối tượng)
Cập nhật	update (tên đối tượng)
Xóa	delete (tên đối tượng)
Lấy 1 bản ghi	get (tên đối tượng) ById
Lấy tất cả	getAll (tên đối tượng) s
Lọc nâng cao	find (tên đối tượng) sBy...

📝 Ví dụ: createTechnician(), updateFacility(), deleteUser(), getTechnicianById(), getAllFacilities(), findUsersByRole()

📌 Quy ước
Tên hàm = Động từ (hành động) + Tên đối tượng

Dùng camelCase

Nếu thao tác đặc biệt (ví dụ batch, liên kết nhiều bảng):

Ví dụ: assignSpecialtiesToTechnician(techId, specialtyIds), bulkCreateFacilities(dataArray), checkEmailExists(email), syncDoctorsWithElasticsearch(), countBookingsByTechnician(techId), generateDefaultSettingsForUser(userId)



