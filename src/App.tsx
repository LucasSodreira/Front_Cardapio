import "./App.css";
import { useState } from "react";
import { CreateModal } from "./components/card/create-modal/create-modal";
import { EditModal } from "./components/card/edit-modal/edit-modal";
import { DeleteModal } from "./components/card/delete-modal/delete-modal";
import { Card } from "./components/card/card";
import { useFoodData } from "./hooks/useFoodData";
import type { FoodData } from "./interface/FoodData";
import { Toaster } from 'react-hot-toast';

type ModalType = 'create' | 'edit' | 'delete' | null;

interface ModalState {
  type: ModalType;
  foodData?: FoodData;
  foodId?: number;
  foodTitle?: string;
}

function App() {
  const { data, isLoading, error } = useFoodData();
  const [modal, setModal] = useState<ModalState>({ type: null });

  const openCreateModal = () => {
    setModal({ type: 'create' });
  };

  const openEditModal = (foodData: FoodData) => {
    setModal({ type: 'edit', foodData });
  };

  const openDeleteModal = (foodId: number, foodTitle: string) => {
    setModal({ type: 'delete', foodId, foodTitle });
  };

  const closeModal = () => {
    setModal({ type: null });
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Carregando cardápio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <h2>Erro ao carregar cardápio</h2>
          <p>Verifique se a API está rodando na porta 8080</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        }}
      />
      
      <h1>Cardápio Digital</h1>
      
      {data && data.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum item no cardápio</h3>
          <p>Clique no botão abaixo para adicionar o primeiro item!</p>
        </div>
      ) : (
        <div className="card-grid">
          {data?.map((foodData: FoodData) => (
            <Card
              key={foodData.id || foodData.title}
              foodData={foodData}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          ))}
        </div>
      )}

      {/* Modais */}
      {modal.type === 'create' && <CreateModal closeModal={closeModal} />}
      {modal.type === 'edit' && modal.foodData && (
        <EditModal closeModal={closeModal} foodData={modal.foodData} />
      )}
      {modal.type === 'delete' && modal.foodId && modal.foodTitle && (
        <DeleteModal 
          closeModal={closeModal} 
          foodId={modal.foodId} 
          foodTitle={modal.foodTitle} 
        />
      )}
      
      <button className="create-button" onClick={openCreateModal}>
        + Novo Item
      </button>
    </div>
  );
}

export default App;
