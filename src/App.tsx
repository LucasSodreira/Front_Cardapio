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
  const [search, setSearch] = useState('');

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

  const filteredData = data?.filter(food => 
    food.title.toLowerCase().includes(search.toLowerCase())
  );

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
      
      <header>
        <div className="header-title">
          <h1>Cardápio Digital</h1>
          <p>Gerencie seus itens de forma simples e rápida</p>
        </div>
        <button className="create-button" onClick={openCreateModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Adicionar Item
        </button>
      </header>

      <div className="actions-bar">
        <div className="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Pesquisar prato..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      
      {filteredData && filteredData.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum item encontrado</h3>
          <p>{search ? 'Tente buscar por outro termo.' : 'Clique no botão "Adicionar Item" para começar!'}</p>
        </div>
      ) : (
        <div className="card-grid">
          {filteredData?.map((foodData: FoodData) => (
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
      
      
    </div>
  );
}

export default App;
