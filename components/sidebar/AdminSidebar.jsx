import { Sidebar } from "flowbite-react";
import React from "react";

const Denedene = () => {
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
            <Sidebar.Collapse icon={GrUser} label="Distributor">
              <Sidebar.Item>
                <Link
                  href="/dashboard/distributor/add-distributor"
                  className={linkClass}
                >
                  Add Distributor
                </Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link href="/dashboard/distributor/list" className={linkClass}>
                  Distributor List
                </Link>
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse icon={GrGroup} label="Organization">
              <Sidebar.Item>
                <Link
                  href="/dashboard/company/admin-list"
                  className={linkClass}
                >
                  Company List
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

export default Denedene;
