/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { clearError } from "../../redux/actions/roomAction";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RoomFeature } from "./RoomFeature";

export const RoomDetails = () => {
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setDaysOfStay] = useState();

  const dispatch = useDispatch();
  const {
    room: { room: details },
    error,
  } = useSelector((state) => state.roomDetails);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onChange = (dates) => {
    // eslint-disable-next-line no-shadow
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      // CALCULATE DAYS OF STAY

      const days = Math.floor(
        (new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1
      );

      setDaysOfStay(days);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(`🦄 ${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch(clearError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container container-fluid">
        <h2 className="mt-5">{details.name}</h2>
        <p>{details.address}</p>

        <div className="ratings mt-auto mb-3">
          <div className="rating-outer">
            <div className="rating-inner" />
          </div>
          <span id="no_of_reviews">
            (
            {`${details.numOfReviews} ${
              details.numOfReviews > 1 ? "Reviews" : "Review"
            }`}
            )
          </span>
        </div>

        <Slider {...settings}>
          {details.images.map((image) => {
            const { _id: id } = image;
            return (
              <div key={id}>
                <img
                  src={image.url}
                  className="d-block w-100 property-details-image m-auto"
                  alt="Hotel"
                />
              </div>
            );
          })}
        </Slider>

        <div className="row my-5">
          <div className="col-12 col-md-6 col-lg-8">
            <h3>Description</h3>
            <p>{details.description}</p>

            <RoomFeature details={details} />
          </div>

          <div className="col-12 col-md-6 col-lg-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>${details.pricePerNight}</b> / night
              </p>

              <hr />
              <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>

              <DatePicker
                className="w-100"
                selected={checkInDate}
                onChange={onChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                selectsRange
                inline
              />

              <button className="btn btn-block py-3 booking-btn">Pay</button>
            </div>
          </div>
        </div>

        {details.numOfReviews !== 0 && (
          <div className="reviews w-75">
            <h3>Reviews:</h3>
            <hr />
            <div className="review-card my-3">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(details.ratings / 5) * 100}%` }}
                />
              </div>
              <p className="review_user">by John</p>
              <p className="review_comment">Good Quality</p>

              <hr />
            </div>

            <div className="review-card my-3">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(details.ratings / 5) * 100}%` }}
                />
              </div>
              <p className="review_user">by John</p>
              <p className="review_comment">Good Quality</p>

              <hr />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
