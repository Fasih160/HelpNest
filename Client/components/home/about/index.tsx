"use client";
import React from "react";
import { motion } from "framer-motion";
const variants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.3,
    },
  },
};

const About = ({
  className,
  title,
  description,
}: {
  className: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white">
      <motion.div
        initial={{ scaleX: 0.9, borderRadius: "2rem" }}
        whileInView={{ scaleX: 1, borderRadius: 0 }}
        viewport={{ amount: 0.3 }}
        className={
          "py-20 px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 min-h-[75vh] flex items-center " +
          className
        }
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
            },
          }}
          className="max-w-5xl"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-5 max-w-2xl">
            {title}
          </h1>
          <p className="sm:text-xl md:text-2xl mb-8 leading-relaxed tracking-widest">
            {description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
