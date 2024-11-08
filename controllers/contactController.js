const asyncHandler = require("express-async-handler");
const Contact = require("../Models/contactModel");
const { constants } = require("../constants");
//@desc Get all contacts
//@route Get /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find({user_id:req.user.id});
  res.status(200).json(contacts);
});

//@desc Get a contact
//@route Get /api/contacts/:id
//@access private
const getAContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(constants.NOT_FOUND);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});
//672ba2a3cff11cd1ed65e9e7
//@desc create new contacts
//@route Post /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    //const error=new Error("All Fields are necessarily")
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id, // Ensure this field is populated

  });
  res.status(201).json(contact);
});
//@desc delete contact
//@route delete /api/contacts
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  //const {id}=req.params.id
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if(contact.user_id.toString() !==req.user.id){
    res.status(403)
    throw new Error("you can only delete your contact")
  }
await contact.deleteOne({_id:req.params.id})
  res.status(200).json({msg:"this contact has been deleted", contact});
});
//@desc update a  contact
//@route Put /api/contacts
//@access private
const updateAcontact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json("contact not found");
  }
  if(contact.user_id.toString() !==req.user.id){
    res.status(403)
    throw new Error("you can only update your contact")
  }


  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(201).json(updatedContact);
});

module.exports = {
  getAContact,
  createContact,
  deleteContact,
  updateAcontact,
  getAllContacts,
};
