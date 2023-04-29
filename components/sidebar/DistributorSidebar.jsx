import React from "react";

const DistributorSidebar = () => {
  const linkClass = "w-full h-full block";
  return (
    <div className="w-fit">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Logo
          className="mb-10"
          href="#"
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
            <Sidebar.Collapse icon={GrOrganization} label="Organizasyon">
              <Sidebar.Item>
                <Link href="/dashboard/company/list" className={linkClass}>
                  Company List
                </Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link
                  href="/dashboard/company/add-company"
                  className={linkClass}
                >
                  Add Company
                </Link>
              </Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse icon={BsFillPersonFill} label="Personel">
              <Sidebar.Item>
                <Link href="/dashboard" className={linkClass}>
                  Support Employee
                </Link>
              </Sidebar.Item>
              <Sidebar.Item>
                <Link href="/dashboard" className={linkClass}>
                  Add Support Employee
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

export default DistributorSidebar;
