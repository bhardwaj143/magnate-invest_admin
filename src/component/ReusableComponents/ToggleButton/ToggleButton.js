import React, { useState } from "react";
import Switch from "react-switch";
import ToggleButtonModal from "../CustomModal/ToggleButtonModal/ToggleButtonModal";
import ToggleNotification from "../Toggle Notifications/ToggleNotification";

const ToggleButton = (props) => {
  const [checked, setChecked] = useState(
    props.status === 0 ? false : props.status === 1 ? true : false
  );
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const onChangeHandler = (e) => {
    setOpenModal(true);
  };

  const modalHandler = () => {
    setOpenModal(!openModal);
  };

  const changeHandler = async () => {
    setLoader(true);
    const res = await props.changeToggle();
    setLoader(false);
    modalHandler();
    if (res) {
      if (res === 200) {
        ToggleNotification("StatusChangeSuccess");
        setChecked(!checked);
      } else if (res === 500) {
        ToggleNotification("ServerError");
      }
    }
    // const res = await props.changeToggle();
    // setTimeout(() => {
    //   setLoader(props.toggleLoader);
    //   setChecked(!checked);
    //   modalHandler();
    //   ToggleNotification("StatusChangeSuccess");
    // }, 3000);
  };

  const render = (
    <ToggleButtonModal
      open={openModal}
      name={props.name}
      loading={loader}
      changeHandler={changeHandler}
      closeModal={modalHandler}
    />
  );

  return (
    <>
      {render}
      <Switch
        onChange={onChangeHandler}
        checked={checked}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={48}
        className="react-switch"
        id="material-switch"
      />
    </>
  );
};

export default ToggleButton;
