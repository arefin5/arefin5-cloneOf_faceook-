import { useContext } from "react";
import { UserContext } from "../../context";
import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage.js";
import { imageSource } from "../../functins";

import {
  HeartOutlined,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";

const Post = ({
  post,
  handleDelete,
  handleLike,
  commentCount = 10,
  handleUnlike,
  handleComment,
  removeComment,
}) => {
  // console.log("Post list=><", posts);
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  return (
    <>
      {post && post.postedBy && (
        <div className="card mb-5" key={post._id}>
          <div className="card-header">
            {/* <Avatar size={40}>{post.postedBy.name[0]}</Avatar> */}
            <Avatar size={80} src={imageSource(post.postedBy)} />

            {""}
            <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
              {post.postedBy.name}
            </span>
            <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="card-body">{renderHTML(post.content)}</div>
          <div className="card-footer">
            {post.image && <PostImage url={post.image.url} />}
            <div className="d-flex pt-2">
              {state &&
              state.user &&
              post.likes &&
              post.likes.includes(state.user._id) ? (
                <HeartFilled
                  onClick={() => handleUnlike(post._id)}
                  className="text-danger pt-2 h5 px-2"
                />
              ) : (
                <HeartOutlined
                  onClick={() => handleLike(post._id)}
                  className="text-danger pt-2 h5 px-2"
                />
              )}

              <div className="pt-2 pl-3" style={{ marginRight: "1rem" }}>
                {post.likes.length} likes
              </div>

              <CommentOutlined
                onClick={() => handleComment(post)}
                className="text-danger pt-2 h5 px-2"
              />

              <div className="pt-2 pl-3">
                {" "}
                <Link href={`/post/${post._id}`}>
                  <a>{post.comments.length} comments</a>
                </Link>
              </div>

              {state && state.user && state.user._id === post.postedBy._id && (
                <>
                  {" "}
                  <EditOutlined
                    onClick={() => router.push(`/user/post/${post._id}`)}
                    className="text-danger pt-2 h5 px-2 mx-auto"
                  />
                  <DeleteOutlined
                    className="text-danger pt-2 h5 px-2"
                    onClick={() => handleDelete(post)}
                  />
                </>
              )}
            </div>
          </div>
          {/* 2 comments */}
          {post.comments && post.comments.length > 0 && (
            <ol className="list-group" style={{ maxHeight: "125px", overflow: "scroll" }}>
              {/* start map comment  */}
              {post.comments.slice(0, commentCount).map((c) => (
                <li
                  key={c._id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div>
                      <Avatar
                        size={20}
                        className="mb-1 mr-3"
                        src={imageSource(c.postedBy)}
                      />
                      &nbsp;{c.postedBy.name}
                    </div>
                    <i className="text-muted">{c.text}</i>
                  </div>
                  {/* date */}
                  <span className="badge rounded-pill text-muted">
                    {moment(c.created).fromNow()}
                    {state && state.user._id === c.postedBy._id && (
                      <DeleteOutlined
                        className="text-danger pt-2 h5 px-2 pointer"
                        onClick={() => removeComment(post._id, c)}
                      />
                    )}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </>
  );
};
export default Post;
