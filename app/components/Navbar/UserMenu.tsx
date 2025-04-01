"use client";
import React, { useState } from "react";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useTranslation } from "react-i18next";


interface UserMenuProps {
    userInitial: string;
    logout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ userInitial, logout }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { t } = useTranslation('common');


    return (
        <Menu open={menuOpen} handler={setMenuOpen}>
            <MenuHandler>
                {/* Mostrem la icona d'usuari i la fletxa */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center text-lg font-bold">
                        {userInitial}
                    </div>
                    <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                </div>
            </MenuHandler>
            {/* Menú desplegable amb les opcions */}
            <MenuList className="w-48 bg-white bg-opacity-60 backdrop-blur-lg rounded-lg shadow-lg" {...({} as any)}>
                <MenuItem {...({} as any)}>
                    <Link href="/profile" passHref>
                    <button className="w-full text-left text-black" >
                        {t("usermenu.profile")}
                    </button>
                    </Link>
                </MenuItem>

                <MenuItem {...({} as any)}>
                    <Link href="/history" passHref>
                        <button className="w-full text-left text-black" >
                            {t("usermenu.history")}
                        </button>
                    </Link>
                </MenuItem>

                <MenuItem {...({} as any)}>
                    <Link href="/profile/favorites" passHref>
                        <button className="w-full text-left text-black" >
                            {t("usermenu.favorites")}
                        </button>
                    </Link>
                </MenuItem>
                {/*
                <MenuItem {...({} as any)}>
                    <Link href="/maintenance" passHref>
                        <button className="w-full text-left text-black" >
                            {t("usermenu.armario")}
                        </button>
                    </Link>
                </MenuItem>*/}
                <MenuItem {...({} as any)}>
                    <Link href="/donaciones" passHref>
                        <button className="w-full text-left text-black" >
                            {t("usermenu.subscription")}
                        </button>
                    </Link>
                </MenuItem>
                <MenuItem {...({} as any)}>
                    <Link href="/" passHref>
                        <button className="w-full text-left text-black" onClick={logout}>
                            {t("usermenu.logout")}
                        </button>
                    </Link>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default UserMenu;
