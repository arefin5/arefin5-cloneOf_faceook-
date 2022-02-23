import { useContext } from "react";
import { UserContext } from "../../context";
import moment from "moment";
import { Avatar, List } from "antd";
import { useRouter } from "next/router";
import { imageSource } from "../../functins";
import Link from "next/link";


const People = ({ people, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();
  // console.log(people)
  return (
    <>
      {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={imageSource(user)} />}
              title={
                <div className="d-flex justify-content-between">
                 <Link href={`/user/${user.username}`}>
                 <a> {user.name}</a>
                 </Link>
                  {state &&
                  state.user &&
                  user.followers &&
                  user.followers.includes(state.user._id) ? (
                    <span
                      onClick={() => handleUnfollow(user)}
                      className="text-primary pointer"
                    >
                      Unfollow
                    </span>
                  ) : (
                    <span
                      onClick={() => handleFollow(user)}
                      className="text-primary pointer"
                    >
                      Follow
                    </span>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};
export default People;
