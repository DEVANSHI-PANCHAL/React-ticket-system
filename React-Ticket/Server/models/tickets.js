import mongoose from 'mongoose';

const ticketSchema = mongoose.Schema({
  ticket_id: {type: String},
  ticket_description: {type: String},
  createdAt: {type: Date},
  updatedAt: {type: String},
  createdBy: {type: Object},
  resolved: {type: Boolean, default: false}
})

var Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;