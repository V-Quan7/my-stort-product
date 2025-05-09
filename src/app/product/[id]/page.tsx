import { Home, ChevronRight } from 'lucide-react';
import SalesCampaignBanner from '@/components/layout/SelesCampaignBenner';
import { getProductById } from '@/sanity/lib/client';
import { promises } from 'dns'
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/product/AddToCartButton';

const ProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const product = await getProductById(id);
    return (
        <div className='bg-gray-50'>
            <SalesCampaignBanner />
            {/* Breadcrumb Navigation */}
            <div className='bg-white border-b border-gray-200'>
                <div className='container mx-auto py-3 px-4'>
                    <div className='flex items-center gap-2 text-sm'>
                        <Link
                            href='/'
                            className='text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1'
                        >
                            <Home className='w-4 h-4' />
                            <span>Home</span>
                        </Link>
                        <ChevronRight className='w-4 h-4 text-gray-400' />
                        <span className='text-gray-400 truncate'>
                            {product.title}
                        </span>
                    </div>
                </div>
            </div>

            <div className='bg-gradient-to-r from-red-500/10 to-red-600/10 py-6 px-4'>
                <div className='container mx-auto'>
                    <h1 className='text-2xl md:text-4xl font-bold text-center text-red-600 mb-3'>
                        🔥 FLASH SALE - 80% OFF 🔥
                    </h1>
                    <div className='flex flex-col items-center gap-2'>
                        <p className='text-center text-red-500 text-sm md:text-base font-semibold animate-pulse'>
                            ⚡️ Only {Math.floor(Math.random() * 10) + 1} items left at this price!
                        </p>
                        <div className='bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm'>
                            ⏰ Offer ends soon!
                        </div>
                    </div>
                </div>
            </div>

            {/* Guarantee Items */}
            <div className='bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 py-4'>
                <div className='container mx-auto'>
                    <div className='flex flex-wrap items-center justify-center gap-6 text-sm'>
                        <div className='flex items-center gap-2'>
                            <span className='text-yellow-600 text-xl'>🚚</span>
                            <span className='font-medium'>Free Express Shipping</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-yellow-600 text-xl'>✨</span>
                            <span className='font-medium'>Satisfaction Guaranteed</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-yellow-600 text-xl'>🔒</span>
                            <span className='font-medium'>Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* product details */}
            <div className='container mx-auto py-4'>
                <div className='flex flex-col md:flex-row gap-8 items-start'>
                    {/* product image */}
                    {product.image && (
                        <div className='w-full md:w-1/3 bg-white rounded-2xl p-4 overflow-hidden shadow-lg'>
                            <div className='relative w-full aspect-square'>
                                <Image
                                    className='object-cover hover:scale-105 transition-transform duration-300'
                                    fill
                                    priority
                                    alt={product.title ?? 'Product Image'}
                                    src={urlFor(product.image).url()}
                                />
                            </div>
                        </div>
                    )}

                    {/* product information */}
                    <div className='flex flex-col gap-4 w-full md:w-2/3'>
                        <h1 className='text-2xl font-semibold'>
                            {product.title}</h1>
                        <p className='text-gray-700 leading-relaxed'>
                            {product.description}</p>
                        {/* price section */}
                        <div className='flex flex-col gap-2 mt-4 '>
                            <div className='flex items-baseline gap-3'>
                                <div className='flex items-baseline gap-1'>
                                    <span className='text-xs font-bold text-red-600'>
                                        US
                                    </span>
                                    <span className='text-5xl font-black text-red-600 tracking-tight '>
                                        {formatPrice(product.price ?? 0)}
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center gap-2 text-gray-600'>
                                <span className='inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                                <span>{Math.floor(Math.random() * 50) + 20} people bought in the last hour</span>
                            </div>
                        </div>
                    </div>
                </div>
                <AddToCartButton product={product} />
            </div>




        </div>



    )
}

export default ProductPage
