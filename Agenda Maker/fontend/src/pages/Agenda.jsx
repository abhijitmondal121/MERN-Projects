import React, { useState } from "react";
import Navbar from "../component/Navbar";
import BasicModal from "../component/BasicModal";
import Carousel from "../component/Carousel";
import AgendaList from "../component/AgendaList";
import { useEffect } from "react";

const Agenda = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showAgendaList, setShowAgendaList] = useState(false); // ✅ track state

  // useEffect(()=>{
  //   setShowAgendaList(true);
  // },[onViewAgendaClick])

  return (
    <>
      <Navbar onAddAgendaClick={handleOpen} onViewAgendaClick={() => setShowAgendaList(true)} />

      <Carousel />
      <BasicModal open={open} handleClose={handleClose} />
      {/* <AgendaList />   */}
      
     {showAgendaList ? (
        <AgendaList />
         ) : (
         <></>
        )
     }
     

    </>
  );
};

export default Agenda;
