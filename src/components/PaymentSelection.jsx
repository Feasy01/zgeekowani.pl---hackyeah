import { Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function PaymentSelection({walletId}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    return(

        <>

<div className='flex bg-blue-800 p-8 px-16 rounded-3xl font-alexandria text-[24px] font-[600] text-white border-2 bg-gradient-to-br from-gradient_1 via-gradient_2 to-gradient_4 transition duration-500 hover:scale-105 hover:cursor-pointer' onClick={showModal}>Send ETH</div>
        
<Modal open={isModalOpen} onOk={handleOk} className="border-4 border-secondary_3 rounded-xl" centered onCancel={handleCancel} footer={null} width={900}>
      <div className="w-full h-full flex flex-col items-center gap-12 p-8">
      <span className="text-alexandria text-[28px] pt-8">What type of transaction would you like to perform?</span>
      <div className="grid grid-cols-2 p-8 gap-8 items-center justify-center">
      <Link to={`/transaction/${walletId}`}  className="flex items-center justify-center p-4 px-4 border-4 border-secondary_2 rounded-xl font-alexandria text-[24px] transition duration-300 hover:cursor-pointer hover:bg-secondary_1 hover:scale-105 hover:text-black ">Direct transaction</Link>
      <Link className="flex items-center justify-center p-4 px-4 border-4 border-secondary_2 rounded-xl font-alexandria text-[24px] transition duration-300 hover:cursor-pointer hover:bg-secondary_1 hover:scale-105 hover:text-black">Transaction using escrow</Link>
      </div>



      </div>
      
      </Modal>
        </>
    )
}