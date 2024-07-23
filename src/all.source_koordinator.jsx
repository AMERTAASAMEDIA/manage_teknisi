// local 
const Server = "http://localhost:4000/api/";
// ONLINE 
// const Server = "http://77.37.47.90:4000/api/";


// DATA TICKET 
const getDataTicket = Server + `Tr_task/gettask/`;
const getDetailTicket = Server + `Tr_task/gettaskbyid/`;
const createDataTicket = Server + `Tr_task/createtask`;
const updateDataTicket = Server + `Tr_task/updatetrtask/`;



export default {
    getDataTicket,
    getDetailTicket,
    createDataTicket,
    updateDataTicket
}