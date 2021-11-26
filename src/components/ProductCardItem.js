import React from 'react';
import { useSelector } from 'react-redux';

export default function ProductCardItem(props) {
  const { selectedSize, quantity } = useSelector(state => state.productCard);
  const { 
    product: {
      title,
      images,
      sku,
      manufacturer,
      color,
      material,
      season,
      reason,
      sizes
    },
    onChangeSize,
    handleProductAdd,
    handleProductDel,
    addToBasket
   } = props;

  const avalibleSizes = sizes.filter(item => item.avalible);

  return (
    <section className="catalog-item">
      <h2 className="text-center">{title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={images[0]} className="img-fluid" alt={title} />
        </div>
          <div className="col-7">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Артикул</td>
                  <td>{sku}</td>
                </tr>
                <tr>
                  <td>Производитель</td>
                  <td>{manufacturer}</td>
                </tr>
                <tr>
                  <td>Цвет</td>
                  <td>{color}</td>
                </tr>
                <tr>
                  <td>Материалы</td>
                  <td>{material}</td>
                </tr>
                <tr>
                  <td>Сезон</td>
                  <td>{season}</td>
                </tr>
                <tr>
                  <td>Повод</td>
                  <td>{reason}</td>
                </tr>
              </tbody>
            </table>
            {
              avalibleSizes.length !== 0 &&
              <div className="text-center">
                <p>Размеры в наличии:
                  {
                    avalibleSizes.map(item => 
                      <span 
                        className={selectedSize === item.size ? "catalog-item-size selected" : "catalog-item-size"} 
                        key={item.size} 
                        onClick={() => onChangeSize(item.size)}
                      >
                        {item.size}
                      </span>
                    )
                  }
                </p>
                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                    <button className="btn btn-secondary" onClick={handleProductDel}>-</button>
                    <span className="btn btn-outline-primary">{quantity}</span>
                    <button className="btn btn-secondary" onClick={handleProductAdd}>+</button>
                  </span>
                </p>
              </div>
            }
            {
              avalibleSizes.length !== 0 &&
              <button 
                className="btn btn-danger btn-block btn-lg" 
                disabled={!selectedSize} 
                onClick={addToBasket}
              >
                В корзину
              </button>
            }
          </div>
      </div>
    </section>
  )
}
