import { useState, useEffect } from "react";
import api from "../api/api.js";
import PropTypes from "prop-types";

const EditFilmeModal = ({ fecharModal, atualizarFilmes, filme }) => {
  // Inicializa o estado apenas se o filme estiver disponível
  const [nome, setNome] = useState(filme ? filme.nome : "");
  const [ano, setAno] = useState(filme ? filme.ano : "");
  const [genero, setGenero] = useState(filme ? filme.genero : "");
  const [imagem, setImagem] = useState(filme ? filme.imagem : "");

  useEffect(() => {
    if (filme) {
      setNome(filme.nome);
      setAno(filme.ano);
      setGenero(filme.genero);
      setImagem(filme.imagem);
    }
  }, [filme]); // Recarrega os dados quando o filme mudar

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedFilme = { nome, ano, genero, imagem };
  
    // Verificando se o filme tem _id
    console.log(`Atualizando filme com ID: ${filme._id}`); 
  
    if (filme._id) {
      api.put(`/${filme._id}`, updatedFilme) // Mudando para _id
        .then(() => {
          alert("Filme atualizado com sucesso!");
          atualizarFilmes(); // Atualiza a lista de filmes
          fecharModal(); // Fecha o modal após a edição do filme
        })
        .catch((error) => console.error("Erro ao atualizar filme", error));
    } else {
      console.error("ID do filme não encontrado.");
    }
  };
  
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h1>Editar Filme</h1>
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
          <button type="submit">Salvar Alterações</button>
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

EditFilmeModal.propTypes = {
  fecharModal: PropTypes.func.isRequired, // DEVE ser uma função obrigatória
  atualizarFilmes: PropTypes.func.isRequired, // DEVE ser uma função obrigatória
  filme: PropTypes.object.isRequired, // DEVE ser um objeto de filme
};

export default EditFilmeModal;
