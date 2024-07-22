"use client";

import Link from "next/link";
import "@/app/components/styles/components/_sidebar.scss";
import Image from 'next/image';
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { LuUsers } from "react-icons/lu";
import { BiHomeAlt, BiLayer, BiPieChartAlt2, BiChevronRight, BiX, BiBarChartSquare, BiTask, BiCog, BiBuoy, BiChevronDown } from "react-icons/bi";
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
	}
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
		<div className="content">
			<div className="navigation">
				<div className="header">
					<div className="logo">
						<div className="logo-wrap">
							<div className="logomark">
								<Image
									src="/images/logo.png"
									width={32}
									height={32}
									alt="Vantar logo"
								/>
							</div>
							<div className="logotype">
								<p className="link">Vantar System</p>
							</div>
						</div>
					</div>
				</div>
				<div className="search">
					<div className="input-field">
						<div className='max-w-md mx-auto'>
							<div className="relative flex items-center w-full h-11 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border border-gray-300">
								<div className="grid place-items-center h-full w-12 text-gray-300">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
					</div>
				</div>
				<div className="navigation-cont">
					{links.map((link) => {
						const isActive = pathname === link.href;
						const isDropdownActive = link.subsections && isProjectsDropdownOpen;

						// Si el link tiene subsecciones, mostramos el dropdown
						if (link.subsections) {
							return (
								<div key={link.name} className="button-wrap">
									<div
										onClick={toggleProjectsDropdown}
										className={clsx("nav-item-base", { active: isActive })}
									>
										<div className="container">
											{link.icon}
											<p className="text">{link.name}</p>
											<BiChevronDown
												size={22}
												className={clsx("chevron-icon", {
													open: isDropdownActive,
												})}
											/>
										</div>
									</div>
									<div className={clsx("subsections", { open: isDropdownActive })}>
										{link.subsections.map((sub) => (
											<Link href={sub.href} key={sub.name} className={clsx("sub-nav-item", { active: pathname === sub.href })}>
												<p className="sub-text">{sub.name}</p>
											</Link>
										))}
									</div>
								</div>
							);
						} else {
							// Si no tiene subsecciones, es un enlace normal
							return (
								<div key={link.name} className="button-wrap">
									<Link href={link.href} key={link.name} className={clsx("nav-item-base", { active: isActive })}>
										<div className="container">
											{link.icon}
											<p className="text">{link.name}</p>
										</div>
									</Link>
								</div>

							);
						}
					})}
				</div>

			</div>
			<div className="footer">
				<div className="footer-nav">
					{footer_links.map((link) => {
						return (
							<Link href={link.href} key={link.name} className={clsx("nav-item-base", {
								active: pathname === link.href,
							})}>
								<div className="container">
									{link.icon}
									<p className="text">{link.name}</p>
								</div>
								{/* <div className="badge"></div> */}
							</Link>
						);
					})}
				</div>
				{isFeaturedCardVisible && (
                    <div className="nav-featured-card">
                        <div className="text-supporting">
                            <div className="text-wrap">
                                <h5>New Features available!</h5>
                                <BiX size={24} className="icon-close" onClick={handleCloseFeaturedCard} />
                            </div>
                            <p className="supporting-text">Check out the new dashboard view. Pages now load faster. </p>
                        </div>
                        <div className="image-wrap">
                            <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Feature image" />
                        </div>
                        <div className="actions">
                            <button className="button" onClick={handleCloseFeaturedCard}>Dismiss</button>
                            <a href="#" className="button link">What&apos;s new?</a>
                        </div>
                    </div>
                )}
				<hr className="line" />
				<div className="user-account">
					<div className="avatar-label-group">
						<div className="avatar">

						</div>
						<div className="text-supporting">
							<h5>Isael Diroche</h5>
							<p className="mail-adress">idiroche@planetaweb.do</p>
						</div>
					</div>
					<button className="open-toggle-button">
						<BiChevronRight size={22} />
					</button>
				</div>


			</div>
		</div>
	)
}