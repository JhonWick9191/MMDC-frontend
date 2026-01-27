import { color } from "motion/react"

// LoadingScreen.jsx
function LoadingScreen  () {
  return (
    <div style={{
      overflow:"hidden",
      position: 'fixed',
      top: 0, left: 0,
      width: '100%',
      height: '100%',
      backgroundColor:"white",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',  
      zIndex: 1000,
    }}>
      <img 
        src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1759493729/Guitar-ani_1_ilhhxa.gif" 
        alt="Loading..." 
        style={{ width: '300px', height: '300px' }}
        loading="lazy"
      />
    </div>
  );
};

export default LoadingScreen;
