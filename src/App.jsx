import Modal from "./components/Modal.jsx"
import './App.css'
import BidModal from './components/BidModal.jsx'
import Navbar from './components/Navbar'
import Table from "./components/Table.jsx"
import { useState } from 'react'

import {Amplify} from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsmobile from './aws-exports';

Amplify.configure(awsmobile);

function App({ user, signOut }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalData,setModalData] = useState("")


  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Authenticator>
    {/* <button onClick={() => setOpen(true)}>Open Modal</button> */}
    <Navbar setOpen={setOpen} setSearch={setSearch} user={user} signOut={signOut} />
    <BidModal open={open} onClose={() => setOpen(false)} />
    <Table search={search} handleOpen={handleOpen} setModalData={setModalData} />
    <Modal handleOpen={handleOpen} handleClose={handleClose} openModal={openModal} modalData={modalData} />
    </Authenticator>
  )
}

// export default App

export default withAuthenticator(App,{
  hideSignUp: true
})
