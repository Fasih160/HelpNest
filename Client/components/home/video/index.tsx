"use client";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import Modal from "react-modal";
import img from "@/assets/video.jpg";

const Video = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="px-6 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-20 bg-white">
      <h2 className="text-xl sm:text-2xl font-semibold text-center">
        How HelpNest Works
      </h2>
      <div className="relative mt-6">
        <img
          src={img.src}
          alt="How GoFundMe Works"
          className="w-full h-[80vh] object-cover"
          style={{
            borderRadius: "2rem",
          }}
        />
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-4 rounded-full shadow-md flex items-center"
          aria-label="Play Video"
          onClick={openModal}
        >
          <FaPlay className="sm:h-6 sm:w-6 w-4 h-4 text-black" />
          <span className="ml-2 text-sm whitespace-nowrap">
            Play 1 min video
          </span>
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Watch Video"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black/75"
        overlayClassName="fixed inset-0 bg-black/75"
      >
        <div className="relative w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
          <div className="flex justify-end p-2">
            <button
              onClick={closeModal}
              className="text-black hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 8.586l4.293-4.293 1.414 1.414L11.414 10l4.293 4.293-1.414 1.414L10 11.414l-4.293 4.293-1.414-1.414L8.586 10 4.293 5.707l1.414-1.414L10 8.586z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="p-4">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/u31qwQUeGuM?si=oT_RJmmPaL5ljzIH"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
