'use client';

import { NAV_ORDER } from "@/constants/common";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const SidebarOrder = () => {
    const pathname = usePathname();
    const currentPath = useMemo(() => pathname, [pathname]);

    return (
        <div className="w-full flex flex-row gap-2.5 flex-nowrap whitespace-nowrap overflow-y-hidden overflow-x-scroll sm:flex-wrap sm:items-center sm:justify-center py-10">
            {NAV_ORDER.map((route) => (
                <div key={route.title} className={currentPath === route.href ? 'underline text-primary' : ''}>
                    <div className="p-1 sm:p-5">
                        <Link href={route.href}>
                            <span className="font-bold text-sm sm:text-base hover:text-primary">
                                {route.title}
                            </span>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SidebarOrder;
