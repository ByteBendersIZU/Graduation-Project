// import React, { useState, useEffect } from "react";
// import classNames from "classnames";
// import jwt_decode from "jwt-decode";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { signOut, useSession } from "next-auth/react";

// //ICONS
// import { GrLogout } from "react-icons/gr";
// import { FiArrowLeft } from "react-icons/fi";
// import { BiDownArrow } from "react-icons/bi";
// //HELPERS
// import {
//   adminMenuItems,
//   companyMenuItems,
//   distributorMenuItems,
// } from "../helpers/SideLinks";

// const SideBar = () => {
//   const [subMenuOpen, setSubMenuOpen] = useState(false);
//   const [toggleCollapse, setToggleCollapse] = useState(false);
//   const [isCollapsible, setIsCollapsible] = useState(false);
//   const session = useSession();
//   const [menuItems, setMenuItems] = useState();
//   const user = jwt_decode(session.data.session.user.jwt);
//   useEffect(() => {
//     if (user.role === "ROLE_SUPER_ADMIN") {
//       setMenuItems(adminMenuItems);
//     } else if (user.role === "ROLE_DISTRIBUTOR") {
//       setMenuItems(distributorMenuItems);
//     } else if (user.role === "ROLE_COMPANY_ADMIN") {
//       setMenuItems(companyMenuItems);
//     }
//   }, []);
//   const router = useRouter();

//   // const activeMenu = useMemo(
//   //   () => menuItems.find((menu) => menu.link === router.pathname),
//   //   [router.pathname]
//   // );

//   const wrapperClasses = classNames(
//     "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col drop-shadow-lg",
//     {
//       ["w-72"]: !toggleCollapse,
//       ["w-20"]: toggleCollapse,
//     }
//   );

//   const collapseIconClasses = classNames(
//     "p-4 rounded bg-light-lighter absolute right-0",
//     {
//       "rotate-180": toggleCollapse,
//     }
//   );

//   const getNavItemClasses = (menu) => {
//     return classNames(
//       "flex justify-between items-center w-full overflow-hidden "
//     );
//   };

//   const onMouseOver = () => {
//     setIsCollapsible(!isCollapsible);
//   };

//   const handleSidebarToggle = () => {
//     setToggleCollapse(!toggleCollapse);
//     setSubMenuOpen(false);
//   };

//   return (
//     menuItems && (
//       <div
//         className={wrapperClasses}
//         onMouseEnter={onMouseOver}
//         onMouseLeave={onMouseOver}
//         style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
//       >
//         <div className="flex flex-col">
//           <div className="flex items-center justify-between relative">
//             {/* <div className="flex items-center pl-1 gap-4">
//             <LogoIcon />
//             <span
//               className={classNames("mt-2 text-lg font-medium text-text", {
//                 hidden: toggleCollapse,
//               })}
//             >
//               ByteBenders
//             </span>
//           </div> */}
//             {isCollapsible && (
//               <button
//                 className={collapseIconClasses}
//                 onClick={handleSidebarToggle}
//               >
//                 <FiArrowLeft />
//               </button>
//             )}
//           </div>

//           <div className="flex flex-col items-start mt-8">
//             {menuItems.map(({ icon: Icon, ...menu }) => {
//               const classes = getNavItemClasses(menu);
//               return (
//                 <div className={classes} key={menu.id}>
//                   <ul className="">
//                     <>
//                       <li
//                         onClick={() => setSubMenuOpen(!subMenuOpen)}
//                         className={`flex mt-2 rounded-md p-2 cursor-pointer hover:bg-teal-400  text-sm items-center gap-x-4 font-semibold dark:text-gray-500`}
//                       >
//                         <Icon className="text-2xl" />
//                         {menu.subMenus ? (
//                           <span className="flex-1">{menu.label}</span>
//                         ) : (
//                           <Link href={menu.link}>{menu.label}</Link>
//                         )}
//                         {menu.subMenus && (
//                           <BiDownArrow
//                             className={` ${subMenuOpen && "rotate-90"}`}
//                           />
//                         )}
//                       </li>
//                       {menu.subMenus && subMenuOpen && open && (
//                         <ul>
//                           {menu.subMenus.map((subMenuItem, idx) => (
//                             <li
//                               key={idx}
//                               className="flex px-10 mt-2 cursor-pointer text-center text-sm text-black-100 py-1"
//                             >
//                               <Link href={subMenuItem.src}>
//                                 {subMenuItem.title}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </>
//                   </ul>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <button
//           className={`${getNavItemClasses({})} px-3 py-4`}
//           onClick={() => {
//             signOut({
//               callbackUrl: "/",
//             });
//           }}
//         >
//           <div style={{ width: "2.5rem" }}>
//             <GrLogout />
//           </div>
//           {!toggleCollapse && (
//             <span className={classNames("text-md font-medium text-text-light")}>
//               Logout
//             </span>
//           )}
//         </button>
//       </div>
//     )
//   );
// };

// export default SideBar;
