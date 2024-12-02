import { motion } from "framer-motion";
import Link from "next/link";
import { navLinks } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const variants = {
  initial: {
    scaleX: 0,
  },
  open: {
    scaleX: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
  closed: {
    scaleX: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Sidebar = ({
  open,
  setOpen,
  scroll,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  scroll: boolean;
}) => {
  return (
    <motion.div className="lg:hidden" animate={open ? "open" : "closed"}>
      <motion.div
        className="text-3xl text-white exo font-medium z-40 fixed top-0 flex items-center p-10 right-0 bottom-0 bg-white w-full origin-right h-screen"
        initial="initial"
        animate={open ? "open" : "closed"}
        variants={variants}
      >
        <ul className="space-y-6 w-full">
          {navLinks.map((link, index) => (
            <li key={index}>
              {link.children ? (
                <Accordion type="single" collapsible>
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="flex items-center justify-between px-4 py-3 text-lg font-semibold text-gray-900 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition duration-300">
                      {link.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="pt-2 mt-2 space-y-1 text-lg text-gray-800 bg-white rounded-md shadow-inner">
                        {link.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <Link
                              onClick={() => setOpen(false)}
                              href={child.href}
                              className="block px-4 py-2 rounded-md hover:bg-gray-100 transition duration-300"
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  onClick={() => setOpen(false)}
                  href={link.href}
                  className="block px-4 py-3 text-lg font-semibold text-gray-900 bg-gray-100 rounded-md shadow-md hover:bg-gray-200 transition duration-300"
                >
                  {link.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
      <button
        className={
          scroll
            ? "fixed z-50 top-9 right-5"
            : "fixed z-50 top-14 right-12 sm:right-[6rem] md:right-28"
        }
        onClick={() => setOpen(!open)}
      >
        <svg width="25" height="25" viewBox="0 0 23 23">
          <motion.path
            strokeWidth="2"
            stroke="#000000"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" },
            }}
            animate={open ? "open" : "closed"}
          />
          <motion.path
            strokeWidth="2"
            stroke="#000000"
            strokeLinecap="round"
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            animate={open ? "open" : "closed"}
          />
          <motion.path
            strokeWidth="2"
            stroke="#000000"
            strokeLinecap="round"
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" },
            }}
            animate={open ? "open" : "closed"}
          />
        </svg>
      </button>
    </motion.div>
  );
};

export default Sidebar;
