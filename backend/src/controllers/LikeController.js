const Dev = require("../models/Dev");

module.exports = {
   async store(req, res) {
      const { devId }  =  req.params;
      const { user } = req.headers;
      const logged = await Dev.findById(user);
      const target = await Dev.findById(devId);
      if(!target) {
        return res.status(400).json({error: 'Dev does not exist!'})
      }

      if (target.likes.includes(logged._id)) {
          console.log("MATCH!!!!!!!!!!");
      }

      logged.likes.push(target._id);

      await logged.save();

      return res.json(logged);
   }
};