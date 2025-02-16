import Filme from "../models/filme.model.js";
import mongoose from "mongoose";

export const getFilmes = async (req, res) => {
    try {
        const filmes = await Filme.find({});
        res.status(200).json({ success: true, data: filmes});
    } catch (error) {
        console.log("Erro no resgate dos filmes", error.message);
        res.status(500).json({ success:false, message: "Erro do Servidor" })
    }
};

export const createFilme = async (req, res) => {
    const filme = req.body // usuario vai enviar este dado

    if(!filme.nome || !filme.ano || !filme.genero || !filme.imagem) {
        return res.status(400).json({ success:false, message: "Por favor, preencha todos os campos." });
    }

    const newFilme = new Filme(filme);

    try {
        await newFilme.save();
        res.status(201).json({ success:true, data: newFilme});
    } catch (error) {
        console.error("Erro na Criação do filme: ", error.message);
        res.status(500).json({ success: false, message: "Erro do Servidor"});
    }
};

export const updateFilme = async (req, res) => {
    const { id } = req.params;
     
    const filme = req.body;

    // checa primeiramente se o id existe na coleção
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Id do Filme Inválido"});
    }

    try {
        const updatedFilme = await Filme.findByIdAndUpdate(id, filme,{ new: true});
        res.status(200).json({ success: true, data: updatedFilme });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro do Servidor "});
    }
};

export const deleteFilme = async (req, res) => {
    const {id} = req.params;

    // checa primeiramente se o id existe na coleção
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Id do Filme Inválido"});
    }

    try {
        await Filme.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Filme removido" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro do Servidor" });
    }
};