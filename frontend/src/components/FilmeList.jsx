import { useEffect, useState } from "react";
import api from "../api/api.js";
import { FiMoreVertical } from "react-icons/fi"; // Ícone de 3 pontinhos
import AddFilmeModal from "./AddFilmeModal";

const FilmeList = () => {
  const [filmes, setFilmes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [menuAberto, setMenuAberto] = useState(null);

  const buscarFilmes = async () => {
    try {
      const response = await api.get("/");
      console.log("Filmes recebidos:", response.data);
      setFilmes(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar filmes", error);
    }
  };

  useEffect(() => {
    buscarFilmes();
  }, []);

  const deletarFilme = async (id) => {
    try {
      await api.delete(`/filmes/${id}`);
      buscarFilmes();
    } catch (error) {
      console.error("Erro ao deletar filme", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lista de Filmes</h1>
      <button onClick={() => setShowModal(true)}>Adicionar Filme</button>
      {filmes.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
          {filmes.map((filme) => (
            <div key={filme._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", position: "relative" }}>
              <img src={filme.imagem} alt={filme.nome} style={{ width: "100%", borderRadius: "8px" }} />
              <h3>{filme.nome}</h3>
              <p><strong>Ano:</strong> {filme.ano}</p>
              <p><strong>Gênero:</strong> {filme.genero}</p>
              <FiMoreVertical onClick={() => setMenuAberto(menuAberto === filme._id ? null : filme._id)} style={{ cursor: "pointer", position: "absolute", top: 10, right: 10 }} />
              {menuAberto === filme._id && (
                <div style={{ position: "absolute", top: 30, right: 10, background: "white", border: "1px solid #ccc", borderRadius: "5px", padding: "5px" }}>
                  <button onClick={() => deletarFilme(filme._id)}>Remover</button>
                  <button>Editar</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Carregando filmes...</p>
      )}

      {showModal && <AddFilmeModal fecharModal={() => setShowModal(false)} atualizarFilmes={buscarFilmes} />}
    </div>
  );
};

export default FilmeList;
