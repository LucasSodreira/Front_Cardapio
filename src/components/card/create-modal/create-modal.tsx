import { useState, useEffect } from 'react';
import { useFoodMutate } from '../../../hooks/userFoodDataMutate';
import type { FoodData } from '../../../interface/FoodData';
import './create-modal.css';
import toast from 'react-hot-toast';

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: unknown): void,
    type?: string
}

interface CreateModalProps {
    closeModal(): void
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

export function CreateModal({ closeModal }: CreateModalProps) {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const { mutate, isPending, isSuccess } = useFoodMutate();
    
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title || !price || !imageUrl) {
            toast.error('Por favor, preencha todos os campos!');
            return;
        }
        
        const foodData: FoodData = {
            title,
            price: Number(price),
            image: imageUrl
        };
        
        mutate(foodData);
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Item criado com sucesso!');
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
                <h2>Criar Novo Item no Cardápio</h2>
                <form onSubmit={submit}>
                    <Input label="Título" value={title} updateValue={setTitle} />
                    <Input label="Preço" value={price} updateValue={setPrice} type="number" />
                    <Input label="URL da Imagem" value={imageUrl} updateValue={setImageUrl} type="url" />
                    <div className="modal-buttons">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isPending}>
                            {isPending ? 'Criando...' : 'Criar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
