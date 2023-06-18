import React, { useEffect } from "react";
import CompanyPageBoxes from "../companyUı/companyPageBoxes";
import CompanyEmployeeList from "../companyComponents/CompanyEmployeeList";
import EmployeeBirthdays from "../companyComponents/EmployeeBirthdays";
import EmployeePermissions from "../companyComponents/EmployeePermissions";
import EmployeeDemands from "../companyComponents/EmployeeDemands";
import EmployeeReports from "../companyComponents/EmployeeReports";
import CompanyAnnouncements from "../companyComponents/CompanyAnnouncements";
import CompanyServiceAnnouncements from "../companyComponents/CompanyServiceAnnouncements/CompanyServiceAnnouncements";
import { fetchMe } from "../../redux/services/HelperService";
import { fetchEmployeeList } from "../../redux/services/CompanyEmployeeService";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeList } from "../../redux/slices/CompanyEmployeeSlice";

const CompanyPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmployeeList());
  }, []);
  const getEmployees = useSelector(getEmployeeList);
  return (
    <div className="grid grid-cols-6 gap-8">
      <CompanyPageBoxes />
      <CompanyEmployeeList getEmployees={getEmployees} />
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
