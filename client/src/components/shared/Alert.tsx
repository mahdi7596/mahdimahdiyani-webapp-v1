import { FC, ReactNode } from "react";
import clsx from "clsx";

type AlertStatus = "info" | "success" | "warning" | "error";

interface AlertProps {
  status?: AlertStatus;
  title?: string;
  children: ReactNode;
}

const statusConfig: Record<
  AlertStatus,
  {
    icon: ReactNode;
    color: string;
    bg: string;
    border: string;
  }
> = {
  info: {
    icon: <i className="maicon-typcn_info-outline text-4xl text-blue-600"></i>,
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  success: {
    icon: <i className="maicon-typcn_info-outline text-4xl text-green-600"></i>,
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  warning: {
    icon: (
      <i className="maicon-typcn_info-outline text-4xl text-yellow-600"></i>
    ),
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  error: {
    icon: <i className="maicon-typcn_info-outline text-4xl text-red-600"></i>,
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
  },
};

export const Alert: FC<AlertProps> = ({ status = "info", title, children }) => {
  const config = statusConfig[status];

  return (
    <div
      className={clsx(
        "w-full border p-4 rounded-lg flex items-start gap-2",
        config.bg,
        config.border,
        config.color
      )}
    >
      <div className="pt-0.5">{config.icon}</div>
      <div>
        {title && <p className="font-semibold mb-2">{title}</p>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
};
