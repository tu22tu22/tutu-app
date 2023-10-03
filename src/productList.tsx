import { useEffect, useState } from 'react';

interface Product {
  id: number;
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data: Product[] = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
              <p>Category: {product.category.name}</p>
              <img src={product.category.image} alt={product.category.name} />
              <div>
                {product.images.map((image, index) => (
                  <img key={index} src={image} alt={`Product Image ${index + 1}`} />
                ))}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ProductList;