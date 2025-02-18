import { useEffect, useState } from "react";
import api from "../api/api";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/items") // Ajuste para sua rota de API
      .then((response) => setData(response.data))
      .catch((error) => console.error("Erro ao buscar dados", error));
  }, []);

  return (
    <div>
      <h1>Dados do Backend</h1>
      <ul>
        {data.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
