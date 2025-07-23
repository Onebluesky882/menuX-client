import { useEffect, useRef } from "react";

const Clock = () => {
  const timeRef = useRef<HTMLSpanElement>(null);
  const dateRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      if (timeRef.current) {
        timeRef.current.textContent = now.toLocaleTimeString();
      }
      if (dateRef.current) {
        dateRef.current.textContent = now.toLocaleDateString();
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div>
      <span ref={dateRef} /> <span ref={timeRef} />
    </div>
  );
};

export default Clock;
