import React from "react";
import { getSession } from "next-auth/client";

import { getMyBookings } from "../../redux/actions/bookingAction";
import { Layout } from "../../components/Layout/Layout";
import { MyBooking } from "../../components/Booking/MyBooking";
import { wrapper } from "../../redux/store";

// TODO: NOT PERMANENT LATER WILL BE CHANGE LATER

const MyBookingPage = () => {
  return (
    <Layout title="My Booking | staycation.com">
      <main className="max-w-6xl mx-auto pb-32">
        <MyBooking />
      </main>
    </Layout>
  );
};

// HANDLING => protected routes in the server side
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });

      // RUN => there is no user in session
      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }

      // SENDING COOKIE TO THE BACK-END => THERE IS NO SESSION AT THE MOMENT
      await store.dispatch(getMyBookings(req.headers.cookie, req));

      return {
        props: {
          session,
        },
      };
    }
);

export default MyBookingPage;
