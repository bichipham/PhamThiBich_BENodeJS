# ImageSocialApp

A simple social media style application where users can upload, comment, and save images.

---

## Features
- User authentication (register, login)
- Upload images
- Comment on images
- Save/unsave images
- Get user profile and update avatar
- Delete images (with auto-delete of comments)
- Get saved images by user

---

## API Routes

### User Routes
- `POST /api/users/register` → Register a new user  
- `POST /api/users/login` → Login a user  
- `GET /api/users/get-info` → Get logged in user info (protected)  
- `POST /api/users/upload-image` → Upload image (protected)  
- `GET /api/users/:id/images` → Get all images of a user (protected)  
- `DELETE /api/users/delete-image/:id` → Delete image + comments (protected)  
- `POST /api/users/comment` → Add a comment to an image (protected)  
- `POST /api/users/save-image/:id` → Save an image (protected)  
- `GET /api/users/save-image` → Get saved images of user (protected)  
- `POST /api/users/update-profile` → Update user profile + avatar (protected)  

### Image Routes
- `GET /api/images/` → Get all images (protected)  
- `GET /api/images/:id` → Get image by ID (protected)  
- `GET /api/images/:id/comment` → Get all comments of an image + user info (protected)  
- `GET /api/images/:id/is-saved-by-user` → Check if an image is saved by logged in user (protected)  

---

## Tech Stack
- **Backend**: Node.js, Express.js  
- **Database**: MySQL + Prisma ORM  
- **Authentication**: JWT  
- **File Upload**: Cloudinary  
- **Middleware**: Multer  

---

## Setup

1. Clone this repository:
  https://github.com/bichipham/PhamThiBich_BENodeJS/tree/main/ExpressImagesApp


2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables (`.env`):
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/imagesocialapp"
   JWT_SECRET="yoursecretkey"
   CLOUDINARY_NAME="yourcloudname"
   CLOUDINARY_API_KEY="yourapikey"
   CLOUDINARY_API_SECRET="yourapisecret"
   ```

4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

---

## License
MIT
