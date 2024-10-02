import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/common/button";
import { AppInput } from "../../components/common/input";
import { useAppSelector } from "../../store/hooks";

const Settings: React.FC = () => {
  const user: any = useAppSelector((state) => state.auth.user);

  const { t } = useTranslation();
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [profileData, setProfileData] = useState<any>({
    profile_image: null,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        ...profileData,
        ...user,
      });
    }
  }, [user]);

  console.log(profileData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    const sanitizedPhone = value.replace(/\D/g, "");

    switch (name) {
      case "profile_image":
        if (files) {
          setProfileData({
            ...profileData,
            profile_image: URL.createObjectURL(files[0]),
          });
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
    <div className="p-4 lg:p-6 bg-white rounded-lg flex flex-col items-center lg:items-start w-full">
      <div className="mb-8 w-full">
        <h3 className="text-2xl font-semibold mb-2">{t("Profile Details")}</h3>

        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-6 lg:w-4/5">
          {/* Profile Image */}
          <div className="col-span-full my-3 flex flex-col items-center justify-center">
            <div
              onClick={() => imageInputRef?.current?.click()}
              className="w-14 h-14 lg:h-20 lg:w-20 border-2 border-dashed lg:hover:border-solid transition-all border-primary-500 rounded-full cursor-pointer mb-2"
            >
              {profileData.profile_image && (
                <img
                  src={profileData.profile_image}
                  className="h-full w-full rounded-full"
                  alt=""
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
              placeholder={t("First name")}
              maxLength={24}
            />
          </div>

          <div className="mb-2">
            <AppInput
              name="last_name"
              type="text"
              placeholder={t("Last name")}
              maxLength={24}
            />
          </div>
          <div className="mb-2">
            <AppInput
              name="phone"
              type="tel"
              placeholder={t("Phone number")}
              maxLength={24}
            />
          </div>

          <div className="mb-2">
            <AppInput
              name="email"
              type="email"
              placeholder={t("Email")}
              maxLength={32}
            />
          </div>
        </div>
      </div>
      <div className="mb-8 w-full">
        <h3 className="text-2xl font-semibold mb-2">
          {t("Password Settings")}
        </h3>

        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-6 lg:w-4/5">
          <div className="mb-2">
            <AppInput
              name="password"
              type="password"
              placeholder={t("Password")}
              maxLength={24}
            />
          </div>

          <div className="mb-2">
            <AppInput
              name="confirm_password"
              type="password"
              placeholder={t("Confirm password")}
              maxLength={24}
            />
          </div>
        </div>
      </div>
      <Button className="w-fit">{t("Save Changes")}!</Button>
    </div>
  );
};

export default Settings;
