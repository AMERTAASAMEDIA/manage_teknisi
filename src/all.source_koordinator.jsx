// local 
const Server = "http://localhost:4000/api/";
// ONLINE 
// const Server = "http://77.37.47.90:4000/api/";


// DATA TICKET 
const getDataTicket = Server + `Tr_task/Trtask/getdata/`;
const getDetailTicket = Server + `Tr_task/Trtask/getdatabyid/`;
const createDataTicket = Server + `Tr_task/Trtask/create`;
const updateDataTicket = Server + `Tr_task/Trtask/updatebyid/`;



export default {
    getDataTicket,
    getDetailTicket,
    createDataTicket,
    updateDataTicket
}