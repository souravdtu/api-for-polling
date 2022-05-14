
const express = require('express');
const router = express.Router();

const Questions = require('../models/question');

router.get('/questions', (req,res) => {
    Questions.find({},function(err,questions){
        if(err){
            return console.log('error in fetching  questions'); 
        }
        return res.send(questions);
    });
});
router.get('/questions/:id', (req,res) => {
    console.log(req.params.id)
    Questions.find({_id: req.params.id},function(err,questions){
        if(err){
            return console.log('error in fetching  questions'); 
        }
        return res.send(questions);
    });
});

router.post('/questions/create', (req,res) => {
    if(!req.body.title){
        res.status(400).send('title is required');
        return;
    }
    Questions.create({
        title: req.body.title
    }, function(err,newContact){
        if(err){
            console.log('error in creating a contact',err);
            return;
        }
        console.log('########',newContact);
        res.redirect('/questions');
        return;
    });
});

router.delete('/questions/:id/delete', (req,res)=>{
    Questions.findOneAndDelete({_id: req.params.id},function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        };
        res.redirect('/questions');
            return;
    });
});


router.post('/questions/:id/options/create', async (req,res) => {
    if(!req.body.text){
        res.status(400).send('text is required');
        return;
    }
        const date = Date.now().toString();
        const opt = {
            id: date,
            text: req.body.text,
            votes: 0,
            link_to_vote: `/questions/${req.params.id}/options/${date}/add_vote`
        }
        await Questions.findOneAndUpdate({_id: req.params.id},
            {
                $push: {
                    options: opt
                }
            }
            );
            res.redirect('/questions');
            return;
});


router.delete('/questions/:id/options/:ido/delete',async (req,res)=>{
    const opt = {id : req.params.ido}

    await Questions.findOneAndUpdate({_id: req.params.id},
        {
            $pull: {
                options: opt
            }
        }
        );
        res.redirect('/questions');
        return;

});

router.get('/questions/:id/options/:ido/add_vote', async (req,res)=>{
    const opt = req.params.ido;
    await Questions.findOneAndUpdate({_id: req.params.id,"options.id":opt},
        {
            $inc:{
                "options.$.votes":1
            }
        }
        );
        res.redirect('/questions');
        return;


});





module.exports = router;