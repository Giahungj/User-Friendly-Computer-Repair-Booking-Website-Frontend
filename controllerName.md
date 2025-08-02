📘 Quy tắc đặt tên hàm Controller
🖼️ Render trang (GET)
Mục đích	Tên hàm gợi ý
Thêm mới	renderAdd (tên đối tượng) Page
Cập nhật	renderEdit (tên đối tượng) Page
Chi tiết	renderDetail (tên đối tượng) Page
Danh sách	render (tên đối tượng) ListPage

📨 Gửi dữ liệu (POST/PUT/DELETE)
Mục đích	Tên hàm gợi ý
Thêm mới	handleAdd (tên đối tượng) 
Cập nhật	handleUpdate (tên đối tượng) 
Xóa	handleDelete (tên đối tượng) 

📥 Lấy dữ liệu (GET)
Mục đích	Tên hàm gợi ý
Danh sách	get (tên đối tượng) List hoặc handleGet (tên đối tượng) List
Chi tiết	get (tên đối tượng) Detail hoặc handleGet (tên đối tượng) Detail

📌 Quy ước
 (tên đối tượng) : Tên thực thể (Technician, Facility, User, ...)

Dùng camelCase

Ưu tiên dùng động từ đầu: render, handle, get, delete, update