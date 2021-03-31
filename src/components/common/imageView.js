import React, { useEffect, useState } from "react";
import { notFoundImageUrl } from "../../../utilities/generalUtility";

/**
 *
 * @param {string} src
 * @param {function} onClick
 * @returns react component
 */

const ImageView = ({ src, onClick }) => {
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    setFallback(false);
  }, [src]);

  return (
    <img
      src={!fallback ? src : notFoundImageUrl}
      width="auto"
      onError={() => setFallback(true)}
      onClick={!fallback ? onClick : null}
    />
  );
};

export default ImageView;
