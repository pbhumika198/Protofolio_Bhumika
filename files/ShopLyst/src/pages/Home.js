import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";

function Home({ search }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
   fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    setProducts(data.products); // IMPORTANT
    setLoading(false);
  });
      
  }, []);

  const filtered = products.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <div className="products">
        {filtered.map(item => (
          <div className="card" key={item.id}>
    {/* IMAGE */}
    <img src={item.thumbnail} alt={item.title} />

    {/* TITLE */}
    <h4>{item.title}</h4>

    {/* PRICE */}
    <p>₹ {item.price}</p>

    {/* BUTTON */}
    <button onClick={() => addToCart(item)}>
      Add to Cart
    </button>
  </div>
))}
      
      </div>
    </div>
  );
}

export default Home;