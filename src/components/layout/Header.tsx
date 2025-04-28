'use client';
import { logoutUser } from '@/actions/auth';
import HeaderSearchBar from '@/components/layout/HeaderSearchBar';
import { User } from '@/generated/prisma/client';
import Link from 'next/dist/client/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaAlignJustify } from "react-icons/fa";
import { FiSearch } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';

const AnnouncementBar = () => {
    return (
        <div className='w-full bg-black py-2'>
            <div className='container mx-auto flex items-center justify-center px-8'>
                <span className='text-center text-sm font-medium tracking-wide text-white '>
                    FREE SHIPPING ON ORDERS OVER $15.00 FREE RETURNS
                </span>
            </div>
        </div>
    )
}
type HeaderProps = {
    user: Omit<User, "passwordHash"> | null;
    categorySelector: React.ReactNode;
}

const Header = ({ user, categorySelector }: HeaderProps) => {
    const router = useRouter();
    const [isopen, setIsOpen] = useState<boolean>(true);
    const [prevScrolly, setPrevScrolly] = useState<number>(0);
    useEffect(() => {
        const handleScroll = () => {
            console.log("ScrollY:", window.scrollY); // Log vị trí cuộn
            const currentScrolly = window.scrollY;
            const scrolledUp = currentScrolly < prevScrolly;
            if (scrolledUp) {
                setIsOpen(true);
            } else if (currentScrolly > 100) {
                setIsOpen(false);
            }
            setPrevScrolly(currentScrolly);
        }
        setPrevScrolly(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [prevScrolly]);
    return (
        // className='w-full sticky top-0 z-50'
        <header className=' w-full sticky top-0 z-50'>
            <div className={`sm:text-xs w-full transition-transform duration-300 ease-in-out ${isopen ? "translate-y-0" : "-translate-y-full"}`}>
                <AnnouncementBar />
                <div className='w-full flex justify-between items-center py-3 sm:py-4 shadow-sm border-b border-gray-100 backdrop-blur-sm'>
                    <div className='flex justify-between items-center container mx-auto px-8'>
                        <div className='flex flex-1 justify-start items-center gap-4 sm:gap-6'>
                            <button className='text-gray-700 hover:text-gray-900 md:hidden'>
                                <FaAlignJustify />
                            </button>
                            <nav className='hidden md:flex gap-4 lg:gap-6 text:sm'>
                                {categorySelector}
                                <Link href='#'>News </Link>
                            </nav>
                        </div>
                        <Link className='hidden sm:block' href={''}>link</Link>
                        <div className='flex flex-1 justify-end items-center gap-2 sm:gap-4 text-sm'>
                            <HeaderSearchBar />

                            {user ? (
                                <div className='flex items-center gap-2 sm:gap-4'>
                                    <span className='text-sm text-gray-700 hidden md:block'>{user.email}</span>
                                    <Link
                                        href='/auth/sign-in'
                                        className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await logoutUser();
                                            router.refresh();
                                        }}
                                    >
                                        Sign Out
                                    </Link>
                                </div>
                            ) : (
                                <React.Fragment>
                                    <Link href='/auth/sign-in' className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>
                                        Sign In
                                    </Link>
                                    <Link href='/auth/sign-up' className='text-xs sm:text-sm font-medium text-gray-700 hover:text-gray-900'>
                                        Sign Up
                                    </Link>
                                </React.Fragment>
                            )}



                            <button className='text-gray-500 hover:text-gray-900 text-xl relative ' >
                                <GiShoppingCart />
                                <span className='absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:h-4 rounded-full flex items-center justify-center'>
                                    0
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header
