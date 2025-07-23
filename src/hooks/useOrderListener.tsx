import { socket } from "@/lib/socket";
import { useEffect } from "react";

const useOrderListener = (onNewOrder: (order: any) => void) => {
  useEffect(() => {
    useEffect(() => {
      socket.on("new_order", onNewOrder);
      return () => {
        socket.off("new_order", onNewOrder);
      };
    });
  }, [onNewOrder]);
  return <div>useOrderListener</div>;
};
export default useOrderListener;
