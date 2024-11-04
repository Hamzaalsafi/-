import React from "react";
import { motion } from "framer-motion";

export const MorphingBubble = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

      }}
    >
      <motion.div
     whileHover={{ scale: 1.1, boxShadow: "0px 0px 50px rgba(143, 189, 222, 0.6)",transition: { duration: 3 }, }}
     whileTap={{
       scale: 1.3,
       backgroundColor: "#6497b8",
       transition: { duration: 1 },
     }}
        animate={{
          borderRadius: [
            "42% 58% 50% 50%",
            "56% 44% 60% 40%",
            "52% 48% 47% 53%",
            "58% 42% 54% 46%",
            "50% 52% 53% 47%",
            "46% 54% 51% 49%",
            "42% 58% 50% 50%",
          ],
          scale: [1, 1.02, 1.02, 1, 1],
          backgroundColor: [
            "#b0c4e9",
            "#8fbdde",
            "#6497b8",
            "#8fbdde",
            "#b0c4e9",
            "#b0c4e9",
          ],
          boxShadow: [
            "0px 0px 20px rgba(176, 196, 233, 0.6)",
            "0px 0px 30px rgba(143, 189, 222, 0.6)",
            "0px 0px 40px rgba(100, 151, 184, 0.6)",
            "0px 0px 30px rgba(143, 189, 222, 0.6)",
            "0px 0px 20px rgba(176, 196, 233, 0.6)",
            "0px 0px 20px rgba(176, 196, 233, 0.6)",
          ],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        style={{
          width: window.innerWidth > 375 ? window.innerWidth * 0.5 + "px" : "150px",
          height: window.innerWidth > 375 ? window.innerWidth * 0.5 + "px" : "150px",
          maxHeight: 500,
          minHeight:130,
          minWidth:130,
          maxWidth: 500,
          margin: "0 auto",
          cursor: "pointer",
          transition: "transform 0.3s",
          transformOrigin: "50% 50%",
          backgroundColor: "#b0c4e9",
          boxShadow: "0px 0px 20px rgba(176, 196, 233, 0.5)",
          borderRadius: "45% 55% 50% 50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        
        <img
        className="pointer-events-none select-none "
        draggable={false}
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 5, opacity: 0 }}
        transition={{ duration: 0.6 }}
          src="/Home.svg"
          alt="books"
          style={{
            width: "70%",
            height: "70%",
            objectFit: "contain",
          }}
        />
      
      </motion.div>
    </div>
  );
};
