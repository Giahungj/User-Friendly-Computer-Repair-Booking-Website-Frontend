**Quy tắc đặt tên trong dự án:**  

- **Component React:** PascalCase → `DoctorList.js`, `PatientDetail.js`  
- **Function trong Component:** camelCase → `handleClick()`, `fetchData()`  
- **File Service:** objectService.js → `doctorService.js`, `patientService.js`  
- **Hàm trong Service:** Động từ + đối tượng → `fetchAllDoctors()`, `createDoctor()`  
- **Route File:** objectRoutes.js → `doctorRoutes.js`  
- **API Endpoint:** snake_case hoặc kebab-case (nếu backend quy định) → `/api/doctor/read`, `/api/patient/create`