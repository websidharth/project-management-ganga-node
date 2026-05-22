import { IAccountService } from "./Iaccount.service";
import { IUserService } from "./Iuser.service";
import { ICategoryService } from "./Icategory.service";
import { IProductService } from "./Iproduct.service";
import { IProductVariantService } from "./Iproduct-variant.service";
import { IAttributeService } from "./Iattribute.service";
import { IProductAttributeService } from "./Iproduct-attribute.service";
import { IStaffAttendanceService } from "./Istaff-attendance.service";
import { IOrderService } from "./Iorder.service";
import { IOrderItemService } from "./Iorder-item.service";
import { IPaymentService } from "./Ipayment.service";
import { IStaffSalaryService } from "./Istaff-salary.service";
import { IDashboardService } from "./Idashboard.service";
import { IBrandNameService } from "./Ibrand-name.service";

export default interface IUnitOfService {
  User: IUserService;
  Account: IAccountService;
  Category: ICategoryService;
  Product: IProductService;
  ProductVariant: IProductVariantService;
  Attribute: IAttributeService;
  ProductAttribute: IProductAttributeService;
  StaffAttendance: IStaffAttendanceService;
  Order: IOrderService;
  OrderItem: IOrderItemService;
  Payment: IPaymentService;
  StaffSalary: IStaffSalaryService;
  Dashboard: IDashboardService;
  BrandName: IBrandNameService;
}
