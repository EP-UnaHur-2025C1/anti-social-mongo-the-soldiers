const { Router } = require("express");
const controllers = require("../controllers/main");
const commentControllers = controllers.comment;

const { commentValidation } = require("../middleware/main");


const router = Router();

router.get("/", commentControllers.getComments);
router.get("/perMonth", commentControllers.getCommentsPerMonth);
router.get("/:id",
    commentValidation.validateCommentId,
    commentControllers.getComment
);
router.post("/",
    commentValidation.validateCreateComment,
    commentControllers.createComment
);
router.put("/:id",
    commentValidation.validateCommentId,
    commentValidation.validateUpdateComment,
    commentControllers.editComment
);
router.delete("/:id",
    commentValidation.validateCommentId,
    commentControllers.deleteComment
);

module.exports = router;