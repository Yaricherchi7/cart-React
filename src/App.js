import { useState } from "react";
import CartItem from "./CartItem";
import Product from "./Product";

const vouchers = [
  {
    name: "20-PR",
    type: 0, // %
    value: 20,
  },
  {
    name: "50-AM",
    type: 1, // valore
    value: 50,
  },
];

const App = () => {
  const [products] = useState([
    {
      id: 1,
      title: "Crostoli",
      price: 18,
    },
    {
      id: 2,
      title: "Frittelle",
      price: 10,
    },
    {
      id: 3,
      title: "Pizzetta",
      price: 4,
    },

  ]);

  const [cart, setCart] = useState([]);

  const [codeInput,setCodeInput] = useState("")

  const [activeCode, setAtiveCode] = useState(null)

  const onAddToCart = (id) => {
    const product = products.find((product) => product.id === id);
    const itemIndex = cart.findIndex((item) => item.id === id);
    const _cart = [...cart];
    if (itemIndex === -1) {
      product.qnt = 1;
      _cart.push(product);
    } else {
      _cart[itemIndex].qnt += 1;
    }
    setCart(_cart);
  };

  const removeFromCart = (id) => {
    const itemIndex = cart.findIndex((item) => item.id === id);
    let _cart = [...cart];
    if (cart[itemIndex].qnt === 1) {
      _cart = [...cart].filter((item) => item.id !== id);
    } else {
      _cart[itemIndex].qnt -= 1;
    }
    setCart(_cart);
  };

  const calculateTotal = () => {
    const totalPrice = cart.reduce(
      (prev, current) => prev + current.price * current.qnt,
      0
    );
    return totalPrice;
  };

  return (
    <div>
      <div>
        <h2>Carrello</h2>
        <div>
          {cart.length > 0 ? (
            cart.map((cartItem, index) => {
              return (
                <CartItem
                  item={cartItem}
                  key={`item-${index}`}
                  handleClick={removeFromCart}
                />
              );
            })
          ) : (
            <p>Empty cart</p>
          )}
        </div>
        <div>{calculateTotal()}€</div>
      </div>
      <div>
        <h2>Codici sconto</h2>
        <div>
          <input
            name="code"
            type="text"
            placeholder="codice"
          />
          <button>Applica</button>
        </div>
        <div>
          <p>

        </p> 
            <button>Rimuovi codice</button>
        </div>
      </div>
      <div>
        <h2>Prodotti</h2>
        <div>
          {products.map((product, index) => {
            return (
              <Product
                product={product}
                key={`product-${index}`}
                handleClick={onAddToCart}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
