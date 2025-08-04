import { useFoodDelete } from '../../../hooks/useFoodDelete';
import toast from 'react-hot-toast';
import './delete-modal.css';

interface DeleteModalProps {
    closeModal(): void,
    foodId: number,
    foodTitle: string
}

export function DeleteModal({ closeModal, foodId, foodTitle }: DeleteModalProps) {
    const { mutate, isPending } = useFoodDelete();
    
    const handleDelete = () => {
        mutate(foodId, {
            onSuccess: () => {
                toast.success('Item excluído com sucesso!');
                closeModal();
            },
            onError: () => {
                toast.error('Erro ao excluir item!');
            }
        });
    }

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="delete-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closeModal} aria-label="Close modal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div className="delete-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                </div>
                
                <h2>Confirmar Exclusão</h2>
                <p>Tem certeza que deseja excluir o item <strong>"{foodTitle}"</strong>?</p>
                <p className="warning">Esta ação não pode ser desfeita.</p>
                
                <div className="modal-buttons">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                        Cancelar
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-danger" 
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? 'Excluindo...' : 'Excluir'}
                    </button>
                </div>
            </div>
        </div>
    );
}
