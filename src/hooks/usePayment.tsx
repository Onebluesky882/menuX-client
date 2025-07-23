/* 

      async function checkSlip() {
            try {
                const img = imagePreview.src;
                if (!img) {
                    resultDiv.innerHTML = 'กรุณาอัพโหลดรูปภาพ';
                    resultDiv.style.color = 'red';
                    return;
                }

                resultDiv.innerHTML = 'กำลังตรวจสอบ...';
                const response = await axios.post('https://ucwgwgkko4wk408ggsk0cosw.oiio.download/api/slip', { img });

                resultDiv.innerHTML = `ผลการตรวจสอบ:\n${JSON.stringify(response.data, null, 2)}`;
                resultDiv.style.color = 'black';
            } catch (error) {
                resultDiv.innerHTML = `เกิดข้อผิดพลาด: ${error.response?.data?.error || error.message}`;
                resultDiv.style.color = 'red';
            }
        }
*/
// doc https://slip-c.oiioioiiioooioio.download/#docs

const usePayment = () => {
  return <div>usePayment</div>;
};
export default usePayment;
