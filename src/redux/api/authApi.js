import { api } from "./index";

const authApi = api.injectEndpoints({
	endpoints: (build) => ({
		signUp: build.mutation({
			query: (body) => ({
				url: "/users/",
				method: "POST",
				body,
			}),
		}),
		logIn: build.mutation({
			query: (body) => ({
				url: "/auth/login",
				method: "POST",
				body,
			}),
		}),
		getProfile: build.query({
			query: () => ({
				url: "/auth/profile",
			}),
		}),
	}),
});

export const { useSignUpMutation, useLogInMutation, useGetProfileQuery } =
	authApi;
