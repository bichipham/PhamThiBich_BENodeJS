
import express from "express";
import rootRouter from "./src/routers/root.router";
import { appError } from "./src/common/app-error/app-error.error";
import cors from "cors";
const app = express();

// Giúp body nhận được dữ liệu
app.use(express.json());
app.use(
	cors({
			origin: ["http://localhost:3000"],
	})
);


app.use("/api", rootRouter);
app.use(appError);
const port = 3069;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});








