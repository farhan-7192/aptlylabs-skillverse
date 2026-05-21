import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { LayoutDashboard, Users, BarChart3, Settings, LogOut } from 'lucide-react'

const mainItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: Users, label: 'Users' },
]

const secondaryItems = [
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
]

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="h-6 w-6 rounded-full bg-pink-300" />
          <span className="text-sm font-semibold text-slate-700">Pastel</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(({ icon: Icon, label }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton>
                    <Icon size={15} />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Secondary</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map(({ icon: Icon, label }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton>
                    <Icon size={15} />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut size={15} />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
