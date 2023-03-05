import classNames from "classnames";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
} from "./icons";
import { GrOrganization,GrUser,GrHome,GrLogout } from 'react-icons/gr';
import { FiArrowLeft } from 'react-icons/fi';
import { BiDownArrow } from 'react-icons/bi';


const menuItems = [
  { label: "Home", icon: GrHome, link: "/dashboard" },
  {
    label: "Distributor",
    icon: GrUser,
    subMenus: [
      {
        title: "Distributor Ekle",
        src: "/dashboard/distributor/add-distributor",

        cName: "sub-nav",
      },
      {
        title: "Distributor List",
        src: "/dashboard/distributor/list",

        cName: "sub-nav",
      },
    ],
    link: "/dashboard",
  },
  {
    label: "Organizasyon",
    icon: GrOrganization,
    subMenus: [
      {
        title: "Sirket Listesi",
        src: "/dashboard/company-list",

        cName: "sub-nav",
      },
    ],
    link: "/dashboard",
  },
];

const SideBar = () => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col drop-shadow-lg",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap"
      // {
      //   ["bg-light-lighter"]: activeMenu.id === menu.id,
      // }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
    setSubMenuOpen(false);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          {/* <div className="flex items-center pl-1 gap-4">
            <LogoIcon />
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              ByteBenders
            </span>
          </div> */}
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <FiArrowLeft />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-8">
          {menuItems.map(({ icon: Icon, ...menu },id) => {
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes} key={id} >
                <ul className="pt-6">
                  <>
                    <li
                      className={`flex  rounded-md p-2 cursor-pointer hover:bg-teal-400  text-sm items-center gap-x-4 
              ${menu.gap ? "mt-9" : "mt-2"}  `}
                    >
                      <Icon />
                      {menu.subMenus ? (
                        <span className="flex-1">{menu.label}</span>
                      ) : (
                        <Link href={menu.link}>{menu.label}</Link>
                      )}
                      {menu.subMenus && (
                        <BiDownArrow
                          onClick={() => setSubMenuOpen(!subMenuOpen)}
                          className={`${subMenuOpen && "rotate-90"}`}
                        />
                      )}
                    </li>
                    {menu.subMenus && subMenuOpen && open && (
                      <ul>
                        {menu.subMenus.map((subMenuItem, idx) => (
                          <li
                            key={idx}
                            className="flex px-10 cursor-pointer text-center text-sm text-black-100 py-1"
                          >
                            <Link href={subMenuItem.src}>
                              {subMenuItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <button
        className={`${getNavItemClasses({})} px-3 py-4`}
        onClick={() => {
          signOut({
            callbackUrl: "/",
          });
        }}
      >
        <div style={{ width: "2.5rem" }}>
          <GrLogout />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-text-light")}>
            Logout
          </span>
        )}
      </button>
    </div>
  );
};

export default SideBar;
