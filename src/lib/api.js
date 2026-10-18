const connectionError = "Cannot load café data. Check the backend connection and /api proxy.";
async function readJson(response) {
  let result;
  try { result = await response.json(); }
  catch { throw new Error(connectionError); }
  if (!result || typeof result !== "object" || Array.isArray(result)) throw new Error(connectionError);
  return result;
}
let csrf = "";
let pending;
export async function session() {
  if (!pending)
    pending = fetch("/api/session/", {
      credentials: "same-origin",
      cache: "no-store",
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("Cannot connect to the cafÃ© server.");
        return readJson(r);
      })
      .then((data) => {
        if (typeof data.csrf !== "string" || !data.csrf) throw new Error(connectionError);
        csrf = data.csrf;
        return data;
      })
      .finally(() => {
        pending = null;
      });
  return pending;
}
export async function api(action, data, signal, retryCsrf = true) {
  if (data !== undefined && !csrf) await session();
  const response = await fetch(`/api/${action}`, {
    method: data === undefined ? "GET" : "POST",
    credentials: "same-origin",
    cache: "no-store",
    signal,
    headers:
      data === undefined
        ? {}
        : { "Content-Type": "application/json", "X-CSRFToken": csrf },
    body: data === undefined ? undefined : JSON.stringify(data),
  });
  const result = await readJson(response);
  if (!response.ok) {
    if (response.status === 403) csrf = "";
    // CSRF middleware rejects before the view runs, so one token refresh is safe.
    if (
      response.status === 403 &&
      result.code === "csrf_failed" &&
      data !== undefined &&
      retryCsrf
    ) {
      await session();
      return api(action, data, signal, false);
    }
    const error = new Error(result.error || "Request failed.");
    error.status = response.status;
    throw error;
  }
  if (action.split("?")[0] === "menu/" && (
    !Array.isArray(result.categories) ||
    !result.categories.every(group => group && Array.isArray(group.items)) ||
    typeof result.settings?.is_open !== "boolean"
  )) throw new Error(connectionError);
  if (result.csrf) csrf = result.csrf;
  return result;
}
export const aed = (value) =>
  new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(
    Number(value || 0),
  );
export const dateTime = (value) =>
  new Date(value).toLocaleString("en-GB", {
    timeZone: "Asia/Dubai",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
export const statusName = (value) => value.replaceAll("_", " ");
export const dubaiDate = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dubai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
