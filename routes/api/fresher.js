// var express = require('express');
const router = require('express').Router();

const getController = require('../../controller/fresher/get')
const postController = require('../../controller/fresher/post')
const updateController = require('../../controller/fresher/update')
const deleteController = require('../../controller/fresher/delete')

router.get('/get',getController.getfresher)
router.post('/add',postController.postfresher)
    
//update
router.post('/update/:user',updateController.updatefresher)
router.patch('/update/:user/education/add',updateController.addeducation)
router.post('/update/:user/education/update/:educationid',updateController.updateeducation)
router.patch('/update/:user/experience/add',updateController.addexperience)
router.patch('/update/:user/experience/update/:experienceid',updateController.updateexperience)

  
//delete
router.delete('/delete/:id',deleteController.deletefresher)
router.delete('/delete/:fresherid/education/:educationid',deleteController.deleteeducation)
router.delete('/delete/:fresherid/education/:experienceid',deleteController.deleteexperience)

module.exports = router;       