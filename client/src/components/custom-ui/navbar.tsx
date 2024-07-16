import { Link } from '@tanstack/react-router';
import { CircleUser, Menu, Package2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigationLeft = [
  { name: 'Dashboard', to: '/' },
  { name: 'Example', to: '/example' },
  { name: 'Rent', to: '/listing' },
];

const navigationRight = [
  { name: 'Advertise', to: '/' },
  { name: 'Manage', to: '/' },
  { name: 'Rent', to: '/listing' },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex h-16 items-center md:container">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {navigationLeft.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              {navigationLeft.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
              {navigationRight.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="ml-auto flex">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <nav className="ml-auto hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            {navigationRight.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign In
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
