import { useContext } from "react";
import { UserContext } from "../../context";
import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage.js";
import { imageSource } from "../../functins";
import Post from "./Post";
import {
  HeartOutlined,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";
const PostList = ({
  posts,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  removeComment
}) => {
  // console.log("Post list=><", posts);
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Post
           key={post._id}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            handleComment={handleComment}
            post={post}
            removeComment={removeComment}
            
          />
        ))}
    </>
  );
};
export default PostList;
