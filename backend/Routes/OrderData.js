const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
  try {
    let data = req.body.order_data;
    data.unshift({ Order_date: req.body.order_date });

    // Validate email
    if (!req.body.email || typeof req.body.email !== 'string') {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    let eId = await Order.findOne({ 'email': req.body.email });

    if (eId === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
      res.json({ success: true });
    } else {
      await Order.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } });
      res.json({ success: true });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

router.post('/myOrderData', async (req, res) => {
    try {
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router;
