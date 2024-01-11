"use client";

import { useState } from "react";
import { FaAddressCard, FaHeart, FaHistory, FaKey } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdReportProblem } from "react-icons/md";
import Address from "./Address";
import ChangePassword from "./ChangePassword";
import ChoiceButton from "./ChoiceButton";
import Favourites from "./Favourites";
import OrdersHistory from "./OrdersHistory";
import Personal from "./Personal";
import SupportTickets from "./SupportTickets";

enum activeComponentEnum {
  personal,
  changePassword,
  address,
  favourites,
  ordersHistory,
  supportTickets,
}

const components = {
  [activeComponentEnum.personal]: <Personal />,
  [activeComponentEnum.changePassword]: <ChangePassword />,
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
          title="Change password"
          icon={<FaKey className="text-xl" />}
          handleClick={() => {
            setActiveComponent(activeComponentEnum.changePassword);
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
