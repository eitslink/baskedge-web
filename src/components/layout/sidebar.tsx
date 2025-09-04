'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils'
import { NAVIGATION_ITEMS } from '@/constants'
import {
  Home,
  Gamepad2,
  Users,
  User,
  UserCheck,
  Gavel,
  Heart,
  Settings,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<any>> = {
  Home,
  Gamepad2,
  Users,
  User,
  UserCheck,
  Gavel,
  Heart,
  Settings,
}

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            メニュー
          </h2>
          <div className="space-y-1">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = iconMap[item.icon] || Home // フォールバックとしてHomeを使用
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
