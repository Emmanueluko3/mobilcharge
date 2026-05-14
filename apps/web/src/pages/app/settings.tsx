import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/common/button";
import { AppInput } from "../../components/common/input";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useMutation } from "@apollo/client/react";
import { UPDATE_PROFILE_MUTATION, UPDATE_PASSWORD_MUTATION } from "../../api/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { getUserInfo } from "../../store/features/auth/authSlice";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";
import { fileToBase64 } from "../../utils/base64";

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const user: any = useAppSelector((state) => state.auth.user);

  const { t } = useTranslation();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState<any>({
    profile_image: null,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [updateProfile] = useMutation<any>(UPDATE_PROFILE_MUTATION);
  const [updatePassword] = useMutation<any>(UPDATE_PASSWORD_MUTATION);

  useEffect(() => {
    if (user) {
      setProfileData({
        ...profileData,
        ...user,
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: t("Confirm"),
      text: t("Are you sure you want to save changes?"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#428bca",
      cancelButtonColor: "#54577A",
      confirmButtonText: t("Confirm"),
      cancelButtonText: t("Cancel"),
    });
    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        const {
          profile_image,
          first_name,
          last_name,
          phone,
          email,
          old_password,
          new_password,
          confirm_new_password,
        } = profileData;
        let profileImageBase64 = null;
        if (profile_image && typeof profile_image !== "string") {
          profileImageBase64 = await fileToBase64(profile_image);
        }

        const payload = {
          firstName: first_name,
          lastName: last_name,
          phoneNumber: phone,
          profileImageBase64,
        };

        await updateProfile({ variables: { input: payload } });

        if (new_password || old_password) {
          if (!old_password || !new_password || new_password !== confirm_new_password) {
            throw new Error("Invalid password change input");
          }
          await updatePassword({ variables: { input: { oldPassword: old_password, newPassword: new_password } } });
        }
        Swal.fire({ title: "Success!", text: "Profile updated successfully.", icon: "success" });
        dispatch(getUserInfo());
      } catch (error: any) {
        console.error(error);
        if (error.status === 401) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
          });
        }
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    const sanitizedPhone = value.replace(/\D/g, "");

    switch (name) {
      case "profile_image":
        if (files) {
          const file = files[0];

          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
          };

          try {
            const compressedFile = await imageCompression(file, options);

            setProfileData({
              ...profileData,
              profile_image: compressedFile,
            });
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: "Image size too large",
              icon: "error",
            });
            console.error("Error while resizing image:", error);
          }
          // setProfileData({
          //   ...profileData,
          //   profile_image: files[0],
          // });
        }
        break;
      case "phone":
        setProfileData({
          ...profileData,
          phone: sanitizedPhone,
        });

        break;
      default:
        setProfileData({
          ...profileData,
          [name]: value,
        });
        break;
    }
  };

  return (
    <form
      onSubmit={handleUpdateProfile}
      className="p-4 lg:p-6 bg-white rounded-lg flex flex-col items-center lg:items-start w-full"
    >
      <div className="mb-8 w-full">
        <h3 className="text-2xl font-semibold mb-2">{t("Profile Details")}</h3>

        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-6 lg:w-4/5">
          {/* Profile Image */}
          <div className="col-span-full my-3 flex flex-col items-center justify-center">
            <div
              onClick={() => imageInputRef?.current?.click()}
              className="w-14 h-14 lg:h-20 lg:w-20 border-2 border-dashed lg:hover:border-solid transition-all border-primary-500 rounded-full cursor-pointer mb-2 flex items-center justify-center"
            >
              {profileData.profile_image ? (
                <img
                  src={
                    typeof profileData.profile_image === "string"
                      ? profileData.profile_image
                      : URL.createObjectURL(profileData.profile_image)
                  }
                  className="h-full w-full rounded-full object-cover"
                  alt=""
                />
              ) : (
                <FontAwesomeIcon
                  className="text-primary-400 text-xl"
                  icon={faImage}
                />
              )}
            </div>
            <p className="text-primary-500 text-xs text-center">
              {t("Upload profile picture")} <br />*
              {t("drag or browse from device")}
            </p>
            <input
              type="file"
              className="hidden"
              name="profile_image"
              accept="image/*"
              ref={imageInputRef}
              onChange={handleChange}
            />
          </div>

          <div className="mb-2">
            <AppInput
              name="first_name"
              type="text"
              value={profileData.first_name}
              onChange={handleChange}
              placeholder={t("First name")}
              maxLength={40}
              autoComplete="off"
            />
          </div>

          <div className="mb-2">
            <AppInput
              name="last_name"
              type="text"
              value={profileData.last_name}
              onChange={handleChange}
              placeholder={t("Last name")}
              maxLength={40}
              autoComplete="off"
            />
          </div>
          <div className="mb-2">
            <AppInput
              name="phone"
              type="tel"
              value={profileData.phone}
              onChange={handleChange}
              placeholder={t("Phone number")}
              maxLength={40}
              autoComplete="off"
            />
          </div>

          <div className="mb-2">
            <AppInput
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleChange}
              placeholder={t("Email")}
              maxLength={40}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      <div className="mb-8 w-full">
        <h3 className="text-2xl font-semibold mb-2">
          {t("Password Settings")}
        </h3>

        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-6 lg:w-4/5">
          <div className="mb-2 lg:col-span-2">
            <AppInput
              name="old_password"
              type="password"
              value={profileData.old_password}
              onChange={handleChange}
              placeholder={t("Old password")}
              maxLength={40}
              autoComplete="off"
              onPaste={(e) => e.preventDefault()}
            />
          </div>
          <div className="mb-2">
            <AppInput
              name="new_password"
              type="password"
              value={profileData.new_password}
              onChange={handleChange}
              placeholder={t("New password")}
              maxLength={40}
              autoComplete="off"
              onPaste={(e) => e.preventDefault()}
            />
          </div>

          <div className="mb-2">
            <AppInput
              name="confirm_new_password"
              type="password"
              value={profileData.confirm_new_password}
              onChange={handleChange}
              placeholder={t("Confirm new password")}
              maxLength={40}
              autoComplete="off"
              onPaste={(e) => e.preventDefault()}
            />
          </div>
        </div>
      </div>
      <Button
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
        className="w-fit"
      >
        {t("Save Changes")}!
      </Button>
    </form>
  );
};

export default Settings;
