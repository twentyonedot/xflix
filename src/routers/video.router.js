const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const videoValidation = require("../validations/video.validation");
const { videoController } = require("../controllers");

router.get(
  "/",
  validate(videoValidation.searchVideos),
  videoController.getVideos
);

router.get(
  "/:videoId",
  validate(videoValidation.getVideo),
  videoController.getVideo
);

router.post("/", validate(videoValidation.addVideo), videoController.addVideo);

router.patch(
  "/:videoId/views",
  validate(videoValidation.updateViews),
  videoController.changeViews
);

router.patch(
  "/:videoId/votes",
  validate(videoValidation.updateVotes),
  videoController.changeVotes
);

module.exports = router;
