'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const HomePage = () => {
  const [brands, setBrands] = useState([]);

  // Bearer token for authentication
  const token = 'd72e772490b472e8e5b221feddf2ac7a510a494eb9c4c9eed80fbf760d5073a930234c6595bb9caf1616843feea77265a0957fb4cf38bcfeb2adeda3ed3c635801462f93fde919d40fe7c09ebfc894c8349f34dbc55bae1eb783c83813e22965b1b79de87c78a608a5488435ff360cacbd06e47f81e97e60b4ad53a622eac57e';

  // Fetch brands with logos
  useEffect(() => {
    const fetchBrands = async () => {
      const response = await fetch('http://103.134.154.4:1337/api/storefronts?filters[is_active][$eq]=true&populate=*', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBrands(data.data); // Set the brand data in state
    };

    fetchBrands();
  }, []);

  // Dummy product data for now
  const products = [
    { name: 'Product 1', price: '$10', imageUrl: 'https://place-hold.it/150x150' },
    { name: 'Product 2', price: '$20', imageUrl: 'https://place-hold.it/150x150' },
    { name: 'Product 3', price: '$30', imageUrl: 'https://place-hold.it/150x150' },
    { name: 'Product 4', price: '$40', imageUrl: 'https://place-hold.it/150x150' },
    { name: 'Product 5', price: '$50', imageUrl: 'https://place-hold.it/150x150' },
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Banner Section */}
      <section style={{ width: '100%', height: '300px', marginBottom: '40px', borderRadius: '8px', overflow: 'hidden' }}>
        <Image
          src="https://place-hold.it/1200x300"
          alt="Banner"
          layout="responsive"
          width={1200}
          height={300}
          style={{ objectFit: 'cover' }}
        />
      </section>

      {/* List of Logos Section */}
      <section style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
        {brands.map((brand) => (
          <div
            key={brand.id}
            style={{
              width: '120px',
              height: '120px',
              textAlign: 'center',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              padding: '10px',
              backgroundColor: '#fff',
              marginBottom: '20px',
            }}
          >
            <Image
              src={`http://103.134.154.4:1337${brand.logo.url}`}
              alt={brand.name}
              width={100}
              height={100}
              style={{ borderRadius: '8px', objectFit: 'contain' }}
            />
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{brand.name}</p>
          </div>
        ))}
      </section>

      {/* Brand Section */}
      {brands.map((brand) => (
        <section key={brand.id} style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px', fontWeight: 'bold' }}>{brand.name}</h2>
          <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '20px' }}>
            Type: {brand.type} | Storefront Ref: {brand.storefront_ref}
          </p>
          <div style={{ display: 'flex', gap: '20px', overflowX: 'auto' }}>
            {products.map((product, productIdx) => (
              <div
                key={productIdx}
                style={{
                  width: '220px',
                  textAlign: 'center',
                  padding: '15px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <Image src={product.imageUrl} alt={product.name} width={150} height={150} style={{ borderRadius: '8px' }} />
                <h3 style={{ marginTop: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>{product.name}</h3>
                <p style={{ marginTop: '5px', color: '#888' }}>{product.price}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomePage;
