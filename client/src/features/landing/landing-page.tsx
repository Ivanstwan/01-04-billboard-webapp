import { Link } from '@tanstack/react-router';
import {
  CircleUser,
  Menu,
  Package2,
  Search,
  BookOpenIcon,
  ChevronRightIcon,
  MessagesSquareIcon,
  Settings2Icon,
  TabletSmartphoneIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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

const HeroSection = () => {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden py-24 lg:py-32">
        {/* Gradients */}
        <div
          aria-hidden="true"
          className="absolute -top-96 start-1/2 flex -translate-x-1/2 transform"
        >
          <div className="h-[44rem] w-[25rem] -translate-x-[10rem] rotate-[-60deg] transform bg-gradient-to-r from-background/50 to-background blur-3xl" />
          <div className="h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem] -rotate-12 rounded-full bg-gradient-to-tl from-primary-foreground via-primary-foreground to-background blur-3xl" />
        </div>
        {/* End Gradients */}
        <div className="relative z-10">
          <div className="container py-10 lg:py-16">
            <div className="mx-auto max-w-2xl text-center">
              <p className="">Elevate your projects</p>
              {/* Title */}
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Beautiful UI Blocks
                </h1>
              </div>
              {/* End Title */}
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  Over 10+ fully responsive, UI blocks you can drop into your
                  Shadcn UI projects and customize to your heart&apos;s content.
                </p>
              </div>
              {/* Buttons */}
              <div className="mt-8 flex justify-center gap-3">
                <Button size={'lg'}>Get started</Button>
                <Button size={'lg'} variant={'outline'}>
                  Learn more
                </Button>
              </div>
              {/* End Buttons */}
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
};

const IconSectionSolidIconWithHoverEffect = () => {
  return (
    <>
      {/* Icon Blocks */}
      <div className="bg-muted">
        <div className="container py-12">
          <div className="grid items-center gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {/* Icon Block */}
            <a
              className="group flex flex-col justify-center rounded-lg border bg-white p-4 shadow-sm hover:bg-primary-foreground/90 md:p-7"
              href="#"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-primary">
                <TabletSmartphoneIcon className="h-6 w-6 flex-shrink-0 text-primary-foreground" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold">Responsive</h3>
                <p className="mt-1 text-muted-foreground">
                  Responsive, and mobile-first project on the web
                </p>
                <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm font-medium decoration-2 group-hover:underline">
                  Learn more
                  <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
                </span>
              </div>
            </a>
            {/* End Icon Block */}
            {/* Icon Block */}
            <a
              className="group flex flex-col justify-center rounded-lg border bg-white p-4 shadow-sm hover:bg-primary-foreground/90 md:p-7"
              href="#"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-primary">
                <Settings2Icon className="h-6 w-6 flex-shrink-0 text-primary-foreground" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold">Customizable</h3>
                <p className="mt-1 text-muted-foreground">
                  Components are easily customized and extendable
                </p>
                <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm font-medium decoration-2 group-hover:underline">
                  Learn more
                  <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
                </span>
              </div>
            </a>
            {/* End Icon Block */}
            {/* Icon Block */}
            <a
              className="group flex flex-col justify-center rounded-lg border bg-white p-4 shadow-sm hover:bg-primary-foreground/90 md:p-7"
              href="#"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-primary">
                <BookOpenIcon className="h-6 w-6 flex-shrink-0 text-primary-foreground" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold">Documentation</h3>
                <p className="mt-1 text-muted-foreground">
                  Every component and plugin is well documented
                </p>
                <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm font-medium decoration-2 group-hover:underline">
                  Learn more
                  <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
                </span>
              </div>
            </a>
            {/* End Icon Block */}
            {/* Icon Block */}
            <a
              className="group flex flex-col justify-center rounded-lg border bg-white p-4 shadow-sm hover:bg-primary-foreground/90 md:p-7"
              href="#"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-primary">
                <MessagesSquareIcon className="h-6 w-6 flex-shrink-0 text-primary-foreground" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-semibold">24/7 Support</h3>
                <p className="mt-1 text-muted-foreground">
                  Contact us 24 hours a day, 7 days a week
                </p>
                <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm font-medium decoration-2 group-hover:underline">
                  Learn more
                  <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
                </span>
              </div>
            </a>
            {/* End Icon Block */}
          </div>
        </div>
      </div>
      {/* End Icon Blocks */}
    </>
  );
};

const Footer = () => {
  return (
    <footer className="p-4 md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <a
          href="#"
          className="flex items-center justify-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <svg
            className="mr-2 h-8"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.2696 13.126C25.1955 13.6364 24.8589 14.3299 24.4728 14.9328C23.9856 15.6936 23.2125 16.2264 22.3276 16.4114L18.43 17.2265C17.8035 17.3575 17.2355 17.6853 16.8089 18.1621L14.2533 21.0188C13.773 21.5556 13.4373 21.4276 13.4373 20.7075C13.4315 20.7342 12.1689 23.9903 15.5149 25.9202C16.8005 26.6618 18.6511 26.3953 19.9367 25.6538L26.7486 21.7247C29.2961 20.2553 31.0948 17.7695 31.6926 14.892C31.7163 14.7781 31.7345 14.6639 31.7542 14.5498L25.2696 13.126Z"
              fill="url(#paint0_linear_11430_22515)"
            />
            <path
              d="M23.5028 9.20133C24.7884 9.94288 25.3137 11.0469 25.3137 12.53C25.3137 12.7313 25.2979 12.9302 25.2694 13.1261L28.0141 14.3051L31.754 14.5499C32.2329 11.7784 31.2944 8.92561 29.612 6.65804C28.3459 4.9516 26.7167 3.47073 24.7581 2.34097C23.167 1.42325 21.5136 0.818599 19.8525 0.486816L17.9861 2.90382L17.3965 5.67918L23.5028 9.20133Z"
              fill="url(#paint1_linear_11430_22515)"
            />
            <path
              d="M1.5336 11.2352C1.5329 11.2373 1.53483 11.238 1.53556 11.2358C1.67958 10.8038 1.86018 10.3219 2.08564 9.80704C3.26334 7.11765 5.53286 5.32397 8.32492 4.40943C11.117 3.49491 14.1655 3.81547 16.7101 5.28323L17.3965 5.67913L19.8525 0.486761C12.041 -1.07341 4.05728 3.51588 1.54353 11.2051C1.54233 11.2087 1.53796 11.2216 1.5336 11.2352Z"
              fill="url(#paint2_linear_11430_22515)"
            />
            <path
              d="M19.6699 25.6538C18.3843 26.3953 16.8003 26.3953 15.5147 25.6538C15.3402 25.5531 15.1757 25.4399 15.0201 25.3174L12.7591 26.8719L10.8103 30.0209C12.9733 31.821 15.7821 32.3997 18.589 32.0779C20.7013 31.8357 22.7995 31.1665 24.7582 30.0368C26.3492 29.1191 27.7 27.9909 28.8182 26.7195L27.6563 23.8962L25.7762 22.1316L19.6699 25.6538Z"
              fill="url(#paint3_linear_11430_22515)"
            />
            <path
              d="M15.0201 25.3175C14.0296 24.5373 13.4371 23.3406 13.4371 22.0588V21.931V11.2558C13.4371 10.6521 13.615 10.5494 14.1384 10.8513C13.3323 10.3864 11.4703 8.79036 9.17118 10.1165C7.88557 10.858 6.8269 12.4949 6.8269 13.978V21.8362C6.8269 24.775 8.34906 27.8406 10.5445 29.7966C10.6313 29.874 10.7212 29.9469 10.8103 30.0211L15.0201 25.3175Z"
              fill="url(#paint4_linear_11430_22515)"
            />
            <path
              d="M28.6604 5.49565C28.6589 5.49395 28.6573 5.49532 28.6589 5.49703C28.9613 5.83763 29.2888 6.23485 29.6223 6.68734C31.3648 9.05099 32.0158 12.0447 31.4126 14.9176C30.8093 17.7906 29.0071 20.2679 26.4625 21.7357L25.7761 22.1316L28.8181 26.7195C34.0764 20.741 34.09 11.5388 28.6815 5.51929C28.6789 5.51641 28.67 5.50622 28.6604 5.49565Z"
              fill="url(#paint5_linear_11430_22515)"
            />
            <path
              d="M7.09355 13.978C7.09354 12.4949 7.88551 11.1244 9.17113 10.3829C9.34564 10.2822 9.52601 10.1965 9.71002 10.1231L9.49304 7.38962L7.96861 4.26221C5.32671 5.23364 3.1897 7.24125 2.06528 9.83067C1.2191 11.7793 0.75001 13.9294 0.75 16.1888C0.75 18.0243 1.05255 19.7571 1.59553 21.3603L4.62391 21.7666L7.09355 21.0223V13.978Z"
              fill="url(#paint6_linear_11430_22515)"
            />
            <path
              d="M9.71016 10.1231C10.8817 9.65623 12.2153 9.74199 13.3264 10.3829L13.4372 10.4468L22.3326 15.5777C22.9566 15.9376 22.8999 16.2918 22.1946 16.4392L22.7078 16.332C23.383 16.1908 23.9999 15.8457 24.4717 15.3428C25.2828 14.4782 25.5806 13.4351 25.5806 12.5299C25.5806 11.0468 24.7886 9.67634 23.503 8.93479L16.6911 5.00568C14.1436 3.53627 11.0895 3.22294 8.29622 4.14442C8.18572 4.18087 8.07756 4.2222 7.96875 4.26221L9.71016 10.1231Z"
              fill="url(#paint7_linear_11430_22515)"
            />
            <path
              d="M20.0721 31.8357C20.0744 31.8352 20.0739 31.8332 20.0717 31.8337C19.6252 31.925 19.1172 32.0097 18.5581 32.0721C15.638 32.3978 12.7174 31.4643 10.5286 29.5059C8.33986 27.5474 7.09347 24.7495 7.09348 21.814L7.09347 21.0222L1.59546 21.3602C4.1488 28.8989 12.1189 33.5118 20.0411 31.8421C20.0449 31.8413 20.0582 31.8387 20.0721 31.8357Z"
              fill="url(#paint8_linear_11430_22515)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_11430_22515"
                x1="20.8102"
                y1="23.9532"
                x2="23.9577"
                y2="12.9901"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#1724C9" />
                <stop offset="1" stop-color="#1C64F2" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_11430_22515"
                x1="28.0593"
                y1="10.5837"
                x2="19.7797"
                y2="2.33321"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#1C64F2" />
                <stop offset="1" stop-color="#0092FF" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_11430_22515"
                x1="16.9145"
                y1="5.2045"
                x2="4.42432"
                y2="5.99375"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0092FF" />
                <stop offset="1" stop-color="#45B2FF" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_11430_22515"
                x1="16.0698"
                y1="28.846"
                x2="27.2866"
                y2="25.8192"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#1C64F2" />
                <stop offset="1" stop-color="#0092FF" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_11430_22515"
                x1="8.01881"
                y1="15.8661"
                x2="15.9825"
                y2="24.1181"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#1724C9" />
                <stop offset="1" stop-color="#1C64F2" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_11430_22515"
                x1="26.2004"
                y1="21.8189"
                x2="31.7569"
                y2="10.6178"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0092FF" />
                <stop offset="1" stop-color="#45B2FF" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_11430_22515"
                x1="6.11387"
                y1="9.31427"
                x2="3.14054"
                y2="20.4898"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#1C64F2" />
                <stop offset="1" stop-color="#0092FF" />
              </linearGradient>
              <linearGradient
                id="paint7_linear_11430_22515"
                x1="21.2932"
                y1="8.78271"
                x2="10.4278"
                y2="11.488"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#1724C9" />
                <stop offset="1" stop-color="#1C64F2" />
              </linearGradient>
              <linearGradient
                id="paint8_linear_11430_22515"
                x1="7.15667"
                y1="21.5399"
                x2="14.0824"
                y2="31.9579"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0092FF" />
                <stop offset="1" stop-color="#45B2FF" />
              </linearGradient>
            </defs>
          </svg>
          Flowbite
        </a>
        <p className="my-6 text-gray-500 dark:text-gray-400">
          Open-source library of over 400+ web components and interactive
          elements built for better web.
        </p>
        <ul className="mb-6 flex flex-wrap items-center justify-center text-gray-900 dark:text-white">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Premium
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Campaigns
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Blog
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Affiliate Program
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              FAQs
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Contact
            </a>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2021-2022{' '}
          <a href="#" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <HeroSection />
      <IconSectionSolidIconWithHoverEffect />
      <Footer />
    </div>
  );
};

export default LandingPage;
