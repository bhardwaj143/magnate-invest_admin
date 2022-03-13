import React from "react";
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
      case "UpdateCategorySuccess":
        return NotificationManager.success(
          "Category details have been updated successfully",
          "Category Updated",
          2000
        );
      case "UpdateCowSuccess":
        return NotificationManager.success(
          "Cow details have been updated successfully",
          "Cow Updated",
          2000
        );
      case "AddCategorySuccess":
        return NotificationManager.success(
          "Category has been added successfully",
          "Category Added",
          2000
        );
      case "AddSettingSuccess":
        return NotificationManager.success(
          "Setting has been added successfully",
          "Setting Added",
          2000
        );
      case "AddBlogSuccess":
        return NotificationManager.success(
          "Blog has been added successfully",
          "Blog Added",
          2000
        );
      case "DeleteBlogSuccess":
        return NotificationManager.success(
          "Blog has been deleted successfully",
          "Blog Deleted",
          2000
        );
      case "DeleteCategorySuccess":
        return NotificationManager.success(
          "Category has been deleted successfully",
          "Category Deleted",
          2000
        );
      case "DeleteSettingSuccess":
        return NotificationManager.success(
          "Setting has been deleted successfully",
          "Setting Deleted",
          2000
        );
      case "UpdateBlogSuccess":
        return NotificationManager.success(
          "Blog has been updated successfully",
          "Blog Updated",
          2000
        );
      case "UpdateVideoSuccess":
        return NotificationManager.success(
          "Video has been updated successfully",
          "Video Updated",
          2000
        );
      case "UpdateSettingSuccess":
        return NotificationManager.success(
          "Settings has been updated successfully",
          "Settings Updated",
          2000
        );
      case "StatusChangeSuccess":
        return NotificationManager.success(
          "Status has been updated successfully",
          "Status Updated",
          2000
        );

      /////////////////// Error Notifications //////////////////////////////////////

      case "Login Fail":
        return NotificationManager.error(
          "Invalid Credentials",
          "Login Failed",
          2000
        );
      case "AddSettingFail":
        return NotificationManager.success(message, "Error", 2000);
      case "AddCustomerfail":
        return NotificationManager.error(
          "Unable to add customer ",
          "Error",
          2000
        );
      case "AddBlogfail":
        return NotificationManager.error("Unable to add Cow ", "Error", 2000);
      case "DeleteSettingFail":
        return NotificationManager.error(
          "Setting cannot be deleted",
          "Error",
          2000
        );
      case "UpdateBlogFail":
        return NotificationManager.error(
          "Blog cannot be updated",
          "Error",
          2000
        );
      case "UpdateSettingFail":
        return NotificationManager.error(
          "Settings cannot be updated",
          "Error",
          2000
        );
      case "UpdateCategoryFail":
        return NotificationManager.error(
          "Category details cannot be updated",
          "Error",
          2000
        );
      case "UpdateVideoFail":
        return NotificationManager.error(
          "Video cannot be updated",
          "Error",
          2000
        );
      case "ChangePasswordFail":
        return NotificationManager.error(
          "Password cannot be updated",
          "Error",
          2000
        );
      case "StatusChangeFail":
        return NotificationManager.error(
          "Status cannot be updated",
          "Error",
          2000
        );
      case "AddCategoryFail":
        return NotificationManager.error(message, "Error", 2000);
      case "UpdateCustomerFail":
        return NotificationManager.error(message, "Error", 2000);

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
