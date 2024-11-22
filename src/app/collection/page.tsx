'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Pagination from './components/Pagination';
import ProductCard from './components/ProductCard';


const CollectionPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Calcular productos para la página actual
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const productsPerPage = 8; // Número de productos por página
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const router = useRouter();

    // Cargar productos desde la API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error('Error al cargar los productos');
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError('Hubo un problema al cargar los productos.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    // Redirigir a checkout al hacer clic en "Comprar"
    const handleBuy = (product: Product) => {
        router.push(`/checkout?productId=${product.id}&price=${product.price}&title=${encodeURIComponent(product.title)}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold text-gray-700">Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-900">Productos</h2>

                    {/* Productos actuales */}
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 mt-6">
                        {currentProducts.map((product) => (
                            <ProductCard key={product.id} items={product} onBuy={handleBuy} />
                        ))}
                    </div>

                    <Pagination currentPage={currentPage} totalPages={Math.ceil(products.length / productsPerPage)} onPageChange={setCurrentPage} />
                </div>
            </div>
        </>
    );
};

export default CollectionPage;
