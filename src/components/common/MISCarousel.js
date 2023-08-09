import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const MISCarousel = ({ children }) => (
  <Box
    sx={{
      "& .carousel-slider": {
        "& .dot": {
          background: "#DADEE6",
          opacity: 1,
          boxShadow: "none",
        },

        "& .dot.selected": {
          background: "#2D3C59",
        },
      },
      "& .carousel .slide img": {
        width: "auto",
      },
    }}
  >
    <Carousel showStatus={false} showThumbs={false} autoPlay>
      {children}
    </Carousel>
  </Box>
);

MISCarousel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MISCarousel;
