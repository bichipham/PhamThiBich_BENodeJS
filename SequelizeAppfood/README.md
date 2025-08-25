
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

### 2. Get Like By Restaurant
**POST** `api/restaurant/like-by-res/1`


### 3. Get Like By User
**POST** `api/restaurant/like-by-user/1`

{
   "message": "Get like by user successfully",
    "data": {
			"count": 3,
			"likes": [
				{
					"id": 1,
					"user_id": 1,
					"res_id": 1,
					"isLike": true
				},
				{
					"id": 4,
					"user_id": 1,
					"res_id": 1,
					"isLike": true
				},
				{
					"id": 7,
					"user_id": 1,
					"res_id": 2,
					"isLike": true
				}
			],
			"userId": "1"
	}
}
```

