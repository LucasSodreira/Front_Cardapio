import "./card.css";
import type { FoodData } from "../../interface/FoodData";

interface CardProps {
    foodData: FoodData;
    onEdit: (foodData: FoodData) => void;
    onDelete: (id: number, title: string) => void;
}

export function Card({ foodData, onEdit, onDelete }: CardProps) {
    const { id, title, price, image } = foodData;
    
    // Converter centavos para reais para exibição
    const formattedPrice = (price / 100).toFixed(2).replace('.', ',');

    return (
        <div className="card">
            <img src={image} alt={title} />
            <div className="card-content">
                <h2>{title}</h2>
                <p><b>Valor:</b> R$ {formattedPrice}</p>
                <div className="card-actions">
                    <button 
                        className="btn-edit" 
                        onClick={() => onEdit(foodData)}
                        aria-label={`Editar ${title}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Editar
                    </button>
                    <button 
                        className="btn-delete" 
                        onClick={() => id && onDelete(id, title)}
                        aria-label={`Excluir ${title}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3,6 5,6 21,6"></polyline>
                            <path d="M19,6l-1,14a2,2 0 0,1-2,2H8a2,2,0,0,1-2-2L5,6"></path>
                            <path d="M10,11v6"></path>
                            <path d="M14,11v6"></path>
                            <path d="M5,6l1-3h12l1,3"></path>
                        </svg>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}