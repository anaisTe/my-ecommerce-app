'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/CheckoutForm';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Inicializa Stripe con tu clave pública
const stripePromise = loadStripe('pk_test_51IcrnOBrqiH1c6UnLnO6iAKNukWxYo0tnvh2ush2HPnGAKEkfA7wYqCSYEuZSdaCKgHts5JNTnUR3vkUIUxwd2jK0015sBarJw');

const CheckoutPage = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId'); // ID del producto
    const price = searchParams.get('price'); // Precio del producto
    const title = searchParams.get('title'); // Título del producto

    // Validar que los parámetros existan
    if (!productId || !price || !title) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <p className="text-red-500">No se encontraron detalles del producto. Por favor, regresa y selecciona un producto.</p>
            </div>
        );
    }

    return (
        <Elements stripe={stripePromise}>
            <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="w-full h-full">
                    {/* Pasar los datos del producto a CheckoutForm */}
                    <Suspense fallback={<p>Cargando...</p>}>
                        <CheckoutForm priceItem={price} productNameItem={title} />
                    </Suspense>
                </div>
            </div>
        </Elements>
    );
};

export default CheckoutPage;
