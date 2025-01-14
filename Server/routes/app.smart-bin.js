const SmartBinModel = require('../models/smart-bin.model');

module.exports = (app) => {
    app.get('/smart-bin/getFullBinBy', async (req, res)=>{
        const data = req.query;
        const _res = await SmartBinModel.getFullBinBy(data)
        res.send(_res)
    })

    app.get('/smart-bin/InsertFullBinBy', (req, res)=>{
        console.log("inserting...");
        
        res.send(SmartBinModel.InsertFullBinBy())
    })
}