const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer')

app.use(express())
app.use(express.json())
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



mongoose.connect('mongodb+srv://manishankar:Newpassword123@cluster0.ii5gstz.mongodb.net/demo', {useNewUrlParser: true})
.then(() => console.log('Connected Successfully'))
.catch(() => console.log('Failed to Connected'))

const schema = new mongoose.Schema({
    firstname : {
        type : String
    },
    lastname : {
        type : String
    }
})

const model = mongoose.model('demo', schema);

app.post('/create', async(req, res) => {

    const firstname = req.body.firstname
    const lastname = req.body.lastname 
    console.log(firstname);
    console.log(lastname);
    try {
      await model.create({firstname : firstname, lastname : lastname})
    } catch (error) {
      if(error){
        res.send('Failed to insert')
      }
    }

 
})

app.get('/read', (req, res) => {
  model.find({}).then(data => res.status(200).send(data)) 
})

app.delete('/delete/:id', async(req, res) => {
  const   id = req.params.id
  console.log(id);
  await model.findByIdAndDelete({_id : id})
  .then(() => console.log('Deleted'))
})

app.listen(3001, () => console.log('Listening on port 3000'))

