import { motion } from "framer-motion";

function AnimatedButton({ children, className, style }) {
  // Yahan aap animation ki properties define kar rahe hain
  const animationProps = {
    initial: { y: 50, x: 100, opacity: 0 },
    animate: { y: 0, x: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 80, damping: 15 },
  };

  return (
    <motion.div
      {...animationProps}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedButton;
