const noteCtrl = require('../controllers/noteCtrl');
const auth = require('../middleware/auth');
const router = require('express').Router();

router.route('/')
    .get(auth, noteCtrl.getNotes)
    .post(auth, noteCtrl.creatNotes)
router.route('/:id')
    .get(auth, noteCtrl.getNote)
    .put(auth, noteCtrl.updateNote)
    .delete(auth, noteCtrl.deleteNote)



module.exports = router;