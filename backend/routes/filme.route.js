import express from "express";

import { getFilmes, createFilme, updateFilme, deleteFilme } from "../controller/filme.controller.js";

const router = express.Router();

/* CRUD */
router.get("/", getFilmes);
router.post("/", createFilme);
router.put("/:id", updateFilme);
router.delete("/:id", deleteFilme);

export default router;