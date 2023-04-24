import { BsFillPersonFill, BsFillPersonCheckFill } from "react-icons/bs";
import { GrOrganization, GrUser, GrHome } from "react-icons/gr";

export const companyMenuItems = [
  { id: 1, label: "Home", icon: GrHome, link: "/dashboard" },
  {
    id: 2,
    label: "Organizasyon",
    icon: GrOrganization,
    subMenus: [
      {
        title: "Manage Permission",
        src: "/dashboard/organization/branch-list",

        cName: "sub-nav",
      },
      {
        title: "Branch List",
        src: "/dashboard/organization/branch-list",

        cName: "sub-nav",
      },
      {
        title: "Department List",
        src: "/dashboard/organization/department-list",

        cName: "sub-nav",
      },
      {
        title: "Position List",
        src: "/dashboard/organization/branch-list",

        cName: "sub-nav",
      },
      {
        title: "Customers",
        src: "/dashboard/organization/branch-list",

        cName: "sub-nav",
      },
    ],
    link: "/dashboard",
  },
  {
    id: 3,
    label: "Staff",
    icon: BsFillPersonFill,
    subMenus: [
      {
        title: "Manage Permission",
        src: "/dashboard/organization/branch-list",

        cName: "sub-nav",
      },
      {
        title: "Branch List",
        src: "/dashboard/organization/branch-list",

        cName: "sub-nav",
      },
    ],
    link: "/dashboard",
  },
];
export const distributorMenuItems = [
  { id: 1, label: "Home", icon: GrHome, link: "/dashboard" },
  {
    id: 2,
    label: "Organizasyon",
    icon: GrOrganization,
    subMenus: [
      {
        title: "Company List",
        src: "/dashboard/company/list",

        cName: "sub-nav",
      },
      {
        title: "Add Company",
        src: "/dashboard/company/add-company",

        cName: "sub-nav",
      },
    ],
    link: "/dashboard",
  },
  {
    id: 3,
    label: "Personel",
    icon: BsFillPersonFill,
    subMenus: [
      {
        title: "Support Employee",
        src: "/dashboard",

        cName: "sub-nav",
      },
      {
        title: "Add Support Employee",
        src: "/dashboard",

        cName: "sub-nav",
      },
    ],
    link: "/dashboard",
  },
  {
    id: 4,
    label: "Support",
    icon: BsFillPersonCheckFill,
    subMenus: [
      {
        title: "Support Request List",
        src: "/dashboard",

        cName: "sub-nav",
      },
      {
        title: "Create Support Request",
        src: "/dashboard",

        cName: "sub-nav",
      },
    ],
    link: "/dashboard",
  },
];
export const adminMenuItems = [
  { id: 1, label: "Home", icon: GrHome, link: "/dashboard" },
  {
    id: 2,
    label: "Distributor",
    icon: GrUser,
    subMenus: [
      {
        title: "Add Distributor",
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
    id: 3,
    label: "Organization",
    icon: BsFillPersonFill,
    subMenus: [
      {
        title: "Company List",
        src: "/dashboard/company/admin-list",

        cName: "sub-nav",
      },
    ],
    link: "/dashboard",
  },
];
