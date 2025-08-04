import { useState, useEffect } from 'react';
import { useFoodUpdate } from '../../../hooks/useFoodUpdate';
import type { FoodData } from '../../../interface/FoodData';
import './edit-modal.css';
import toast from 'react-hot-toast';

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: unknown): void,
    type?: string
}

interface EditModalProps {
    closeModal(): void,
    foodData: FoodData
}

const Input = ({ label, value, updateValue, type = "text" }: InputProps) => {
    return (
        <div className="input-group">
            <label>{label}</label>
            <input 
                type={type} 
                value={value} 
                onChange={(e) => updateValue(e.target.value)}
                placeholder={`Digite ${label.toLowerCase()}...`}
            />
        </div>
    );
}

export function EditModal({ closeModal, foodData }: EditModalProps) {
    const [title, setTitle] = useState(foodData.title);
    const [price, setPrice] = useState(foodData.price / 100); // Converter de centavos para reais
    const [imageUrl, setImageUrl] = useState(foodData.image);
    const { mutate, isPending, isSuccess } = useFoodUpdate();
    
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title || !price || !imageUrl) {
            toast.error('Por favor, preencha todos os campos!');
            return;
        }
        
        const updatedFoodData: FoodData = {
            id: foodData.id,
            title,
            price: Math.round(Number(price) * 100), // Converter para centavos
            image: imageUrl
        };
        
        mutate(updatedFoodData);
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Item atualizado com sucesso!');
            closeModal();
        }
    }, [isSuccess, closeModal]);

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal} aria-label="Close modal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <h2>Editar Item do Cardápio</h2>
                <form onSubmit={submit}>
                    <Input label="Título" value={title} updateValue={setTitle} />
                    <Input label="Preço (R$)" value={price} updateValue={setPrice} type="number" />
                    <Input label="URL da Imagem" value={imageUrl} updateValue={setImageUrl} type="url" />
                    <div className="modal-buttons">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isPending}>
                            {isPending ? 'Atualizando...' : 'Atualizar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
