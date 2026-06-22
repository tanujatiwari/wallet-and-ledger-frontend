"use client";
import { FC, PropsWithChildren, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import Footer from "../footer";
import Navbar from "../navbar";
interface IPageWraps {
  wrapperClass?: string;
  isNavbar?: boolean;
  navClass?: string;
}

const PageWrapper: FC<PropsWithChildren<IPageWraps>> = ({
  children,
  wrapperClass,
  isNavbar,
  navClass,
}) => {
  const [isActive, setIsActive] = useState(false);
  const slideNav = () => {
    if (window.scrollY >= 100) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };
  typeof window !== "undefined" && window.addEventListener("scroll", slideNav);
  return (
    <div className="animate-bottom">
      <Navbar />
      <div className={`bg-white ${wrapperClass}`}>{children}</div>
      {isActive && (
        <div
          className="z-10 w-12 h-8 hover:h-10 duration-300 bottom-0 right-10 rounded-t-md fixed cursor-pointer bg-primary flex items-center justify-center"
          onClick={() => window.scroll(0, 0)}
        >
          <IoIosArrowUp color="white" />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PageWrapper;
