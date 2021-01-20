var express = require('express');
const router = require('express').Router();

const getController = require('../../controller/company/get')
const postController = require('../../controller/company/post')
const updateController = require('../../controller/company/update')
const deleteController = require('../../controller/company/delete')

router.get('/get',getController.getcompany)  

router.post('/add',postController.postcompany)
//update
router.post('/update/:user',updateController.updatecompany)
router.patch('/update/:user/addcontact/add',updateController.addcontact)
router.patch('/update/:user/addaddress/add',updateController.addaddress)

// router.patch('/update/:id',updateController.updatecompany)

router.delete('/delete/:id',deleteController.deletecompany)


module.exports = router; 

  