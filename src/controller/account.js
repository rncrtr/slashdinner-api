import mongoose from 'mongoose';
import { Router } from 'express';
import Account from '../model/account';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';

import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

export default ({config, db}) => {
    let api = Router();
    
    // routes here start with v1/account/
    
    // POST /v1/account/register
    api.post('/register',(req, res) => {
        Account.register(new Account({username: req.body.email}),req.body.password, function(err, account){
           if(err){
               res.send(err);
           } 
           passport.authenticate(
               'local',{
                   session: false
               }
           )(req,res, () =>{
               res.status(200).send('Successfully created new account.');
           })
        });
    });
    
    
    // POST /v1/account/login
    api.post('/login',passport.authenticate(
        'local', {
            session: false,
            scope: []
        }),
        generateAccessToken, respond
    );
    
    // GET /v1/account/logout
    api.get('/logout',authenticate, (req,res) => {
       res.logout();
       res.status(200).send('Successfully logged out.');
    });
    
    api.get('/me',authenticate, (req,res) => {
        res.status(200).json(res.user);
    });
    
    
    return api;
}