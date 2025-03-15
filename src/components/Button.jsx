import React from "react";

const Button = React.forwardRef(({ variant, size, children, ...props }, ref) => {
  return (
    <button
      ref={ref}  // Forward the ref to the button element
      className={`${variant} ${size}`}
      {...props} // Spread any other props like onClick, etc.
    >
      {children}
    </button>
  );
});

// Make sure to display a display name for easier debugging
Button.displayName = "Button";

export { Button };
