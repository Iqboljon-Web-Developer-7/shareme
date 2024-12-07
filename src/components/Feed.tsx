import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { searchQuery, feedQuery } from "../utils/data";

const Feed = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);

  const { categoryID } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryID) {
      const query = searchQuery(categoryID);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryID]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  if (!pins?.length) return <h2>No pins available</h2>;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
