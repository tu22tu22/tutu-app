import  { useEffect, useState } from 'react';

interface Product {
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    // 获取产品数据并存储在products状态中
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const createProductListItem = (product: Product) => (
    <li key={product.title}>
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <p>Category id: {product.category.id}</p>
      <p>Category name: {product.category.name}</p>
      <img src={product.category.image} alt={product.category.name} />
      <div>
        {product.images.map((image, index) => (
          <img key={index} src={image} alt="Product Image" />
        ))}
      </div>
    </li>
  );

  const filterProducts = () => {
    let filtered = products;

    if (title) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (priceMin) {
      filtered = filtered.filter((product) => product.price >= parseInt(priceMin));
    }

    if (priceMax) {
      filtered = filtered.filter((product) => product.price <= parseInt(priceMax));
    }

    if (categoryId) {
      filtered = filtered.filter((product) => product.category.id === parseInt(categoryId));
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setTitle('');
    setPriceMin('');
    setPriceMax('');
    setCategoryId('');
    setFilteredProducts([]);
  };

  return (
    <div className='productList'>
      <h2>Product Filter</h2>
      <label htmlFor="title">Filter by Title:</label>
      <input
        type="text"
        id="title"
        placeholder="Enter product title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="priceMin">Price Min:</label>
      <input
        type="number"
        id="priceMin"
        placeholder="Enter min price"
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
      />
      <label htmlFor="priceMax">Price Max:</label>
      <input
        type="number"
        id="priceMax"
        placeholder="Enter max price"
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
      />
      <label htmlFor="categoryId">Category ID:</label>
      <input
        type="number"
        id="categoryId"
        placeholder="Enter category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      />
      <button onClick={filterProducts}>Filter by All Conditions</button>
      <button onClick={clearFilters}>Clear Filter</button>
      <ul>
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => createProductListItem(product))
          : products.map((product) => createProductListItem(product))}
      </ul>
    </div>
  );
}

export default ProductList;
