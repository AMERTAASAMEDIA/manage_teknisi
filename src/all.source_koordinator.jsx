// local 
const Server = "http://localhost:4000/api/";
// ONLINE 
// const Server = "http://77.37.47.90:4000/api/";


// DATA TICKET 
const getDataTicket = Server + `Tr_task/Trtask/getdata/`;
const getDetailTicket = Server + `Tr_task/Trtask/getbyid/`;
const createDataTicket = Server + `Tr_task/Trtask/create`;
const updateDataTicket = Server + `Tr_task/Trtask/updatebyid/`;


// DATA TEKNISI 
const getDataTeknisi = Server + `Master_pengguna/Masterpengguna/getdata/`;
const getDetailTeknisi = Server + `Master_pengguna/Masterpengguna/getbyid/`;
const createDataTeknisi = Server + `Master_pengguna/Masterpengguna/create`;
const updateDataTeknisi = Server + `Master_pengguna/MasterPengguna/updatebyid/`



export default {
    getDataTicket,
    getDetailTicket,
    createDataTicket,
    updateDataTicket,

    // Teknisi 
    getDataTeknisi,
    getDetailTeknisi,
    createDataTeknisi,
    updateDataTeknisi

}