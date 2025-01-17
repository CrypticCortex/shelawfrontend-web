// app/services/authServices.ts
import Config from "@/app/config";

// Helper function to implement fetch with timeout
function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number = Config.requestTimeout * 1000 // Convert seconds to milliseconds
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Request timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    fetch(url, options)
      .then((response) => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/**
 * Fetches the current user's info from /auth/me using the stored access token.
 * @throws if no token, failed fetch, or invalid response
 * @returns {Promise<Record<string, any>>} user data
 */
export async function getUserInfo(): Promise<Record<string, unknown>> {
  try {
    // 1. Fetch latest config
    await Config.getInstance().fetchNgrokUrls();
    const baseUrl = Config.getInstance().apiBaseUrl;

    // 2. Get access token from localStorage
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("Access token not found for fetching user info.");
      throw new Error("No access token available.");
    }

    console.log("Fetching user info using access token.");

    // 3. Make GET request to /auth/me
    const response = await fetchWithTimeout(`${baseUrl}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 4. Check response
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const htmlText = await response.text();
      console.error("Non-JSON response from /auth/me:", htmlText);
      localStorage.removeItem("accessToken");
      throw new Error("Invalid response format.");
    }

    if (!response.ok) {
      console.log(`Failed to fetch user info. Status code: ${response.status}`);
      localStorage.removeItem("accessToken");
      throw new Error(`Failed to fetch user info. Status code: ${response.status}`);
    }

    const data = await response.json();
    console.log("User data fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error(`Error fetching user info: ${error}`);
  }
}

/**
 * Logs out the current user by calling /auth/logout.
 * @throws if no token or logout fails
 */
export async function logoutUser(): Promise<void> {
  try {
    // 1. Fetch latest config
    await Config.getInstance().fetchNgrokUrls();
    const baseUrl = Config.getInstance().apiBaseUrl;

    // 2. Get access token from localStorage
    const accessToken = window.localStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("No access token found for logout.");
      throw new Error("No access token available.");
    }

    console.log("Logging out user.");

    // 3. Make POST request to /auth/logout
    const response = await fetchWithTimeout(`${baseUrl}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error("Logout failed. Status code:", response.status);
      throw new Error(`Logout failed with status code: ${response.status}`);
    }

    console.log("Logout successful.");
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error(`Error during logout: ${error}`);
  }
}
