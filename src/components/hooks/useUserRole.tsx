import { useAppSelector } from "../../store/hooks";

export const useUserRole = () => {
  const user: any = useAppSelector((state) => state?.auth?.user);

  const role = () => {
    if (user?.is_superuser) {
      return "admin";
    }
    return "user";
  };

  return { user, role };
};
