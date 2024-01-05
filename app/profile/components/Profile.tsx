"use client";

import { useState } from "react";
import { FaAddressCard, FaHeart, FaHistory } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdReportProblem } from "react-icons/md";
import Address from "./Address";
import ChoiceButton from "./ChoiceButton";
import Favourites from "./Favourites";
import OrdersHistory from "./OrdersHistory";
import Personal from "./Personal";
import SupportTickets from "./SupportTickets";

enum activeComponentEnum {
  personal,
  address,
  favourites,
  ordersHistory,
  supportTickets,
}

const components = {
  [activeComponentEnum.personal]: <Personal />,
  [activeComponentEnum.address]: <Address />,
  [activeComponentEnum.favourites]: <Favourites />,
  [activeComponentEnum.ordersHistory]: <OrdersHistory />,
  [activeComponentEnum.supportTickets]: <SupportTickets />,
};

const Profile = () => {
  const [activeComponent, setActiveComponent] = useState<activeComponentEnum>(
    activeComponentEnum.personal,
  );

  return (
    <div className="mx-auto flex gap-4">
      <div className="w-1/3">
        <ChoiceButton
          title="Personal"
          icon={<FaAddressCard className="text-xl" />}
          handleClick={() => {
            setActiveComponent(activeComponentEnum.personal);
          }}
        />
        <ChoiceButton
          title="Address"
          icon={<FaMapLocationDot className="text-xl" />}
          handleClick={() => {
            setActiveComponent(activeComponentEnum.address);
          }}
        />
        <ChoiceButton
          title="Favourites"
          icon={<FaHeart className="text-xl" />}
          handleClick={() => {
            setActiveComponent(activeComponentEnum.favourites);
          }}
        />
        <ChoiceButton
          title="Orders history"
          icon={<FaHistory className="text-xl" />}
          handleClick={() => {
            setActiveComponent(activeComponentEnum.ordersHistory);
          }}
        />
        <ChoiceButton
          title="Support tickets"
          icon={<MdReportProblem className="text-xl" />}
          handleClick={() => {
            setActiveComponent(activeComponentEnum.supportTickets);
          }}
        />
      </div>
      <div className="w-full">{components[activeComponent]}</div>
    </div>
  );
};

export default Profile;
