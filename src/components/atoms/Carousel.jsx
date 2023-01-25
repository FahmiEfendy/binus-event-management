import { useNavigate } from "react-router-dom";

const CarouselComponent = () => {
  const navigate = useNavigate();

  const eventDetailHandler = () => {
    navigate("/example-event-path");
  };

  return (
    <div
      id="eventRecommendationCarouselId"
      className="carousel slide"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row justify-content-around w-75 mx-auto">
            <div className="card">
              <img
                className="card-img-top"
                src={require("../../assets/logo-binus.png")}
                style={{ height: "250px" }}
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title">Event Title 1</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
                <button
                  type="button"
                  className="btn btn-primary px-4 mx-auto"
                  onClick={eventDetailHandler}
                >
                  View Detail
                </button>
              </div>
            </div>
            <div className="card">
              <img
                className="card-img-top"
                src={require("../../assets/logo-binus.png")}
                style={{ height: "250px" }}
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title">Event Title 2</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
                <button
                  type="button"
                  className="btn btn-primary px-4 mx-auto"
                  onClick={eventDetailHandler}
                >
                  View Detail
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row justify-content-around w-75 mx-auto">
            <div className="card">
              <img
                className="card-img-top"
                src={require("../../assets/add-image.png")}
                style={{ height: "250px" }}
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title">Event Title 3</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
                <button
                  type="button"
                  className="btn btn-primary px-4 mx-auto"
                  onClick={eventDetailHandler}
                >
                  View Detail
                </button>
              </div>
            </div>
            <div className="card">
              <img
                className="card-img-top"
                src={require("../../assets/add-image.png")}
                style={{ height: "250px" }}
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title">Event Title 4</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
                <button
                  type="button"
                  className="btn btn-primary px-4 mx-auto"
                  onClick={eventDetailHandler}
                >
                  View Detail
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row justify-content-around w-75 mx-auto">
            <div className="card">
              <img
                className="card-img-top"
                src={require("../../assets/login-image.jpg")}
                style={{ height: "250px" }}
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title">Event Title 5</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
                <button
                  type="button"
                  className="btn btn-primary px-4 mx-auto"
                  onClick={eventDetailHandler}
                >
                  View Detail
                </button>
              </div>
            </div>
            <div className="card">
              <img
                className="card-img-top"
                src={require("../../assets/login-image.jpg")}
                style={{ height: "250px" }}
                alt="Card cap"
              />
              <div className="card-body">
                <h5 className="card-title">Event Title 6</h5>
                <p className="card-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>
                <button
                  type="button"
                  className="btn btn-primary px-4 mx-auto"
                  onClick={eventDetailHandler}
                >
                  View Detail
                </button>
              </div>
            </div>
          </div>
        </div>
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
