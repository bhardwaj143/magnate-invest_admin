import { NotificationManager } from "react-notifications";

const ToggleNotification = (type, message) => {
  const renderNotification = () => {
    switch (type) {

      ////////////////// Success Notifications /////////////////////////////

      case "Success Login":
        return NotificationManager.success(
          "You have been successfully Logged In",
          "Login Successfull",
          2000
        );
      case "ForgetPasswordSuccess":
        return NotificationManager.success(
          "Your Password has been reset Successfully",
          "Password Reset Successfull",
          2000
        );
      case "ChangePasswordSuccess":
        return NotificationManager.success(
          "Your Password has been changed Successfully",
          "Password Change Successfull",
          2000
        );
      case "Logout":
        return NotificationManager.success(
          "Your have been successfully Logged Out",
          "Logout Successfull",
          2000
        );
      case "AddUserSuccess":
        return NotificationManager.success(
          "User has been added successfully",
          "User Added",
          2000
        );
      case "DeleteUserSuccess":
        return NotificationManager.success(
          "User has been deleted successfully",
          "User Deleted",
          2000
        );
      case "UpdateUserSuccess":
        return NotificationManager.success(
          "User has been updated successfully",
          "User Updated",
          2000
        );
      case "StatusChangeSuccess":
        return NotificationManager.success(
          "Status has been updated successfully",
          "Status Updated",
          2000
        );

      /////////////////// Error Notifications //////////////////////////////////////

      case "Error":
        return NotificationManager.error(
          message ? message : "Particular action cannot be performed right now",
          "Error",
          2000
        );

      ////////////////// Sever Error ///////////////////////////////////////////

      case "ServerError":
        return NotificationManager.error(
          `Server Error ! Please try again later`,
          "Server Error",
          2000
        );
    }
  };
  return renderNotification();
};

export default ToggleNotification;
