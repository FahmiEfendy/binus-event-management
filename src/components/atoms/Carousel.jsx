import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

const CarouselComponent = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  return (
    <div
      id="eventRecommendationCarouselId"
      className="carousel slide"
      data-ride="carousel"
      onSelect={handleSelect}
    >
      <div className="carousel-inner">
        {data?.map((data, i) => {
          return (
            <div
              key={data[0]._id}
              className={`carousel-item ${currentIndex === i && "active"}`}
            >
              <div className="row justify-content-around w-75 mx-auto">
                <div className="card">
                  <img
                    className="card-img-top"
                    src={data[0].image.data ? `data:image/png;base64,${Buffer.from(data[0]?.image.data.data).toString("base64")}` : require("../../assets/logo-binus.png")}
                    style={{ height: "250px" }}
                    alt={data[0].title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{data[0].title}</h5>
                    <p className="card-text">{data[0].description}</p>
                    <button
                      type="button"
                      className="btn btn-primary px-4 mx-auto"
                      onClick={() => {
                        navigate(`/detail/${data[0]._id}`);
                      }}
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <a
        className="carousel-control-prev"
        href="#eventRecommendationCarouselId"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </a>
      <a
        className="carousel-control-next"
        href="#eventRecommendationCarouselId"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </a>
    </div>
  );
};

export default CarouselComponent;
