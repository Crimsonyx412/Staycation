import React from "react";
import styled from "styled-components";
import { StarIcon } from "@heroicons/react/solid";
import {
  LocationMarkerIcon,
  CurrencyPoundIcon,
} from "@heroicons/react/outline";

export const CardItem = ({
  image,
  title,
  description,
  price,
  rating,
  location,
}) => {
  return (
    <CardContainer className="group cursor-pointer">
      <CardImage image={image} />

      <div className="flex flex-col px-6 py-4">
        <div className="flex items-center justify-between py-2">
          <h1 className="text-2xl font-bold text-indigo-900">{title}</h1>
          <p className="flex items-center gap-[3px] font-semibold text-indigo-700">
            <StarIcon className="h-6 w-6 text-yellow-500 fill-current" />
            {rating}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 pb-4">
          <p className="flex items-center gap-[8px] text-sm">
            <span className="bg-gray-700 rounded-full p-1">
              <LocationMarkerIcon className="h-5 w-5 text-white" />
            </span>
            {location}
          </p>
          <p className="flex items-center gap-[8px]">
            <span className="bg-gray-700 rounded-full p-1">
              <CurrencyPoundIcon className="h-5 w-5 text-white" />
            </span>
            {price}/night
          </p>
        </div>

        <p className="pt-2 pb-5 text-base">{description.substring(0, 65)}...</p>
      </div>

      <button className="rounded-md bg-indigo-600 text-white hover:bg-indigo-900 transition ease-in duration-200 p-4 group-hover:underline">
        View Details
      </button>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-left-radius: 20px;
  overflow: hidden;
`;

const CardImage = styled.div`
  background-image: url(${({ image }) => image || "/animations/airbnb-2.gif"});
  background-size: cover;
  background-position: center;
  height: 15rem;
  width: auto;
  border-top-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
`;
