import { useState, useEffect } from 'react';
import './index.css'

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
  const [offset, setOffset] = useState(0);
  const limit = 10; // 設定每頁的項目數
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = Math.ceil(originalProductListData.length / limit);


  useEffect(() => {
    // 產品列表API
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`);
        const data: Product[] = await response.json();

        setOriginalProductListData(data);

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
  }, [offset]);

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

      // 重置為第一頁
      setCurrentPage(1); 

      // 重置 offset 以獲取篩選結果的第一頁
      setOffset(0);
  };

  const handleClear = () => {
    setTitle('');
    setPriceMin('');
    setPriceMax('');
    setCategoryId('');
    setCurrentPage(1);
    setOffset(0);
    setProductList(originalProductListData);
  };

  const handleNextPage = () => {
    setOffset((prevOffset) => {
      const newOffset = prevOffset + limit;
      setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
      return newOffset;
    });
  };

  const handlePrevPage = () => {
    setOffset((prevOffset) => {
      const newOffset = Math.max(0, prevOffset - limit);
      setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
      return newOffset;
    });
  };

  const handlePageClick = (page: number) => {
    setOffset((page - 1) * limit);
    setCurrentPage(page);
  };

  const generatePageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button key={i} onClick={() => handlePageClick(i)} disabled={currentPage === i}>
          {i}
        </button>
      );
    }
    return pageButtons;
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
      <ol>
        {productList.length === 0 ? (
          <li>No products found.</li>
        ) : (
          productList.map((product) => createProductListItem(product))
        )}
      </ol>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={offset === 0}>
          上一頁
        </button>
        {generatePageButtons()}
        <button onClick={handleNextPage} disabled={productList.length < limit}>
          下一頁
        </button>
      </div>
    </div>
  );
}

export default ProductList;