import React from "react";
import CompanyPageBoxes from "../companyUı/companyPageBoxes";
import CompanyEmployeeList from "../companyComponents/CompanyEmployeeList";
import EmployeeBirthdays from "../companyComponents/EmployeeBirthdays";
import EmployeePermissions from "../companyComponents/EmployeePermissions";
import EmployeeDemands from "../companyComponents/EmployeeDemands";
import EmployeeReports from "../companyComponents/EmployeeReports";
import CompanyAnnouncements from "../companyComponents/CompanyAnnouncements";
import CompanyServiceAnnouncements from "../companyComponents/CompanyServiceAnnouncements/CompanyServiceAnnouncements";

const CompanyPage = () => {
  return (
    <div className="grid grid-cols-6 gap-8">
      <CompanyPageBoxes />
      <CompanyEmployeeList />
      <EmployeeBirthdays />
      <EmployeePermissions />
      <EmployeeDemands />
      <EmployeeReports />
      <CompanyAnnouncements />
      <CompanyServiceAnnouncements />
    </div>
  );
};

export default CompanyPage;
