const K = {
  Network: {
    URL: {
      // Production
      // Base: 'http://ninjirosoft.com:8080/',
      // BaseAPI: 'http://ninjirosoft.com:8080/api',
      // TenantURL: (domainPrefix = '') => {
      //     return 'http://' + domainPrefix + '.' + 'ninjirosoft.com:8080/api'
      // },
      // Client: {
      //     BaseHost: 'ninjirosoft.com',
      //     BasePort: '80',
      // },

      // Development
      Base: process.env.REACT_APP_BASE_URL,
      BaseAPI: process.env.REACT_APP_BASE_API_URL,
      DomainName: process.env.REACT_APP_CLIENT_DOMAIN_NAME,
      Timeout: process.env.REACT_APP_TIMEOUT,
      TenantURL: (domainPrefix = "") => {
        return (
          process.env.REACT_APP_PROTOCOL +
          "://" +
          domainPrefix +
          process.env.REACT_APP_TENANT_PARTIAL_URL
        );
      },
      Client: {
        BaseHost: process.env.REACT_APP_CLIENT_BASE_HOST,
        BasePort: process.env.REACT_APP_CLIENT_BASE_PORT,
      },

      Protocol: process.env.REACT_APP_PROTOCOL,

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
      PATCH: "PATCH",
      DELETE: "DELETE",
    },
    Header: {
      ContentType: "Content-Type",
      ApplicationJson: "application/json",
      Default: (token = "", permissions = "") => ({
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
        Permissions: permissions,
      }),
      Authorization: (token = "", permissions = "") => ({
        Authorization: "Bearer " + token,
        Permissions: permissions,
      }),
      Type: {
        Json: "json",
        File: "file",
      },
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
      EncryptionKey: "logged_in_user",
    },
  },
  Roles: {
    Admin: "Admin",
    User: "User",
  },
};

export default K;
