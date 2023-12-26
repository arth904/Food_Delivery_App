import React, { useRef, useState, useEffect } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  const options = props.options;
  const priceoptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  const handleAddtoCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch ({type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty})
      }
      return
    }
    else if(food.size !== size)
    {

      await dispatch({
        type: 'ADD',
        id: props.foodItems._id,
        name: props.foodItems.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
      return
    }
    // console.log(data);
    return 
    await dispatch({
      type: 'ADD',
      id: props.foodItems._id,
      name: props.foodItems.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };


  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  useEffect(() => {
    finalPrice = qty * parseInt(options[size]);
  }, [qty, size]);

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ width: '18rem', maxHeight: '360px' }}>
          <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: '120px', objectFit: 'fill' }} />
          <div className="card-body">
            <h5 className="card-title">{props.foodItems.name}</h5>
            <div className="container">
              <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return <option key={i + 1} value={i + 1}> {i + 1} </option>;
                })}
              </select>

              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceoptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>;
                })}
              </select>

              <div className="fs-5 d-inline h-100">Rs{finalPrice}/-</div>
            </div>
            <hr></hr>
            <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddtoCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
