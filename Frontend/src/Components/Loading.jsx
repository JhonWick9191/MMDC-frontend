import { color } from "motion/react"

// LoadingScreen.jsx
function LoadingScreen  () {
  return (
    <div style={{
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
        src="https://res.cloudinary.com/dfilhi9ku/image/upload/v1758090715/Loading_mdzrzx.gif" 
        alt="Loading..." 
        style={{ width: '300px', height: '300px' }}
      />
    </div>
  );
};

export default LoadingScreen;
