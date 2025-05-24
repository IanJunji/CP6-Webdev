import { Icon } from '@iconify/react/dist/iconify.js';
import { useState, useEffect } from 'react'; 

export default function Card({ id, imgid, isOpen, isMatched, onCardClick }) {
    const [isImageLoaded, setIsImageLoaded] = useState(false); 
    const imageUrl = `https://picsum.photos/id/${imgid}/100/100`;

    
    useEffect(() => {
        setIsImageLoaded(false);
    }, [imgid]);

    
    
    useEffect(() => {
        if (!isOpen) {
            setIsImageLoaded(false);
        }
    }, [isOpen]);

    function handleClick() {
        if (!isOpen && !isMatched) {
            onCardClick(id);
        }
    }

    const cardSize = "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24";

    if (isOpen || isMatched) { 
        return (
            <div
                className={`m-0.5 sm:m-1 p-1 border-2 rounded-md ${cardSize} flex items-center justify-center relative
                            ${isMatched ? 'border-green-400 opacity-70' : 'border-blue-400'}
                            ${isImageLoaded ? 'bg-gray-100' : 'bg-gray-300'}`} 
            >
                <img
                    src={imageUrl}
                    className={`rounded-sm object-cover w-full h-full transition-opacity duration-300 ease-in-out ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    alt="conteúdo da carta"
                    onLoad={() => setIsImageLoaded(true)} 
                    onError={() => {
                        console.error("Falha ao carregar imagem:", imageUrl);
                        setIsImageLoaded(true); 
                    }}
                />
                {/* Indicador de carregamento simples */}
                {!isImageLoaded && isOpen && !isMatched && (
                    <div className="absolute">
                        <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        );
    } else { 
        return (
            <div
                onClick={handleClick}
                className={`m-0.5 sm:m-1 p-1 border-2 border-gray-300 rounded-md bg-gray-200 hover:bg-gray-300
                            ${cardSize} flex items-center justify-center cursor-pointer transition-colors duration-150`}
            >
                <Icon icon="game-icons:card-random" className="text-3xl sm:text-4xl text-gray-500" />
            </div>
        );
    }
}