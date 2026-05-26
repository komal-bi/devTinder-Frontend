import React, { useEffect } from "react";
import { GET_FEED_LIST } from "../utils/apiUrl";
import { useDispatch, useSelector } from "react-redux";
import { addFeedList } from "../utils/feedReducer";
import FeedUser from "./FeedUser";
import axios from "axios";

const Feed = () => {
  const dispatch = useDispatch();
  let feedList = useSelector((state) => state.feed.list);

   const fetchFeed = async () => {
    try {
      let list = await axios.get(GET_FEED_LIST, {withCredentials:true});
      dispatch(addFeedList(list.data));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);  

  return (
    <>
      {feedList=null ||feedList?.length == 0 ? (
        "No feed to show"
      ) : (
        <FeedUser user={feedList?.[0]} />
      )}
    </>
  );
};

export default Feed;
