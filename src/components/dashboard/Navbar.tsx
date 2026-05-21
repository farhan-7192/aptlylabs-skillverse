import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

export function Navbar() {
  return (
    <div className="flex items-center border-b border-rose-100 bg-white px-8 py-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-slate-600 hover:text-pink-600">
              Home
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/">Dashboard</NavigationMenuLink>
              <NavigationMenuLink href="/settings">Settings</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-slate-600 hover:text-pink-600">
              About
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/about">About Us</NavigationMenuLink>
              <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
