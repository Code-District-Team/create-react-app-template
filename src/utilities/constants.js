const K = {
  Network: {
    URL: {
      Base: process.env.REACT_APP_BASE_URL,
      BaseAPI: process.env.REACT_APP_BASE_API_URL,
      DomainName: process.env.REACT_APP_CLIENT_DOMAIN_NAME,
      Timeout: process.env.REACT_APP_TIMEOUT,
      BaseUrl: process.env.REACT_APP_BASE_URL.slice(0, -1),
      TenantURL: (domainPrefix = "") => {
        return "http://" + domainPrefix + process.env.REACT_APP_TENANT_PARTIAL_URL;
      },
      Client: {
        BaseHost: process.env.REACT_APP_CLIENT_BASE_HOST,
        BasePort: process.env.REACT_APP_CLIENT_BASE_PORT,
      },

      Protocol: "http",

      // Tenant
      GetTenant: "/tenant/get",

      // Assignment
      LoginUser: "/user/login",

      // Forget password
      ForgotPassword: "/user/send_password_reset_token",

      //Reset password
      ResetPassword: "/user/reset_password",
    },
    Method: {
      GET: "GET",
      POST: "POST",
    },
    Header: {
      ContentType: "Content-Type",
      ApplicationJson: "application/json",
      Default: (token = "") => ({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      }),
      Authorization: (token = "") => ({
        Authorization: "Bearer " + token,
      }),
      Type: {
        Json: "json",
        File: "file",
      },
    },
    Default: {
      AssignmentStatusID: 1,
      ResourceAllocationPercentage: 100,
      ResourceAllocationType: "percentage",
      WorkItem: "",
      Error: "Opps, an error occurred!",
    },
    StatusCode: {
      Unauthorized: 401,
    },
  },
  Actions: {
    // General part of action
    CREATE: "CREATE",
    UPSERT: "UPSERT",
    DELETE: "DELETE",
    DELETE_ALL: "DELETE_ALL",
    SET: "SET",

    // Settings
    UPSERT_SETTING: "UPSERT_SETTING",
  },

  Cookie: {
    Key: {
      User: "user",
      EncryptionKey: "blc_logged_in_user",
    },
  },

  Roles: {
    Admin: "Admin",
    User: "User",
  },
};

export default K;
