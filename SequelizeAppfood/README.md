
## ⚙️ Setup
1. Clone project và cài dependency:
   ```bash
   npm install
   ```
2. Tạo database và cấu hình trong file `.env`:
   ```env
   DATABASE_URL=mysql://root:1234@localhost:3307/ExerciseSQL
   ```
3. Chạy prisma để tạo bảng:
   ```bash
   npx prisma init
   npx prisma db pull
   npx prisma generate
   ```
4. Start server:
   ```bash
   npm run dev
   ```

---

## 📌 API Endpoints

### 1. Toggle Like/Unlike
**POST** `/api/restaurant/toggle-like`

- **Request body:**
```json
{
  "userId": 8,
  "resId": 2
}
```

- **Response (nếu like thành công):**
```json
{
  "message": "ToggleLike res successfully",
  "data": {
    "id": 11,
    "user_id": 8,
    "res_id": 2,
    "isLike": true
  }
}
```

