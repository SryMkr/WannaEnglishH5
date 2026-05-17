(function () {
  const LOCAL_TEST_USER = {
    userID: 1001,
    userName: "本地测试用户"
  };

  function isLocalRuntime() {
    const { protocol, hostname } = window.location;
    return protocol === "file:" || !hostname || hostname === "localhost" || hostname === "127.0.0.1";
  }

  function getApiBaseUrl() {
    return isLocalRuntime() ? "http://127.0.0.1:3000" : "https://api.lyzlearn.com";
  }

  function readIdentity(options = {}) {
    const params = new URLSearchParams(window.location.search);
    const rawUserID = params.get("userID") || params.get("userId") || params.get("user_id") || "";
    const rawUserName = params.get("userName") || params.get("name") || params.get("nickName") || params.get("nickname") || "";
    const userID = Number(rawUserID);
    const identity = {
      userID: Number.isInteger(userID) && userID > 0 ? userID : 0,
      userName: rawUserName.trim() || "微信用户",
      isLocalFallback: false
    };

    if (options.allowLocalFallback !== false && identity.userID <= 0 && isLocalRuntime()) {
      return {
        ...LOCAL_TEST_USER,
        isLocalFallback: true
      };
    }

    return identity;
  }

  function appendIdentityToUrl(url, identity = readIdentity()) {
    const [basePath, queryString = ""] = url.split("?");
    const params = new URLSearchParams(queryString);
    if (identity.userID > 0) {
      params.set("userID", identity.userID);
    }
    if (identity.userName) {
      params.set("userName", identity.userName);
    }
    const nextQuery = params.toString();
    return nextQuery ? `${basePath}?${nextQuery}` : basePath;
  }

  async function requestJson(path, options = {}) {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.error) {
      throw new Error(data.error || "请求失败");
    }
    return data;
  }

  window.WannaEnglishH5 = {
    getApiBaseUrl,
    isLocalRuntime,
    readIdentity,
    appendIdentityToUrl,
    requestJson
  };
})();
