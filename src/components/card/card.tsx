import "./card.css";

interface CardPros {
    title: string;
    price: number;
    image: string;
}

export function Card({ title, price, image }: CardPros) {
    return (
        <div className="card">
            <img src={image} alt={title} />
            <div className="card-content">
                <h2>{title}</h2>
                <p><b>Valor:</b> R${price}</p>
            </div>
        </div>
    );
}