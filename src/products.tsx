import { useState, useEffect } from 'react';

interface Product {
  title: string;
  id: number;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}

function createProductListItem(product: Product) {
  return (
    <li key={product.id}>
      <h3>{product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <p>Category ID: {product.category.id}</p>
      <p>Category name: {product.category.name}</p>
      <img src={product.category.image} alt={product.category.name} />
      {/* <div>
        {product.images.map((image, index) => (
          <img key={index} src={image} alt="Product Image" />
        ))}
      </div> */}
    </li>
  );
}

function ProductList() {
  const [originalProductListData, setOriginalProductListData] = useState<Product[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [title, setTitle] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [defaultMinPrice, setDefaultMinPrice] = useState<number | undefined>(undefined);
  const [defaultMaxPrice, setDefaultMaxPrice] = useState<number | undefined>(undefined);


  useEffect(() => {
    // 產品列表API
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const data: Product[] = await response.json();

        setOriginalProductListData(data);

        //將API內的價格最大值與最小值，預設顯示在input
        // const defaultMinPrice = Math.min(...data.map((product) => product.price));
        // const defaultMaxPrice = Math.max(...data.map((product) => product.price));
        // setPriceMin(defaultMinPrice.toString());
        // setPriceMax(defaultMaxPrice.toString());

        const minPrice = Math.min(...data.map((product) => product.price));
        const maxPrice = Math.max(...data.map((product) => product.price));

        setDefaultMinPrice(minPrice);
        setDefaultMaxPrice(maxPrice);

        setProductList(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = () => {
    const titleValue = title.trim();
    const priceMinValue = priceMin.trim() || (defaultMinPrice !== undefined ? defaultMinPrice.toString() : '');
    const priceMaxValue = priceMax.trim() || (defaultMaxPrice !== undefined ? defaultMaxPrice.toString() : '');
    const categoryIdValue = categoryId.trim();

    // 建構合併篩選條件的API請求
    let apiUrl = 'https://api.escuelajs.co/api/v1/products/?';

    if (titleValue) {
      apiUrl += `title=${titleValue}&`;
    }

    if (priceMinValue) {
      apiUrl += `price_min=${priceMinValue}&`;
    } 

    if (priceMaxValue) {
      apiUrl += `price_max=${priceMaxValue}&`;
    }

    if (categoryIdValue) {
      apiUrl += `categoryId=${categoryIdValue}&`;
    }

    // 移除最後一個 '&' 字符
    apiUrl = apiUrl.slice(0, -1);

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data: Product[]) => {
        if (data.length === 0) {
          setProductList([]);
        } else {
          setProductList(data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setProductList([]);
      });
  };

  const handleClear = () => {
    setTitle('');
    setPriceMin('');
    setPriceMax('');
    setCategoryId('');
    setProductList(originalProductListData);
  };

  return (
    <div className='productList'>
      <h2>Product Filter</h2>
      <label htmlFor="title">Title:</label>
      <input
      id='title'
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="priceMin">Price Min:</label>
      <input
      id='priceMin'
        type="number"
        placeholder="Price Min"
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
      />
      <label htmlFor="priceMax">Price Max:</label>
      <input
      id='priceMax'
        type="number"
        placeholder="Price Max"
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
      />
      <label htmlFor="categoryId">Category ID:</label>
      <input
      id='categoryId'
        type="number"
        placeholder="Category ID"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
      <button onClick={handleClear}>Clear</button>
      <ul>
        {productList.length === 0 ? (
          <li>No products found.</li>
        ) : (
          productList.map((product) => createProductListItem(product))
        )}
      </ul>
    </div>
  );
}

export default ProductList;
