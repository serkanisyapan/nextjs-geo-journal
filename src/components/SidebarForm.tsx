import { useState } from 'react';
import TravelLogForm from './TravelLogForm';

export default function SidebarForm() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleClose = () => setOpenSidebar(false);

  return (
    <>
      <div className="fixed top-2 right-2 z-[999]">
        <button onClick={() => setOpenSidebar(true)} className="btn btn-info">
          + New Log
        </button>
      </div>
      {openSidebar && (
        <div className="fixed h-full top-0 right-0 p-4 w-80 bg-base-100 text-base-content z-[999] overflow-y-auto">
          <TravelLogForm onClose={handleClose} onComplete={handleClose} />
        </div>
      )}
    </>
  );
}
