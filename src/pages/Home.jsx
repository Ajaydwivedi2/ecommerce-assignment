import { useState, useEffect } from "react";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        if (!data) throw Error;
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  //  filter product based on price
  useEffect(() => {
    let filtered = [...products];

    if (minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= parseInt(minPrice, 10)
      );
    }

    if (maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= parseInt(maxPrice, 10)
      );
    }

    setFilteredProducts(filtered);
  }, [maxPrice, minPrice, products]);

  // Function to handle search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter((product) => {
      return product.title.toLowerCase().includes(term);
    });
    setFilteredProducts(filtered);
  };

  return (
    <div className="home-container">
      <nav className="nav">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="filter-bar">
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max price"
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="cart-details">
          <div> Cart Count: {cartCount}, </div>
          <div>Total: ${cartTotal}</div>
        </div>
      </nav>

      <div className="products-container">
        {filteredProducts.length !== 0
          ? filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-details">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price}</p>
                  <button
                    onClick={() => {
                      setCartCount((cartCount) => cartCount + 1);
                      setCartTotal(
                        (cartTotal) => cartTotal + Number(product.price)
                      );
                    }}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Home;
