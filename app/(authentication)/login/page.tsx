import Button from "@/app/components/UI/button";
import Input from "@/app/components/UI/input";
import { BiLogoGoogle, BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";

import "@/app/components/styles/main.scss";

import Image from "next/image";
import Link from "next/link";

export default function Page() {

    return (
        <section className="login-section" id="login">
            <div className="login-container">
                <div className="container">
                    <div className="content">
                        <div className="header">
                            <Image src="/images/logo.png" width={48} height={48} alt="Logo" />
                            <div className="text-supporting">
                                <h2 className="section-heading">Login</h2>
                                <p className="suporting-text">Welcome back! Please enter your details.</p>
                            </div>
                        </div>
                        <form action="" className="content" >
                            <div className="formulary">
                                <Input placeholder="Enter your email" label="Email" fullWidth></Input>
                                <Input placeholder="•••••••••••" label="Password" type="Password" fullWidth></Input>
                            </div>
                            <div className="row">
                                <div className="input-check">
                                    <input type="checkbox" name="#" id="rememberAccount" className="check" />
                                    <label htmlFor="rememberAccount">Remember for 30 days</label>
                                </div>
                                <Link href="/forgot-password" className="link">Forgot Password</Link>
                            </div>
                            <div className="actions">
                                <Button fullWidth hierarchy='Secondary'>Sign in</Button>
                                {/* <Button fullWidth state={"Disable"}><BiLogoGoogle size={24} /> Sign in with Google</Button> */}
                            </div>
                        </form>
                        
                        <div className="row">
                            <p>Dont have an account?</p>
                            <Link href="/register" className="link">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="quote-container">
                {/* <img src="https://images.unsplash.com/photo-1654171567840-58c77ee342d9?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="#" /> */}
                <div className="quote-imagen">
                    <div className="quote-imagen-bottom">
                        <div className="atribution-cart">
                            <p>“Untitled has saved us thousands of hours of work. We re able to spin up projects  faster and take on more clients.”</p>
                            <div className="name-text">
                                <div className="name-star">
                                    <h3 className="name">Lula Meyers</h3>
                                    <Image src="/images/stars-5.png" width={100} height={16} alt="5 stars" />
                                </div>
                                <div className="supporting-text-arrows">
                                    <div className="supporting-text">
                                        <p className="position">Product Manager, Hourglass</p>
                                        <p className="business">Web Design Agency</p>
                                    </div>
                                    <div className="arrows">
                                        <a href="#" className="back"><BiSolidChevronLeft size={24} className="icon" /></a>
                                        <a href="#" className="next"><BiSolidChevronRight size={24} className="icon" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
