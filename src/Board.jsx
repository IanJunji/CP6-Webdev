import { useEffect, useState } from "react";
import Card from "./Card";

const TOTAL_CARDS = 16;

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export default function Board() {
    const [cards, setCards] = useState([]);
    const [selectedCardIndexes, setSelectedCardIndexes] = useState([]);
    const [attempts, setAttempts] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    function buildCards() {
        let vetCards = [];
        const usedImgIds = new Set();
        for (let i = 0; i < TOTAL_CARDS / 2; i++) {
            let imgid;
            do {
                imgid = parseInt(Math.random() * 200) + 1; 
            } while (usedImgIds.has(imgid));
            usedImgIds.add(imgid);
            
            vetCards.push({ id: i * 2,     imgid, isOpen: true, isMatched: false });
            vetCards.push({ id: (i * 2) + 1, imgid, isOpen: true, isMatched: false });
        }
        
        const shuffledCards = shuffleArray(vetCards).map((card, index) => ({ ...card, id: index }));

        setCards(shuffledCards);
        setAttempts(0);
        setSelectedCardIndexes([]);
        setIsChecking(false);
        setGameOver(false);

        setTimeout(() => {
            setCards(prevCards => prevCards.map(card => ({ ...card, isOpen: false })));
        }, 3000); 
    }

    useEffect(() => {
        buildCards();
    }, []);

    useEffect(() => {
        if (selectedCardIndexes.length === 2) {
            setIsChecking(true);
            setAttempts(prev => prev + 1);

            const [firstIndex, secondIndex] = selectedCardIndexes;
            const card1 = cards[firstIndex];
            const card2 = cards[secondIndex];

            if (card1.imgid === card2.imgid) {
                setCards(prevCards =>
                    prevCards.map(card =>
                        card.id === card1.id || card.id === card2.id
                            ? { ...card, isMatched: true, isOpen: true }
                            : card
                    )
                );
                setSelectedCardIndexes([]);
                setIsChecking(false);
            } else {
                setTimeout(() => {
                    setCards(prevCards =>
                        prevCards.map(card =>
                            card.id === card1.id || card.id === card2.id
                                ? { ...card, isOpen: false }
                                : card
                        )
                    );
                    setSelectedCardIndexes([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    }, [selectedCardIndexes, cards]);

    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.isMatched)) {
            setGameOver(true);
        }
    }, [cards]);

    function handleCardClick(clickedCardId) {
        if (isChecking || selectedCardIndexes.length === 2) return;

        const clickedCard = cards.find(card => card.id === clickedCardId);
        if (!clickedCard || clickedCard.isOpen || clickedCard.isMatched) return;

        setCards(prevCards =>
            prevCards.map(card =>
                card.id === clickedCardId ? { ...card, isOpen: true } : card
            )
        );
        setSelectedCardIndexes(prev => [...prev, clickedCardId]);
    }

    return (
        <>
            <div className="m-2 border border-gray-300 bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                    <span className="text-lg text-gray-700">Tentativas:</span>
                    <span className="ml-2 text-2xl font-bold text-blue-600">
                        {attempts}
                    </span>
                </div>
                
                {gameOver && (
                    <div className="my-6 text-center">
                        <p className="text-2xl font-bold text-green-600 mb-3">Parabéns, você venceu!</p>
                        <button
                            onClick={buildCards}
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Jogar Novamente
                        </button>
                    </div>
                )}

                <div className={`grid grid-cols-4 gap-2 sm:gap-3 ${gameOver ? 'opacity-50 pointer-events-none' : ''}`}>
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            id={card.id}
                            imgid={card.imgid}
                            isOpen={card.isOpen}
                            isMatched={card.isMatched}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}