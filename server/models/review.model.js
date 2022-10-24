const mongoose = require("mongoose");

const review = new mongoose.Schema({
  worker_id: {
    type: String,
  },
  order_id: {
    type: String,
  },
  order_title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

//리뷰 조회(worker_id조회)
review.statics.getReviewByWorkerId = async function (worker_id){
  return await this.find({ worker_id: worker_id });
};

//리뷰 조회(order_id조회)
review.statics.getReviewByOrderId = async function (order_id) {
  return await this.find({ order_id: order_id });
};

//리뷰 생성
review.statics.saveReview = async function (obj) {
  const newReview = new this({
    worker_id: obj.worker_id,
    order_id: obj.order_id,
    order_title: obj.order_title,
    content: obj.content,
  });
  return await newReview.save();
};

//리뷰 수정
review.statics.setReview = async function (review_id, content) {
  return await this.findOneAndUpdate(
    { review_id: review_id },
    { content: content },
    { new: true }
  );
};

//리뷰 삭제
review.statics.removeReview = async function (review_id) {
  await this.findByIdAndRemove(review_id);
};

review.statics.recentReview = async function () {
  return await this.find({}).sort({createdAt: -1}).limit(6);
}

module.exports = mongoose.model("Review", review);