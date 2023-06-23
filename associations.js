import Code from "./models/Code.js";
import User from "./models/User.js";
import Category from "./models/Category.js";

import Episode from "./models/Series/Episode.js";
import Series_Season from "./models/Series/Series_Season.js";
import Series from "./models/Series/Series.js";
import Series_Favorite_List from "./models/Series/Series_Favorite_List.js";
import ActorsSeries from "./models/Series/Actors.js";
import FeatureSeries from "./models/Series/Features.js";

import Movie_Favorite_List from "./models/Movie/Movie_Favorite_List.js";
import Movie_Season from "./models/Movie/Season_movie.js";
import Movie from "./models/Movie/Movie.js";
import Season from "./models/Movie/Season.js";
import Actors from "./models/Movie/Actors.js";
import Features from "./models/Movie/Features.js";

// User - Code
User.hasMany(Code, { foreignKey: "user_id" });
Code.belongsTo(User, { foreignKey: "user_id" });

////////////////////////////////////////////////////////////////////////////

// Series_Season - Episode
Series_Season.hasMany(Episode, { foreignKey: "season_id" });
Episode.belongsTo(Series_Season, { foreignKey: "season_id" });

// Category - Episode
Category.hasMany(Episode, { foreignKey: "category_id" });
Episode.belongsTo(Category, { foreignKey: "category_id" });

// Series - Series_Season
Series.hasMany(Series_Season, { foreignKey: "series_id" });
Series_Season.belongsTo(Series, { foreignKey: "series_id" });

// Category - Series
Category.hasMany(Series, { foreignKey: "category_id" });
Series.belongsTo(Category, { foreignKey: "category_id" });

// User - Series_Favorite_List
User.hasMany(Series_Favorite_List, { foreignKey: "user_id" });
Series_Favorite_List.belongsTo(User, { foreignKey: "user_id" });

// User - Series_Favorite_List
Series.hasMany(Series_Favorite_List, { foreignKey: "series_id" });
Series_Favorite_List.belongsTo(Series, { foreignKey: "series_id" });

// Series - Actors
Series_Season.hasMany(ActorsSeries, { foreignKey: "series_season_id" });
ActorsSeries.belongsTo(Series_Season, { foreignKey: "series_season_id" });

// Series - Feature
Series_Season.hasMany(FeatureSeries, { foreignKey: "series_season_id" });
FeatureSeries.belongsTo(Series_Season, { foreignKey: "series_season_id" });

////////////////////////////////////////////////////////////////////////////

// User - Movie_Favorite_List
User.hasMany(Movie_Favorite_List, { foreignKey: "user_id" });
Movie_Favorite_List.belongsTo(User, { foreignKey: "user_id" });

// Movie - Movie_Favorite_List
Movie.hasMany(Movie_Favorite_List, { foreignKey: "movie_id" });
Movie_Favorite_List.belongsTo(Movie, { foreignKey: "movie_id" });

// Category - Season
Category.hasMany(Season, { foreignKey: "category_id" });
Season.belongsTo(Movie, { foreignKey: "category_id" });

// Movie - Movie_Season
Movie.hasMany(Movie_Season, { foreignKey: "movie_id" });
Movie_Season.belongsTo(Movie, { foreignKey: "movie_id" });

// Season - Movie_Season
Season.hasMany(Movie_Season, { foreignKey: "season_id" });
Movie_Season.belongsTo(Season, { foreignKey: "season_id" });

// Category - Movie
Category.hasMany(Movie, { foreignKey: "category_id" });
Movie.belongsTo(Category, { foreignKey: "category_id" });

// Movie - Actors
Movie.hasMany(Actors, { foreignKey: "movie_id" });
Actors.belongsTo(Movie, { foreignKey: "movie_id" });

// Movie - Feature
Movie.hasMany(Features, { foreignKey: "movie_id" });
Features.belongsTo(Movie, { foreignKey: "movie_id" });
