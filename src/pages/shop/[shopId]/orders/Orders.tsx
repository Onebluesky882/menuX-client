import useOrderListener from "@/hooks/useOrderListener";

const Orders = () => {
  /* 
แก้ไขเพิ่มเติม  shop add field bank and relation with slip-verification ป้องกัน ยอดตรงกันแต่คนรับคนละคน 


  1 เรียก มีรายการชำระสำเร็จ slip verification 
  
  - ปุ่ม ปรับสถานะ ออเดอร์ เมื่อสำเร็จ จาก pending เป็น success 


  - client เห็นสถานะออเดอร์ สำเร็จ ยืนยัน 
  
  
  */
  const handleGetOrder = async () => {};
  useOrderListener((order) => {
    console.log("New order received", order);
  });
  return <div>Orders</div>;
};
export default Orders;
