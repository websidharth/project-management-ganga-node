import { DashboardSummaryDto } from '../../dtos/dashboard.dto';

export interface IDashboardService {
  getSummary(): Promise<DashboardSummaryDto>;
}
