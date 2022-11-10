import { motion, MotionStyle } from "framer-motion";

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut",
}

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
}

const loadingContainer: MotionStyle = {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const loadingCircle:MotionStyle = {
  backgroundColor: '#AEC0FF',
  width: '24px',
  height: '24px',
  borderRadius: '24px',
  display:'inline-block',
  margin: '0 8px'
}

export function Loading(){
  return(
    <div data-testid="loading">
      <motion.div
        style={loadingContainer}
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
        <motion.span
          style={loadingCircle}
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        />
      </motion.div>
    </div>
  )
}