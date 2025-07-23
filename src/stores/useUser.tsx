import { userApi } from "@/Api/user.api";
import { create } from "zustand";
type User = {
  id: string;
  email: string;
  username: string;
  displayName: string | null;
  imageUrl: string | null;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchProfile: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => {
  const channel = new BroadcastChannel("user-session");

  channel.onmessage = (event) => {
    if (event.data?.type === "SET_USER") {
      const current = get().user;
      const incoming = event.data.user;
      if (current?.id !== incoming?.id) {
        set({ user: incoming });
      }
    }
  };

  return {
    user: null,
    setUser: (user) => {
      const current = get().user;

      if (current?.id !== user?.id) {
        set({ user });
        channel.postMessage({ type: "SET_USER", user });
      }
    },
    fetchProfile: async () => {
      try {
        const res = await userApi.getProfile();

        const profile = res.data?.user;

        const current = get().user;
        const isSameUser = current?.id === profile.id;
        if (!profile) {
          console.log("login user not success");
          return;
        }

        set({ user: profile });

        if (!isSameUser) {
          set({ user: profile });
          channel.postMessage({ type: "SET_USER", user: profile });
        }
      } catch {
        console.error("Failed to fetch user profile:");
        set({ user: null });
        channel.postMessage({ type: "SET_USER", user: null });
      }
    },
  };
});
