import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { UserRepository } from "./user.repository";
import { container } from "../config/ioc.config";
import IUnitOfWork from "./interfaces/iunitofwork.repository";
import { IUserRepository } from "./interfaces/iuser.repository";
import { TYPES } from "../config/ioc.types";
import { AccountRepository } from "./account.repository";
import { IAccountRepository } from "./interfaces/iaccount.repository";
import { CategoryRepository } from "./category.repository";
import { ICategoryRepository } from "./interfaces/icategory.repository";
import { ProductRepository } from "./product.repository";
import { IProductRepository } from "./interfaces/iproduct.repository";
import { ProductVariantRepository } from "./product-variant.repository";
import { IProductVariantRepository } from "./interfaces/iproduct-variant.repository";
import { AttributeRepository } from "./attribute.repository";
import { IAttributeRepository } from "./interfaces/iattribute.repository";
import { ProductAttributeRepository } from "./product-attribute.repository";
import { IProductAttributeRepository } from "./interfaces/iproduct-attribute.repository";
import { StaffAttendanceRepository } from "./staff-attendance.repository";
import { IStaffAttendanceRepository } from "./interfaces/istaff-attendance.repository";
import { OrderRepository } from "./order.repository";
import { IOrderRepository } from "./interfaces/iorder.repository";
import { OrderItemRepository } from "./order-item.repository";
import { IOrderItemRepository } from "./interfaces/iorder-item.repository";
import { PaymentRepository } from "./payment.repository";
import { IPaymentRepository } from "./interfaces/ipayment.repository";
import { StaffSalaryRepository } from "./staff-salary.repository";
import { IStaffSalaryRepository } from "./interfaces/istaff-salary.repository";
import { DashboardRepository } from "./dashboard.repository";
import { BrandNameRepository } from "./brand-name.repository";
import { IDashboardRepository } from "./interfaces/idashboard.repository";
import { IBrandNameRepository } from "./interfaces/ibrand-name.repository";
import { StaffRepository } from "./staff.repository";
import { IStaffRepository } from "./interfaces/istaff.repository";

export default class UnitOfWork implements IUnitOfWork {
  public User: IUserRepository;
  public Account: IAccountRepository;
  public Category: ICategoryRepository;
  public Product: IProductRepository;
  public ProductVariant: IProductVariantRepository;
  public Attribute: IAttributeRepository;
  public ProductAttribute: IProductAttributeRepository;
  public StaffAttendance: IStaffAttendanceRepository;
  public Order: IOrderRepository;
  public OrderItem: IOrderItemRepository;
  public Payment: IPaymentRepository;
  public StaffSalary: IStaffSalaryRepository;
  public Dashboard: IDashboardRepository;
  public BrandName: IBrandNameRepository;
  public Staff: IStaffRepository;

  constructor(
    user = container.get<IUserRepository>(TYPES.IUserRepository),
    account = container.get<IAccountRepository>(TYPES.IAccountRepository),
    category = container.get<ICategoryRepository>(TYPES.ICategoryRepository),
    product = container.get<IProductRepository>(TYPES.IProductRepository),
    productVariant = container.get<IProductVariantRepository>(TYPES.IProductVariantRepository),
    attribute = container.get<IAttributeRepository>(TYPES.IAttributeRepository),
    productAttribute = container.get<IProductAttributeRepository>(TYPES.IProductAttributeRepository),
    staffAttendance = container.get<IStaffAttendanceRepository>(TYPES.IStaffAttendanceRepository),
    order = container.get<IOrderRepository>(TYPES.IOrderRepository),
    orderItem = container.get<IOrderItemRepository>(TYPES.IOrderItemRepository),
    payment = container.get<IPaymentRepository>(TYPES.IPaymentRepository),
    staffSalary = container.get<IStaffSalaryRepository>(TYPES.IStaffSalaryRepository),
    dashboard = container.get<IDashboardRepository>(TYPES.IDashboardRepository),
    brandName = container.get<IBrandNameRepository>(TYPES.IBrandNameRepository),
    staff = container.get<IStaffRepository>(TYPES.IStaffRepository),
  ) {
    this.User = user;
    this.Account = account;
    this.Category = category;
    this.Product = product;
    this.ProductVariant = productVariant;
    this.Attribute = attribute;
    this.ProductAttribute = productAttribute;
    this.StaffAttendance = staffAttendance;
    this.Order = order;
    this.OrderItem = orderItem;
    this.Payment = payment;
    this.StaffSalary = staffSalary;
    this.Dashboard = dashboard;
    this.BrandName = brandName;
    this.Staff = staff;
  }

  async transaction<T>(
    callback: (prisma: Prisma.TransactionClient) => Promise<T>
  ): Promise<T> {
    return prisma.$transaction(async (transactionClient) => {
      return callback(transactionClient);
    });
  }
}
