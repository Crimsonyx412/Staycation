import { useSelector } from "react-redux";
import { RoomDetails } from "../../components/Room/RoomDetails";
import { Layout } from "../../components/Layout/Layout";

import { getRoomDetails } from "../../redux/actions/roomAction";
import { wrapper } from "../../redux/store";

export default function RoomDetailsPage() {
  const {
    room: { room: details },
  } = useSelector((state) => state.roomDetails);

  return (
    <Layout title={`${details.name} | staycation.com`}>
      <RoomDetails />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      await store.dispatch(getRoomDetails(req, params.id));
    }
);
