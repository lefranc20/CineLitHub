import { useEffect, useState, useRef } from "react";
import api from "../api/api.js";
import { FiMoreVertical } from "react-icons/fi"; // Ícone de 3 pontinhos
import AddFilmeModal from "./AddFilmeModal";
import EditFilmeModal from "./EditFilmeModal"; // Importando o novo modal de edição

const FilmeList = () => {
  const [filmes, setFilmes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Estado para o modal de edição
  const [filmeEditando, setFilmeEditando] = useState(null); // Filme que será editado
  const [menuAberto, setMenuAberto] = useState(null);

  const menuRef = useRef(null); // Referência para o menu de opções

  const buscarFilmes = async () => {
    try {
      const response = await api.get("/");
      setFilmes(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar filmes", error);
    }
  };

  useEffect(() => {
    buscarFilmes();
  }, []);

  // Fechar o menu se o usuário clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(null); // Fecha o menu
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const deletarFilme = async (id) => {
    try {
      await api.delete(`/${id}`);
      buscarFilmes();
    } catch (error) {
      console.error("Erro ao deletar filme", error);
    }
  };

  const editarFilme = (filme) => {
    setFilmeEditando(filme); // Armazena o filme a ser editado
    setShowEditModal(true); // Exibe o modal de edição
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
              <FiMoreVertical
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuAberto(menuAberto === filme._id ? null : filme._id);
                }} 
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "24px", // Ícone menor
                  color: "#333" // Cor mais suave
                }} 
              />
              {menuAberto === filme._id && (
                <div 
                  ref={menuRef}
                  style={{
                    position: "absolute",
                    top: 30,
                    right: 10,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px"
                  }}
                >
                  <button onClick={() => deletarFilme(filme._id)}>Remover</button>
                  <button onClick={() => editarFilme(filme)}>Editar</button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Carregando filmes...</p>
      )}

      {showModal && <AddFilmeModal fecharModal={() => setShowModal(false)} atualizarFilmes={buscarFilmes} />}
      
      {showEditModal && (
        <EditFilmeModal 
          fecharModal={() => setShowEditModal(false)} 
          atualizarFilmes={buscarFilmes}
          filme={filmeEditando} // Passando o filme a ser editado
        />
      )}
    </div>
  );
};

export default FilmeList;