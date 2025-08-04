import "./App.css";
import { useState } from "react";
import { CreateModal } from "./components/card/create-modal/create-modal";
import { Card } from "./components/card/card";
import { useFoodData } from "./hooks/useFoodData";
import type { FoodData } from "./interface/FoodData";

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map((foodData: FoodData) => (
          <Card
            key={foodData.id || foodData.title}
            title={foodData.title}
            price={foodData.price}
            image={foodData.image}
          />
        ))}
      </div>
      {isModalOpen && <CreateModal closeModal={handleCloseModal} />}
      <button className="create-button" onClick={handleOpenModal}>
        Criar Novo Item
      </button>
    </div>
  );
}

export default App;
