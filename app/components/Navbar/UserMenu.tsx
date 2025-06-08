"use client";
import React, { useState } from "react";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Switch as MTWSwitch,
    Tooltip,
} from "@material-tailwind/react";
import { ChevronDownIcon, StarIcon  } from "@heroicons/react/24/solid";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/app/components/AuthContext"; // Ajusta la ruta si cal


// Cast components a `any` per evitar errors de tipus
const AnyMenuList = MenuList as unknown as React.FC<any>;
const AnyMenuItem = MenuItem as unknown as React.FC<any>;
const AnySwitch = MTWSwitch as unknown as React.FC<any>;  // <-- aquí
const AnyTooltip = Tooltip as unknown as React.FC<any>;
const UserMenu: React.FC = () => {
    const { userInitial, logout, subscription } = useAuth(); // [CANVI] Obtenim 'subscription' del context
    const [menuOpen, setMenuOpen] = useState(false);
    const { t } = useTranslation("common");
    const router = useRouter();
    const pathname = usePathname();

    const subscriptionBadge = subscription?.plan_name ? {
        text: subscription.plan_name.split(' ')[1] || 'Plan', // Ex: "Fan", "Pro"
        color: subscription.plan_name.toLowerCase().includes('founder') ? 'bg-yellow-500' :
            subscription.plan_name.toLowerCase().includes('fan') ? 'bg-blue-500' :
                'bg-green-500', // Color per defecte per a 'Supporter'
        tooltip: `Pla Actiu: ${subscription.plan_name}`
    } : null;

    // useTheme de next-themes per gestionar mode clar/fosc
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <Menu open={menuOpen} handler={setMenuOpen} placement="bottom-end">
            <MenuHandler>
                <div className="flex items-center gap-2 cursor-pointer">
                    {subscriptionBadge && (
                        <AnyTooltip
                            content={subscriptionBadge.tooltip}
                            placement="bottom"
                            className="bg-gray-900 text-white px-2 py-1 rounded-md text-xs"
                        >
                            <div className={`
                                flex items-center justify-center px-2 h-6 rounded-full text-xs font-bold text-white
                                ${subscriptionBadge.color}
                            `}>
                                <StarIcon className="h-3 w-3 mr-1" />
                                {subscriptionBadge.text}
                            </div>
                        </AnyTooltip>
                    )}
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center text-lg font-bold dark:bg-gray-700 dark:text-white">
                        {userInitial}
                    </div>
                    <ChevronDownIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </div>
            </MenuHandler>

            <AnyMenuList className="w-48 bg-white bg-opacity-60 backdrop-blur-lg rounded-lg shadow-lg dark:bg-gray-800 dark:bg-opacity-60">
                {/* Switch per canviar tema amb icones */}
                <div className="flex items-center justify-center space-x-2 px-4 py-2">
                    <SunIcon className="w-5 h-5 text-yellow-500 dark:text-gray-500" />
                    <AnySwitch
                        checked={resolvedTheme === "dark"}
                        onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    />
                    <MoonIcon className="w-5 h-5 text-gray-700 dark:text-yellow-300" />
                </div>

                <hr className="border-gray-200 dark:border-gray-700 my-1" />

                {[
                    { key: "profile", label: t("usermenu.profile"), href: "/profile" },
                    { key: "history", label: t("usermenu.history"), href: "/history" },
                    { key: "favorites", label: t("usermenu.favorites"), href: "/profile/favorites" },
                    { key: "subscription", label: t("usermenu.subscription"), href: "/subscription-plans" },
                ].map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <AnyMenuItem
                            key={item.key}
                            className={`${isActive
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                : "text-black dark:text-white"
                            } flex items-center px-4 py-2 rounded-lg`}
                            onClick={() => {
                                setMenuOpen(false);
                                router.push(item.href);
                            }}
                        >
                            {item.label}
                        </AnyMenuItem>
                    );
                })}

                <AnyMenuItem
                    className="text-red-600 dark:text-red-400 flex items-center px-4 py-2 rounded-lg"
                    onClick={() => {
                        setMenuOpen(false);
                        logout();
                        router.push("/");
                    }}
                >
                    {t("usermenu.logout")}
                </AnyMenuItem>
            </AnyMenuList>
        </Menu>
    );
};

export default UserMenu;
