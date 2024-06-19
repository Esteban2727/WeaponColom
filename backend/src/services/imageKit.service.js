import pool from "../Database/poolConnection.js";
import ImageKit from "imagekit";
import dotenv from "dotenv";
import { readFileSync } from "fs";
dotenv.config();

const imagekit = new ImageKit({
  urlEndpoint: "https://ik.imagekit.io/zhofryftw/",
  privateKey: "private_4Z7HJQEK+supy2i1iaJeqUih46w=",
  publicKey: "public_dcbpekTh52I3zCoC1+5ZuvE1XhQ=",
});

const migrateImages = async () => {
  const client = await pool.connect();

  const result = await client.query("SELECT codigo,imagen from producto");

  let k = 1;
  for (let i = 1000; i < 1020; i++) {
    try {
      const file = readFileSync(`./imagenes/${k}.jpg`);
  
       const resutl_ = await imagekit.upload({
        fileName: i,
        file,
        folder:'images'
      });
      console.log(resutl_.url); 

        await client.query('UPDATE producto SET url_image = $1 WHERE codigo = $2 ;',[resutl_.url,i])

      k+=1
    } catch (error) {
      console.log(error);
    }
  }

  await client.release();
};

migrateImages();
