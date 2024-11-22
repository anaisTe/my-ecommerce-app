'use client';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';
import DetalleForm from './DetalleForm';


const CheckoutForm = ({ priceItem, productNameItem }: CheckoutFormProps) => {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cardHolderName, setCardHolderName] = useState<string>(''); // Estado para el nombre del titular

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setError('Stripe.js no está disponible.');
            setLoading(false);
            Swal.fire('Error', 'Stripe.js no está disponible.', 'error');
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) {
            setError('No se pudo obtener el elemento de número de tarjeta.');
            setLoading(false);
            Swal.fire('Error', 'No se pudo obtener el elemento de tarjeta.', 'error');
            return;
        }

        // Crear un método de pago usando los datos de los elementos
        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumberElement,
            billing_details: {
                name: cardHolderName, // Agregar el nombre del titular
            },
        });

        if (stripeError) {
            setError(stripeError.message || 'Error al procesar el pago.');
            setLoading(false);
            Swal.fire('Error', stripeError.message || 'Error al procesar el pago.', 'error');
            return;
        } else {
            console.log('Método de pago creado:', paymentMethod);
            setCardHolderName(''); // Limpia el nombre del titular
            elements.getElement(CardNumberElement)?.clear(); // Limpia el número de tarjeta
            elements.getElement(CardExpiryElement)?.clear(); // Limpia la fecha de expiración
            elements.getElement(CardCvcElement)?.clear(); // Limpia el CVC
            Swal.fire('Pago exitoso!', 'Tu pago ha sido procesado correctamente.', 'success').then(() => {
                router.push('/');
            });
        }

        setLoading(false);

    };

    return (
        <>
            <section className="h-full bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Detalle de pago</h2>

                        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                            <form onSubmit={handleSubmit} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Nombre del titular </label>
                                        <input type="text" id="full_name" onChange={(e) => setCardHolderName(e.target.value)} value={cardHolderName} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Titular de tarjeta" required />
                                    </div>

                                    <div>
                                        <label htmlFor="card-number" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Número de la tarjeta </label>
                                        <div id="card-number"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        >
                                            <CardNumberElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#ffffff',
                                                            '::placeholder': { color: '#a0aec0' },
                                                        },
                                                        invalid: { color: '#fa755a' },
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="card-expiry" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Fecha de expiración </label>
                                        <div id="card-expiry"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                                            <CardExpiryElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#ffffff',
                                                            '::placeholder': { color: '#a0aec0' },
                                                        },
                                                        invalid: { color: '#fa755a' },
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white"> CVV* </label>
                                        <div
                                            id="card-cvc"
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        >
                                            <CardCvcElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#ffffff',
                                                            '::placeholder': { color: '#a0aec0' },
                                                        },
                                                        invalid: { color: '#fa755a' },
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Mensaje de error */}
                                {error && <p className="text-sm text-red-500">{error}</p>}
                                <div className='flex flex-col gap-4'>
                                    <button type="submit" disabled={!stripe || loading} className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">{loading ? 'Procesando...' : 'Pagar'}</button>
                                    <a href="/collection" className="w-full py-2 px-4 bg-transparent text-white text-center font-medium rounded-md shadow-sm border border-gray-600 hover:bg-slate-700 focus:outline-none">Cancelar</a>
                                </div>
                            </form>

                            <DetalleForm priceItem={priceItem} productNameItem={productNameItem} />
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default CheckoutForm;
