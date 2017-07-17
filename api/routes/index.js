var router = require('koa-router')(),
  mongoose = require('mongoose'),
  Post = mongoose.model('Post');

router.get('posts', async function(ctx, next) {
  const page = ctx.query.page ? parseInt(ctx.query.page)-1 : 0

  ctx.body = {
    posts: await Post.find().sort({
      created_at: -1
    }).skip(page * 10).limit(10),
    total: Math.ceil((await Post.count())/10)
  };
});

router.post('post', async function(ctx, next) {
  try {
    const {body} = ctx.request;

    let post = await new Post(body).save();

    ctx.body = post;
  } catch (e) {
    ctx.throw(400, e);
  }
});

module.exports = router;
