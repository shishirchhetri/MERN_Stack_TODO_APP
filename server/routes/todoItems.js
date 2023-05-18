const router = require('express').Router();
const todoModel = require('../models/todo');

//addng new item
router.post('/api/item',async(req,res)=>{
    try{
        const newItem = new todoModel({
            item: req.body.item
        })
        const saveItem = await newItem.save()
        res.status(200).json(saveItem)
    }
    catch(err){
        res.json(err);
    }
})

//get all items
router.post('/api/items', async(req,res)=>{
    try{
        const allTodoItems = await todoModel.find({});
        res.status(200).json(allTodoItems)
    }catch(err){
        res.json(err);
    }
})

//update items
router.put('/api/item/:id', async (req, res)=>{
  try{
    //find the item by its id and update it
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).json(updateItem);
  }catch(err){
    res.json(err);
  }
})
  


//delete item
  router.delete('/api/item/:id', async (req, res) => {
    try {
      const deletedItem = await todoModel.findByIdAndDelete(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json({msg:"Item deleted successfully"});
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  

module.exports = router;