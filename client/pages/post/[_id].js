import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import { toast } from "react-toastify";
import Post from "../../components/cards/Post";
import Link from "next/link";
import {RollbackOutlined} from '@ant-design/icons'
const PostComments = () => {
  const [post, setPost] = useState({});
  //   state
  const router = useRouter();
  const _id = router.query._id;
  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);
      setPost(data);
      // console.log("post");
    } catch (err) {
      console.log(err);
    }
  };
  const removeComment = async (postId,comment) => {
    //
    // console.log(postId,comment);
    const answer = window.confirm("Are you sure you want to delete this comment?");
    if (!answer) return;
    try {
      const { data } = await axios.put(`remove-comment`,{postId,comment});
      // console.log(data);
      fetchPost();
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Newsfeed</h1>
        </div>
      </div>

      <div className="row col-md-8 offset-md-2">
        {/* <pre>{JSON.stringify(post, null, 4)}</pre>  */}
        <Post post={post} commentCount={100} removeComment={removeComment}/>
      </div>
      <Link href="/user/dashboard">
        <a className="d-flex justify-content-center pt-5">
          <RollbackOutlined />
        </a>
      </Link>
    </div>
  );
};
export default PostComments;
