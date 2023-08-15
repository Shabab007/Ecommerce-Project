import React from "react";
import { Grid, Image1, Image2, Image3, Image4, Flash } from "./gallerystyle.js";
import flash from "../../Images/flash.jpg";
import big from "../../Images/big.jpg";

const Gallery = () => {
  return (
    <Grid>
      <Image1>
        <Flash src={big} />
      </Image1>
      <Image2>
        <Flash src={flash} />
      </Image2>
      <Image3> </Image3>
      <Image4> </Image4>
    </Grid>
  );
};

export default Gallery;
