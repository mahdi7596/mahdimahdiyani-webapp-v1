import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "شما مجاز به ایجاد یک پست نیستید."));
  }

  if (!req.body.title || !req.body.content) {
    return next(
      errorHandler(400, "لطفاً تمام فیلدهای مورد نیاز را ارائه دهید.")
    );
  }

  // Remove ZWNJ characters
  let title = req.body.title.replace(/\u200C/g, "");
  const slug = title.split(" ").join("-");
  // let encodedUrl = encodeURIComponent(url);

  // ! todo این رو نوشته بودم برای اینکه فقط متن انگلیسی باشه ولی باید یک فیلد برای نامک اضافه کنم
  // .replace(/[^a-zA-Z0-9-]/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    // first we want to get the posts, for example we want to show a number of posts and then click on show more button and see the rest of them
    // so we want to have a start index, we want to see from which post we have to start fetching, so we are going to have a start index
    // and its going to be a number and first we want to convert it to an integer and we want to get it from request dot query so its
    // going to be along with the request we want to send it, for example we want to start from 9, from 10 or if there is nothing we want to
    // start from 0 so thats why i have written this code ==> req.query.startIndex) || 0
    const startIndex = parseInt(req.query.startIndex) || 0;
    // then we want to limit it, for example we dont want to show all the posts,we want to limit it, so first we want to convert it to
    // number and if there is nothing i just want to use 9 because in home page i want to show 9 posts / each row 3 posts but you can use
    // any number of posts as you like
    const limit = parseInt(req.query.limit) || 9;
    // then we want to sort it by direction, we want to sort it in ascending or descending order, newest or oldest....and i will tell why
    // i have used 1 and -1 because when we want to get the response if we use 1 mongoDB is going to show the ascending and -1 is going to
    // show the descending
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    // after that we want to create the posts and this is going to be from our posts model and we want to use a method called find
    // we should keep this in mind that there are going to be different situations, it can be a post from the user it can be a post from
    // category or slug or postID
    const posts = await Post.find({
      // so we just use spread operator (...) and we say if the request dot query has the userId because we want to get the post for a user
      // a specific person, then we want to search and set the userId to this req.query.userId
      ...(req.query.userId && { userId: req.query.userId }),
      // we want to do the samething for the category
      ...(req.query.category && { category: req.query.category }),
      // we want to do the samething for the slug
      ...(req.query.slug && { slug: req.query.slug }),
      // we want to do the samething for the postId and because in mongoDB the id is written in this form _id thats why i have written _id
      ...(req.query.postId && { _id: req.query.postId }),
      // the next thing is going to be a searchTerm, and we want to search between title and content so thats why we have used or
      // and or will allow us to search between two places and we have used regex because regex will search in title and we have given it a
      // option which is 'i' and it means that lowercase and uppercase is not important
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      // and we have added sort / skip / limit and we have sorted based on updatedAt
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    //  we have written this to get the total posts
    const totalPosts = await Post.countDocuments();

    var start = new Date();
    var y = start.getFullYear();

    // get posts submitted in last month
    const now = new Date(); // Define 'now' before using it
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    // submitting
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    // ! todo hvat to fix this
    next(error);
    console.log(error);
  }
};

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "شما مجاز به حذف این پست نیستید."));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("پست حذف شده است.");
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "شما مجاز به به‌روزرسانی این پست نیستید."));
  }
  try {
    // console.log("test");
    // console.log(req.params.postId);
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
