import { useState } from "react";
import api from "../api/api.js";

const AddFilmeModal = ({ fecharModal, atualizarFilmes }) => {
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");
  const [imagem, setImagem] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFilme = { nome, ano, genero, imagem };
    api.post("/", newFilme)
      .then(() => {
        alert("Filme criado com sucesso!");
        atualizarFilmes(); // Atualiza a lista de filmes
        fecharModal(); // Fecha o modal após a criação do filme
      })
      .catch((error) => console.error("Erro ao criar filme", error));
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h1>Criar Novo Filme</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Ano:</label>
            <input
              type="number"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Gênero:</label>
            <input
              type="text"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Imagem:</label>
            <input
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              required
            />
          </div>
          <button type="submit">Adicionar Filme</button>
        </form>
        <button onClick={fecharModal} style={{ marginTop: "10px" }}>Fechar</button>
      </div>
    </div>
  );
};

// Estilos para o modal
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
  }
};

export default AddFilmeModal;

import PropTypes from "prop-types";

AddFilmeModal.propTypes = {
  fecharModal: PropTypes.func.isRequired, // DEVE ser uma função obrigatória
  atualizarFilmes: PropTypes.func.isRequired, // DEVE ser uma função obrigatória
};
