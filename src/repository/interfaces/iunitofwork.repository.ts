import { Prisma } from "@prisma/client";
import { IUserRepository } from "./iuser.repository";
import { IAccountRepository } from "./iaccount.repository";
import { ICategoryRepository } from "./icategory.repository";
import { IProductRepository } from "./iproduct.repository";
import { IProductVariantRepository } from "./iproduct-variant.repository";
import { IAttributeRepository } from "./iattribute.repository";
import { IProductAttributeRepository } from "./iproduct-attribute.repository";
import { IStaffAttendanceRepository } from "./istaff-attendance.repository";
import { IOrderRepository } from "./iorder.repository";
import { IOrderItemRepository } from "./iorder-item.repository";
import { IPaymentRepository } from "./ipayment.repository";
import { IStaffSalaryRepository } from "./istaff-salary.repository";
import { IDashboardRepository } from "./idashboard.repository";
import { IBrandNameRepository } from "./ibrand-name.repository";
import { IStaffRepository } from "./istaff.repository";

export default interface IUnitOfWork {
  User: IUserRepository;
  Account: IAccountRepository;
  Category: ICategoryRepository;
  Product: IProductRepository;
  ProductVariant: IProductVariantRepository;
  Attribute: IAttributeRepository;
  ProductAttribute: IProductAttributeRepository;
  StaffAttendance: IStaffAttendanceRepository;
  Order: IOrderRepository;
  OrderItem: IOrderItemRepository;
  Payment: IPaymentRepository;
  StaffSalary: IStaffSalaryRepository;
  Dashboard: IDashboardRepository;
  BrandName: IBrandNameRepository;
  Staff: IStaffRepository;

  /**
   * Executes a set of operations within a database transaction.
   *
   * @param callback - A function that receives a Prisma transaction client and performs database operations.
   * @returns A promise that resolves to the result of the transaction.
   */
  transaction<T>(
    callback: (prisma: Prisma.TransactionClient) => Promise<T>
  ): Promise<T>;
}
