import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import filmeRoutes from "./routes/filme.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000 // utiliza a porta especificada no arquiv de ambiente .env, senão utiliza a porta 5000

app.use(cors()); // Permitir requisições do frontend
app.use(express.json()); // permite que dados em JSON sejam aceitos no req.body

app.use("/api/filmes", filmeRoutes);

app.listen(PORT, () =>  {
    connectDB();
    console.log("Servidor iniciado em http://localhost:" + PORT);
});