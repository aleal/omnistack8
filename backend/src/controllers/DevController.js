const axios = require("axios");
const Dev = require("../models/Dev");
module.exports = {
  async index(req, res) {
    const { user } = req.headers;
    const logged = await Dev.findById(user);
    const users = await Dev.find({ 
      $and: [
        {_id: {$ne: logged._id} },
        {_id: {$nin: logged.likes}},
        {_id: {$nin: logged.dislikes}}
      ]
    });
    return res.json(users);
  },
   async store(req, res) {
     const { username } = req.body;
     console.log(">>>>>>>>>>>>>>",username);
     const dbDev = await Dev.findOne({user: username});
     if (dbDev) {
        return res.json(dbDev);
     }
     const response = await axios.get(`https://api.github.com/users/${username}`);
     
     const {name, bio, avatar_url: avatar} = response.data;

     const dev = await Dev.create({
       user: username,
       name,
       bio,
       avatar
     });

     return res.json(dev);
   }
};