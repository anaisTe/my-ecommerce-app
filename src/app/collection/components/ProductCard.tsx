import React from 'react'

const ProductCard = ({ items, onBuy }: productCardProps) => {
    return (
        <>
            <a key={items.id} href="#" className="group inline-grid p-3">
                <img
                    alt={items.title}
                    src={items.image}
                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                />
                <h3 className="mt-4 text-sm text-gray-700">{items.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">${items.price}</p>
                <button type="submit" onClick={() => onBuy(items)} className="w-full mt-auto py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 h-10">Comprar</button>
            </a>
        </>
    )
}

export default ProductCard