"use client";
import React, { useState } from "react";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

interface UserMenuProps {
    userInitial: string;
    logout: () => void;
}

// Cast components a `any` per evitar errors de tipus
const AnyMenuList = MenuList as unknown as React.FC<any>;
const AnyMenuItem = MenuItem as unknown as React.FC<any>;

const UserMenu: React.FC<UserMenuProps> = ({ userInitial, logout }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { t } = useTranslation("common");
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { key: "profile", label: t("usermenu.profile"), href: "/profile" },
        { key: "history", label: t("usermenu.history"), href: "/history" },
        { key: "favorites", label: t("usermenu.favorites"), href: "/profile/favorites" },
        { key: "subscription", label: t("usermenu.subscription"), href: "/donaciones" },
    ];

    return (
        <Menu open={menuOpen} handler={setMenuOpen} placement="bottom-end">
            <MenuHandler>
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center text-lg font-bold">
                        {userInitial}
                    </div>
                    <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                </div>
            </MenuHandler>

            {/* Ara usem la versió casted */}
            <AnyMenuList className="w-48 bg-white bg-opacity-60 backdrop-blur-lg rounded-lg shadow-lg">
                {menuItems.map(item => {
                    const isActive = pathname === item.href;
                    return (
                        <AnyMenuItem
                            key={item.key}
                            className={`${
                                isActive
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-black"
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
                    className="text-red-600 flex items-center px-4 py-2 rounded-lg"
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
