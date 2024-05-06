"use client"
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { MenuList } from "./navMenu";
import { usePathname, useRouter } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchUserProfile } from "@/redux/features/userProfile/userProfileSlice";
import { useSession, signIn, signOut } from "next-auth/react";

type MenuItem = {
  name: string;
  path: string;
  active: boolean;
};

export default function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const [menu, setMenu] = useState<MenuItem[]>(MenuList);
  const count = useAppSelector((state) => state.counter.value);
  const route = useRouter()
  const {data: session} = useSession()

  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(fetchUserProfile())
  })

  return (
    <Navbar className="bg-orange-300 flex" onMenuOpenChange={setIsMenuOpen}>
      {/* left section */}
      <NavbarContent>
        {/* Menu toggle section */}
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        {/* Brand section */}
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Middle section */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menu.map((item, index) => (
          <NavbarItem
            className="text-slate-950"
            key={index}
            as={Link}
            href={item.path}
            isActive={item.path === pathname}
          >
            {item.name}
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right section */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button onClick={()=>route.push("/cart")} className="bg- mt-4">
              <FaCartShopping size={24} className="text-orange-500" />
              <span className="text-sm font-bold text-orange-800 -mt-4 -ml-2">{count}</span>
          </Button>

          {/* Conditional rendering based on login status */}
          {session ? (
             <Dropdown placement="bottom-end">
             <DropdownTrigger>
               <Avatar  
                 isBordered
                 as="button"
                 className="transition-transform mt-3"
                 color="warning"
                 name="Jason Hughes"
                 size="sm"
                 src={session.user?.image as string}
               />
             </DropdownTrigger>
             <DropdownMenu aria-label="Profile Actions" variant="flat">
               <DropdownItem onClick={()=>signOut()} key="logout" color="danger">
                 Log Out
               </DropdownItem>
             </DropdownMenu>
           </Dropdown>
   
          ) : (
            <NavbarItem>
            <Button as={Link} className="bg-orange-500 text-slate-100 mt-4" href="/login" variant="flat">
              Login
            </Button>
          </NavbarItem>
          )}
        </NavbarItem>
        
      </NavbarContent>

      {/* Hidden menu for small devices */}
      <NavbarMenu className="text-slate-800">
        {menu.map((item, index) => (
          <NavbarItem key={index} as={Link} href={item.path} isActive={item.path === pathname}>
            {item.name}
          </NavbarItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
