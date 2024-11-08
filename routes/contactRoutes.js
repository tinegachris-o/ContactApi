const router = require("express").Router();
const {getAllContacts,getAContact,createContact,deleteContact,updateAcontact}=require('../controllers/contactController');
const errorHandler = require("../middleware/errorHandler");
const validToken = require("../middleware/validTokenHHandler");


router.use(validToken)

//get all contacts
//router.route("/").get(getAllContacts);

  
// get one contact
//router.route("/:id")
//create a new contact && get all contacts
router.route("/").post(createContact).get(getAllContacts);
//update a contact && delete a contact && get specific  one contact 
router.route("/:id").put(updateAcontact).delete(deleteContact).get(getAContact);

router.use(errorHandler)

//delete a contact

//router.route("/:id").

module.exports = router;
