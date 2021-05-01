import mongoose from 'mongoose'

const tankSchema = new mongoose.Schema({ name: 'string', size: 'string' });
const Tank = mongoose.model('Tank', tankSchema);

export default Tank
