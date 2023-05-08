import { Sidebar } from "flowbite-react";

import React from "react";
import Link from "next/link";
import {
  GrGroup,
  GrHome,
  GrLogout,
  GrOrganization,
  GrUser,
} from "react-icons/gr";
import { signOut } from "next-auth/react";
import { BsFillPersonFill } from "react-icons/bs";
const CompanySidebar = () => {
  const linkClass = "w-full h-full block";
  return (
    <div className="w-fit">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Logo
          className="mb-10"
          href="/dashboard"
          img="https://png.pngtree.com/png-clipart/20201208/original/pngtree-red-and-black-logo-png-image_5517319.jpg"
          imgAlt="Flowbite logo"
        >
          HrConnect
        </Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={GrHome}>
              <Link href="/dashboard" className={linkClass}>
                Home
              </Link>
            </Sidebar.Item>
            <Sidebar.Collapse icon={GrOrganization} label="Organizationn">
              <Sidebar.Item>
                <Link href="/dashboard" className={linkClass}>
                  Manage Permission
                </Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link
                  href="/dashboard/organization/branch-list"
                  className={linkClass}
                >
                  Branch List
                </Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link
                  href="/dashboard/organization/department-list"
                  className={linkClass}
                >
                  Department List
                </Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link
                  href="/dashboard/organization/position-list"
                  className={linkClass}
                >
                  Position List
                </Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link
                  href="/dashboard/organization/customer-list"
                  className={linkClass}
                >
                  Customers
                </Link>
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse icon={BsFillPersonFill} label="Staff">
              <Sidebar.Item>
                <Link href="/dashboard" className={linkClass}>
                  Manage Permission
                </Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link href="/dashboard" className={linkClass}>
                  Branch List
                </Link>
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse icon={BsFillPersonFill} label="Inventory">
              <Sidebar.Item>
                <Link
                  href="/dashboard"
                  className={linkClass}
                >
                  Inventory Permission
                </Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link
                  href="/dashboard/inventory/list-inventory-type"
                  className={linkClass}
                >
                  Inventory Type List
                </Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link href="/dashboard/inventory/list" className={linkClass}>
                  Inventory List
                </Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link href="/dashboard/inventory/user-appointment-list" className={linkClass}>
                  Inventory Assignments
                </Link>
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Item icon={GrLogout}>
              <button
                onClick={() => {
                  signOut({
                    callbackUrl: "/",
                  });
                }}
              >
                Logout
              </button>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default CompanySidebar;
