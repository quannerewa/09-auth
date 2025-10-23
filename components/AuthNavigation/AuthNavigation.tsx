"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { logoutUser } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

const AuthNavigation = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  const handleLogout = async () => {
    await logoutUser();
    clearIsAuthenticated();
    router.push("/sign-in");
  };

  return (
    <ul className={css.navigationList}>
      {!isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

export default AuthNavigation;

