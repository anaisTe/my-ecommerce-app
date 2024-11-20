'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Interfaz para tipar los productos
interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const CollectionPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const productsPerPage = 8; // Número de productos por página
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

    // Calcular productos para la página actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Cambiar la página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                            <a key={product.id} href="#" className="group inline-grid p-3">
                                <img
                                    alt={product.title}
                                    src={product.image}
                                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                                />
                                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                                <button type="submit" onClick={() => handleBuy(product)} className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">Comprar</button>
                            </a>
                        ))}
                    </div>

                    {/* Paginación */}
                    <div className="mt-8 flex justify-center">
                        <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
                            >
                                Anterior
                            </button>
                            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${currentPage === index + 1
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
                            >
                                Siguiente
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CollectionPage;
