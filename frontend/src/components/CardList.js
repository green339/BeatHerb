import React, { useState, useEffect } from "react";

const Card = ({ text, onClick }) => (
  <div
    onClick={onClick}
    style={{ border: "1px solid black", margin: "10px", padding: "10px" }}
  >
    {text}
  </div>
);

const CardList = () => {
  const [cards, setCards] = useState(["카드 1"]);
  const [selectedCard, setSelectedCard] = useState(null);

  const addCard = (card) => {
    setCards([...cards, card]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "a" && selectedCard !== null) {
        addCard(selectedCard);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cards, selectedCard]);

    const handleClick = (card) => {
        console.log(selectedCard);
    setSelectedCard(card);
  };

  return (
    <div>
      {cards.map((card, index) => (
        <Card key={index} text={card} onClick={() => handleClick(card)} />
      ))}
    </div>
  );
};

export default CardList;