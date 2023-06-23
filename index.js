import express, { urlencoded, json } from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

import sequelize from "./database.js";

import "./associations.js";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import categoryRoute from "./routes/category.js";

import seriesRoute from "./routes/Series/series.js";
import seasonRoute from "./routes/Series/season.js";
import episodeRoute from "./routes/Series/episode.js";
import favoriteRoute from "./routes/Series/favorite.js";
import actorSeriesRoute from "./routes/Series/actors.js";
import featureSeriesRoute from "./routes/Series/feature.js";

import movieRoute from "./routes/Movie/movie.js";
import seasonMovieRoute from "./routes/Movie/season.js";
import favoriteMovieRoute from "./routes/Movie/favorite.js";
import actorRoute from "./routes/Movie/actors.js";
import featureRoute from "./routes/Movie/feature.js";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(json());
app.use(cors());

const server = http.createServer(app);

// Routes
app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/category", categoryRoute);

app.use("/series", seriesRoute);
app.use("/series/season", seasonRoute);
app.use("/series/episode", episodeRoute);
app.use("/series/favorite", favoriteRoute);
app.use("/series/actor", actorSeriesRoute);
app.use("/series/feature", featureSeriesRoute);

app.use("/movie", movieRoute);
app.use("/movie/season", seasonMovieRoute);
app.use("/movie/favorite", favoriteMovieRoute);
app.use("/movie/actor", actorRoute);
app.use("/movie/feature", featureRoute);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
