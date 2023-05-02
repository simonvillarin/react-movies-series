import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Skeleton,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { POSTER_IMG } from "env";
import { getFilterResult, getGenres } from "../services/ExternalAPIService";
import Card from "../components/Card";
import Appbar from "../components/Appbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const FilterResult = () => {
  const { genreIds, category } = useParams();
  const [filterResult, setFilterResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [isGenresShow, setIsGenresShow] = useState(false);
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    getFilterResult(category, genreIds)
      .then((res) => setFilterResult(res.data.results))
      .catch((err) => console.log(err));

    getGenres(category)
      .then((res) => setGenres(res.data.genres))
      .catch((err) => console.log(err));

    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [filterResult]);

  const handleSelectedGenres = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((v) => v !== value));
    }
  };

  const handleFilter = () => {
    if (selectedGenres.length >= 1) {
      navigate(`/${category}/genre/${selectedGenres}`);
      setSelectedGenres([]);
      setIsGenresShow(!isGenresShow);
    } else {
      navigate(`/home`);
      setIsGenresShow(!isGenresShow);
    }
  };

  return (
    <React.Fragment>
      <Appbar />
      <Container>
        <div className="genre">
          {!loading ? (
            <Skeleton
              animation="wave"
              width="23%"
              sx={{ mt: 10, mb: 3, height: 60 }}
            >
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <Typography
              variant="h5"
              sx={{
                mt: 11,
                mb: 3,
                pl: 2,
                borderLeft: "4px solid  #ff4c4c",
                borderRadius: "0.25rem",
              }}
            >
              FILTER RESULT
            </Typography>
          )}
          <button
            className="filter-btn"
            onClick={() => setIsGenresShow(!isGenresShow)}
          >
            Filter
          </button>
          <div>
            {" "}
            {isGenresShow ? (
              <div className="genre-container">
                <Typography variant="h6">Genres</Typography>
                <div className="genre-content-container">
                  {genres.map((genre) => (
                    <div key={genre.id} className="genre-content">
                      <FormControlLabel
                        className="checkbox-label"
                        control={
                          <Checkbox
                            value={genre.id}
                            onChange={(e) => {
                              handleSelectedGenres(e);
                            }}
                            defaultChecked={genreIds.includes(genre.id)}
                          />
                        }
                        label={
                          <Typography paragraph className="genre-name">
                            {genre.name}
                          </Typography>
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="selection-btn-container">
                  <button
                    className="selection-btn"
                    onClick={() => handleFilter()}
                  >
                    Filter
                  </button>
                  <button
                    className="selection-btn"
                    style={{ backgroundColor: "#c4c4c4" }}
                    onClick={() => {
                      setIsGenresShow(!isGenresShow);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <div className="card-container">
            {!loading
              ? filterResult.map((show) => (
                  <Box key={show.id}>
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      sx={{ height: 270, width: 208, borderRadius: 2 }}
                    ></Skeleton>
                    <Skeleton width="100%" sx={{ height: 35 }}>
                      <Typography>.</Typography>
                    </Skeleton>
                  </Box>
                ))
              : filterResult.map((show) => (
                  <Card
                    key={show.id}
                    id={show.id}
                    poster={
                      `${POSTER_IMG}${show.poster_path}` ||
                      `${POSTER_IMG}${show.backdrop_path}`
                    }
                    title={show.title || show.name}
                    type={category}
                  />
                ))}
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default FilterResult;
