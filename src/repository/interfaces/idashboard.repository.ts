import { DashboardSummaryDto } from '../../dtos/dashboard.dto';

export interface IDashboardRepository {
  getSummary(): Promise<DashboardSummaryDto>;
}
