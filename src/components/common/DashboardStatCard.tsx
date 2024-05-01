import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface CardItem {
  text: string;
  amount: string;
  percentage: string;
  icon: React.ReactNode;
}

export default function DashboardStatCard({
    text,
    amount,
    percentage,
    icon,
  }: CardItem) {
  return (
    <Card style={{ backgroundColor: '#FFDDDD' }}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{text}</CardTitle>
        <div >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
        <p className="text-xs text-muted-foreground">{percentage}</p>
      </CardContent>
    </Card>
  );
}
