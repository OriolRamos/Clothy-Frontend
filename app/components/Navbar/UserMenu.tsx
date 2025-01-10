"use client";
import React, { useState } from "react";
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface UserMenuProps {
    userInitial: string;
    logout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ userInitial, logout }) => {
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <Menu open={menuOpen} handler={setMenuOpen}>
            <MenuHandler>
                {/* Mostrem la icona d'usuari i la fletxa */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                        {userInitial}
                    </div>
                    <ChevronDownIcon className="h-4 w-4 text-gray-600" />
                </div>
            </MenuHandler>

            {/* Menú desplegable amb les opcions */}
            <MenuList className="w-48">
                <MenuItem>
                    <Link href="/maintenance" passHref>
                    <button className="w-full text-left" >
                        Perfil
                    </button>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/maintenance" passHref>
                        <button className="w-full text-left" >
                            Historial
                        </button>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/maintenance" passHref>
                        <button className="w-full text-left" >
                            Favoritos
                        </button>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/maintenance" passHref>
                        <button className="w-full text-left" >
                            Mi armario
                        </button>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link href="/maintenance" passHref>
                        <button className="w-full text-left" >
                            Suscripción
                        </button>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <button className="w-full text-left" onClick={logout}>
                        Logout
                    </button>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default UserMenu;
