"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { LuUsers } from "react-icons/lu";
import {
  BiHomeAlt,
  BiLayer,
  BiPieChartAlt2,
  BiChevronRight,
  BiX,
  BiBarChartSquare,
  BiTask,
  BiCog,
  BiBuoy,
  BiChevronDown,
} from "react-icons/bi";
import React, { useState } from "react";

const links = [
  {
    icon: <BiHomeAlt size={22} />,
    name: "Home",
    href: "/",
  },
  {
    icon: <LuUsers size={22} />,
    name: "Customers",
    href: "/customers",
  },
  {
    icon: <BiTask size={22} />,
    name: "Inventories",
    href: "/inventories",
  },
  {
    icon: <BiPieChartAlt2 size={22} />,
    name: "Reporting",
    href: "/reporting",
    subsections: [
      { name: "Project A", href: "/projects/a" },
      { name: "Project B", href: "/projects/b" },
    ],
  },
  {
    icon: <BiBarChartSquare size={22} />,
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <BiLayer size={22} />,
    name: "Projects",
    href: "/projects",
  },
];

const footer_links = [
  {
    icon: <BiBuoy size={22} />,
    name: "Support",
    href: "/support",
  },
  {
    icon: <BiCog size={22} />,
    name: "Settings",
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isProjectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [isFeaturedCardVisible, setFeaturedCardVisible] = useState(true);

  const toggleProjectsDropdown = () => {
    setProjectsDropdownOpen(!isProjectsDropdownOpen);
  };

  const handleCloseFeaturedCard = () => {
    setFeaturedCardVisible(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              width={32}
              height={32}
              alt="Vantar logo"
              className="h-8 w-8"
            />
            <p className="text-lg font-semibold">Vantar System</p>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="relative flex items-center w-full h-11 rounded-lg shadow focus-within:shadow-lg bg-white overflow-hidden border border-gray-300">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search something.."
            />
          </div>
        </div>
        <div className="px-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const isDropdownActive = link.subsections && isProjectsDropdownOpen;

            if (link.subsections) {
              return (
                <div key={link.name} className="mb-4">
                  <div
                    onClick={toggleProjectsDropdown}
                    className={clsx(
                      "flex items-center justify-between p-2 rounded-lg cursor-pointer",
                      {
                        "text-white bg-blue-500": isActive,
                        "text-gray-700 hover:bg-gray-200": !isActive,
                      }
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      {link.icon}
                      <p>{link.name}</p>
                    </div>
                    <BiChevronDown
                      size={22}
                      className={clsx(
                        "transform transition-transform duration-300",
                        {
                          "rotate-180": isDropdownActive,
                        }
                      )}
                    />
                  </div>
                  {isDropdownActive && (
                    <div className="ml-4">
                      {link.subsections.map((sub) => (
                        <Link
                          href={sub.href}
                          key={sub.name}
                          className={clsx("block p-2 rounded-lg", {
                            "text-blue-500": pathname === sub.href,
                            "text-gray-700 hover:bg-gray-200":
                              pathname !== sub.href,
                          })}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <div key={link.name} className="mb-4">
                  <Link
                    href={link.href}
                    key={link.name}
                    className={clsx("flex items-center p-2 rounded-lg", {
                      "text-white bg-blue-500": isActive,
                      "text-gray-700 hover:bg-gray-200": !isActive,
                    })}
                  >
                    {link.icon}
                    <p className="ml-2">{link.name}</p>
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="border-t p-4">
        <div className="space-y-4">
          {footer_links.map((link) => {
            return (
              <Link
                href={link.href}
                key={link.name}
                className={clsx("flex items-center p-2 rounded-lg", {
                  "text-white bg-blue-500": pathname === link.href,
                  "text-gray-700 hover:bg-gray-200": pathname !== link.href,
                })}
              >
                {link.icon}
                <p className="ml-2">{link.name}</p>
              </Link>
            );
          })}
        </div>
        {isFeaturedCardVisible && (
          <div className="mt-4 p-4 bg-blue-100 rounded-lg relative">
            <div className="absolute top-2 right-2">
              <BiX
                size={24}
                className="cursor-pointer"
                onClick={handleCloseFeaturedCard}
              />
            </div>
            <h5 className="font-semibold">New Features available!</h5>
            <p className="text-sm text-gray-700 mt-2">
              Check out the new dashboard view. Pages now load faster.
            </p>
            <img
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Feature image"
              className="mt-2 rounded-lg"
            />
            <div className="flex space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleCloseFeaturedCard}
              >
                Dismiss
              </button>
              <a
                href="#"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
              >
                What's new?
              </a>
            </div>
          </div>
        )}
        <hr className="my-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div>
              <h5 className="font-semibold">Isael Diroche</h5>
              <p className="text-sm text-gray-500">idiroche@planetaweb.do</p>
            </div>
          </div>
          <button className="flex-shrink-0">
            <BiChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
