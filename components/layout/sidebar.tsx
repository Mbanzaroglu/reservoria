"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { routes } from "@/lib/routes"
import {
  Home,
  BarChart3,
  Calendar,
  Building,
  Calendar as CalendarIcon,
  Bed,
  FileText,
  Users,
  ClipboardList,
  TrendingUp,
  DollarSign,
  HandCoins,
  CreditCard,
  FileBarChart,
  Settings,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useUIStore } from "@/lib/store"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarItem {
  label: string
  icon: React.ElementType
  href?: string
  children?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Genel Bakış",
    icon: Home,
    href: routes.overview,
  },
  {
    label: "Raporlar",
    icon: BarChart3,
    href: routes.reports,
  },
  {
    label: "Rezervasyon Takvimi",
    icon: Calendar,
    href: routes.reservationCalendar,
  },
  {
    label: "Tesisler",
    icon: Building,
    href: routes.facilities,
  },
  {
    label: "iCal Entegrasyonları",
    icon: CalendarIcon,
    href: routes.icalIntegrations,
  },
  {
    label: "Odalar",
    icon: Bed,
    href: routes.rooms,
  },
  {
    label: "Rezervasyonlar",
    icon: FileText,
    href: routes.reservations,
  },
  {
    label: "Kullanıcılar",
    icon: Users,
    href: routes.users,
  },
  {
    label: "Loglar",
    icon: ClipboardList,
    href: routes.logs,
  },
  {
    label: "Fiyatlandırma",
    icon: TrendingUp,
    children: [
      {
        label: "Fiyat Kuralları",
        icon: BarChart3,
        href: routes.pricingRules,
      },
    ],
  },
  {
    label: "Finansal İşlemler",
    icon: DollarSign,
    children: [
      {
        label: "Finansal Özet",
        icon: BarChart3,
        href: routes.financialSummary,
      },
      {
        label: "Alacaklar",
        icon: DollarSign,
        href: routes.receivables,
      },
      {
        label: "Manuel Tahsilatlar",
        icon: HandCoins,
        href: routes.manualCollections,
      },
      {
        label: "Otel Ödemeleri",
        icon: CreditCard,
        href: routes.hotelPayments,
      },
      {
        label: "Finansal Raporlar",
        icon: FileBarChart,
        href: routes.financialReports,
      },
    ],
  },
  {
    label: "Ayarlar",
    icon: Settings,
    children: [],
  },
]

function SidebarItemComponent({ item, level = 0 }: { item: SidebarItem; level?: number }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(level === 0 && item.children ? true : false)
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.href === pathname

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            level > 0 && "pl-8",
            "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <item.icon className="h-5 w-5" />
          <span className="flex-1 text-left">{item.label}</span>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {isOpen && (
          <div className="mt-1 space-y-1">
            {item.children.map((child) => (
              <SidebarItemComponent key={child.label} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  if (!item.href) return null

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        level > 0 && "pl-8",
        isActive
          ? "bg-accent text-accent-foreground"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.label}</span>
    </Link>
  )
}

export function Sidebar() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card transition-transform",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-bold text-primary">Reservoria</h1>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {sidebarItems.map((item) => (
            <SidebarItemComponent key={item.label} item={item} />
          ))}
        </nav>
      </div>
    </aside>
  )
}

