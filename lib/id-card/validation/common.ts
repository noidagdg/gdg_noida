export type FieldErrors = Record<string, string>;
export type FormValues = Record<string, string>;

export type ActionState =
  | { status: "idle" }
  | { status: "success"; message: string; nonce: string; data?: unknown }
  | { status: "error"; message: string; nonce: string; fieldErrors?: FieldErrors; values?: FormValues };

export const IDLE: ActionState = { status: "idle" };

export function errorState(message: string, fieldErrors?: FieldErrors, values?: FormValues): ActionState {
  return {
    status: "error",
    message,
    nonce: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
    ...(fieldErrors ? { fieldErrors } : {}),
    ...(values ? { values } : {}),
  };
}

export function successState(message: string, data?: unknown): ActionState {
  return {
    status: "success",
    message,
    nonce: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(),
    ...(data !== undefined ? { data } : {}),
  };
}

export function stateKey(state: ActionState): string {
  return state.status === "idle" ? "initial" : state.nonce;
}

export function formValues(formData: FormData): FormValues {
  const out: FormValues = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && !key.startsWith("$ACTION") && !/password/i.test(key)) {
      out[key] = value;
    }
  }
  return out;
}

export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

export function formString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export function formCheckbox(formData: FormData, key: string): boolean {
  const value = formData.get(key);
  return value === "on" || value === "true" || value === "1";
}

export function issuesToFieldErrors(issues: ReadonlyArray<{ path: (string | number | symbol)[]; message: string }>): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
