let csrf = "";
let pending;
export async function session() {
  if (!pending)
    pending = fetch("/api/session/", {
      credentials: "same-origin",
      cache: "no-store",
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("Cannot connect to the café server.");
        return r.json();
      })
      .then((data) => {
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
  const result = await response.json().catch(() => ({
    error: "The server could not process this request. Please retry.",
  }));
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
