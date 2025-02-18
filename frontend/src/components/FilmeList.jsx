import { useEffect, useState } from "react";
import api from "../api/api.js";

const FilmeList = () => {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    api.get("/")
      .then((response) => {
        console.log("Filmes recebidos:", response.data);
        setFilmes(response.data.data);
      })
      .catch((error) => console.error("Erro ao buscar filmes", error));
  }, []);
  
  

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lista de Filmes</h1>
      {filmes.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
          {filmes.map((filme) => (
            <div key={filme._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
              <img src={filme.imagem} alt={filme.nome} style={{ width: "100%", borderRadius: "8px" }} />
              <h3>{filme.nome}</h3>
              <p><strong>Ano:</strong> {filme.ano}</p>
              <p><strong>Gênero:</strong> {filme.genero}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Carregando filmes...</p>
      )}
    </div>
  );
};

export default FilmeList;
