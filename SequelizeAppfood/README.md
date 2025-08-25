
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
**GET** `api/restaurant/like-by-res/1`


### 3. Get Like By User
**GET** `api/restaurant/like-by-user/1`

### 4. Rate Restaurant
Use api user/register and user/login to get accessToken
**POST** `api/restaurant/rate`
- **Request body:**
```json
{
   "userId": 2,
   "resId": 2,
   "rate": 5
}
```

### 5. Get Rate By User
**GET** `api/restaurant/rate-by-user/1`

### 6. Get Rate By Restaurent
**GET** `api/restaurant/rate-by-res/1`

### 7. Order By User
Use api user/register and user/login to get accessToken
**POST** `api/user/order`
```json
{
    "userId": 1,
    "foodId": 1,
    "amount": 1
}
