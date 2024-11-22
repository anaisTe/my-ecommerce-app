import React from 'react'

const DetalleForm = ({ priceItem, productNameItem }: CheckoutFormProps) => {
    return (
        <>
            <div className="mt-6 grow sm:mt-8 lg:mt-0">
                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-2">
                        <dl className="flex items-left justify-between gap-4 flex-col">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Producto</dt>
                            <dd className="text-base font-medium text-green-500">{productNameItem}</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">${priceItem}</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                            <dd className="text-base font-medium text-green-500">-$0</dd>
                        </dl>

                        <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                            <dd className="text-base font-medium text-gray-900 dark:text-white">$0</dd>
                        </dl>
                    </div>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                        <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                        <dd className="text-base font-bold text-gray-900 dark:text-white">${priceItem}</dd>
                    </dl>
                </div>


            </div>
        </>
    )
}

export default DetalleForm