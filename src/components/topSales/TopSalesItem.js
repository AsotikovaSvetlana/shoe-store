import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopSalesItem(props) {
  const { id, images, title, price } = props.item;
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/catalog/${id}`);
  } 

  return (
    <div className="col-4">
      <div className="card">
        <div className="images" style={{backgroundImage: `url(${images[0]})`}}></div>
        <div className="card-body">
          <p className="card-text">{title}</p>
          <p className="card-text">{`${price} руб.`}</p>
          <a 
            href="/#" 
            className="btn btn-outline-primary" 
            onClick={handleClick}
          >
            Заказать
          </a>
        </div>
      </div>
    </div>
  )
}
